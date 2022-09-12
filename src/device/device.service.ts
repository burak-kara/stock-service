import { ForbiddenException, Injectable } from '@nestjs/common';
import { Device } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { VendorService } from '../vendor/vendor.service';
import { DeviceDto, UpdateDataDto } from './dto';

@Injectable()
export class DeviceService {
    constructor(
        private config: ConfigService,
        private prisma: PrismaService,
        private vendor: VendorService,
    ) {}

    consume = async (deviceID: string, productType: string, amount: number) => {
        try {
            const device: Device = await this.getDeviceById(deviceID);
            const updatedAmount = device[productType] - amount;
            this.checkStock(updatedAmount);
            return this.updateProductStock(deviceID, productType, {
                set: updatedAmount,
            } as UpdateDataDto);
        } catch (e) {
            if (e instanceof ForbiddenException) {
                throw e;
            } else {
                throw new ForbiddenException('Consume is failed.');
            }
        }
    };

    create = async (data: DeviceDto) => {
        try {
            return await this.prisma.device.create({ data });
        } catch (e) {
            throw new ForbiddenException('Device is already exists.');
        }
    };

    order = async (deviceId: string, productType: string, vendorId: string) => {
        const orderAmount: number = parseInt(
            this.config.get('ORDER_AMOUNT'),
            10,
        );
        try {
            return await this.prisma.$transaction(async () => {
                if (vendorId) {
                    await this.vendor.updateProductStock(
                        vendorId,
                        productType,
                        orderAmount,
                    );
                }
                const device: Device = await this.updateProductStock(
                    deviceId,
                    productType,
                    {
                        increment: orderAmount,
                    } as UpdateDataDto,
                );
                return device;
            });
        } catch (e) {
            if (e instanceof ForbiddenException) {
                throw e;
            } else {
                throw new ForbiddenException('Order is failed.');
            }
        }
    };

    updateProductStock = async (
        deviceID: string,
        productType: string,
        updatedData: UpdateDataDto,
    ) => {
        try {
            return await this.prisma.device.update({
                where: { deviceID },
                data: {
                    [productType]: updatedData,
                },
            });
        } catch (e) {
            throw new ForbiddenException('Stock update is failed.');
        }
    };

    getDeviceById = async (deviceID: string) => {
        try {
            return await this.prisma.device.findUnique({
                where: { deviceID },
            });
        } catch (e) {
            throw new ForbiddenException('Device is not found.');
        }
    };

    private checkStock = (updatedAmount: number) => {
        if (updatedAmount < 0) {
            throw new ForbiddenException('Not enough product to consume.');
        }
    };
}
