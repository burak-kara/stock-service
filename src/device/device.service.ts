import { ForbiddenException, Injectable } from '@nestjs/common';
import { Device } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { VendorService } from '../vendor/vendor.service';
import { DeviceDto } from './dto';

@Injectable()
export class DeviceService {
    constructor(
        private config: ConfigService,
        private prisma: PrismaService,
        private vendorService: VendorService,
    ) {}

    consume = async (deviceId: string, productType: string, amount: number) => {
        try {
            const device: Device = await this.getDeviceById(deviceId);
            const updatedAmount = device[productType] - amount;
            this.checkStock(updatedAmount);
            return await this.prisma.device.update({
                where: { deviceID: deviceId },
                data: {
                    [productType]: {
                        set: updatedAmount,
                    },
                },
            });
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
        const orderAmount = this.config.get('ORDER_AMOUNT');
        try {
            if (vendorId) {
                await this.vendorService.updateProductStock(
                    vendorId,
                    productType,
                    orderAmount,
                );
            }
            await this.updateProductStock(deviceId, productType, orderAmount);
        } catch (e) {
            throw new ForbiddenException('Order is failed.');
        }
    };

    updateProductStock = async (
        deviceID: string,
        productType: string,
        amount: number,
    ) => {
        try {
            return await this.prisma.device.update({
                where: { deviceID },
                data: {
                    [productType]: {
                        increase: amount,
                    },
                },
            });
        } catch (e) {
            throw new ForbiddenException('Order is failed.');
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
