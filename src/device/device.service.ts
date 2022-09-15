import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { Device } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { VendorService } from '../vendor/vendor.service';
import { GetDeviceDto, NewDeviceDto, PrismaUpdateDataDto } from './dto';

@Injectable()
export class DeviceService {
    private readonly logger = new Logger(DeviceService.name);

    constructor(private config: ConfigService, private prisma: PrismaService, private vendor: VendorService) {}

    consume = async (deviceID: string, productType: string, amount: number) => {
        try {
            const device: Device = await this.getDeviceById(deviceID);
            const updatedAmount = device[productType] - amount;
            this.checkStock(updatedAmount);
            const updatedDevice: Device = await this.updateProductStock(deviceID, productType, {
                set: updatedAmount,
            } as PrismaUpdateDataDto);
            this.logger.debug(`Device with ID: ${updatedDevice.id} consumed ${amount} ${productType}`);
            this.logCriticalStock(updatedDevice);
            return updatedDevice;
        } catch (e) {
            this.logger.error(e);
            if (e instanceof ForbiddenException) {
                throw e;
            } else {
                throw new ForbiddenException('Consume is failed.');
            }
        }
    };

    create = async (data: NewDeviceDto) => {
        try {
            const device: Device = await this.prisma.device.create({ data });
            this.logger.debug(`Device created with ID: ${device.id}`);
            return device;
        } catch (e) {
            this.logger.error(e);
            throw new ForbiddenException('Device is already exists.');
        }
    };

    order = async (deviceId: string, productType: string, vendorId: string) => {
        const orderAmount: number = parseInt(this.config.get('orderAmount'), 10);
        try {
            const updatedDevice: Device = await this.prisma.$transaction(async () => {
                if (vendorId) {
                    await this.vendor.updateProductStock(vendorId, productType, orderAmount);
                }
                const device: Device = await this.updateProductStock(deviceId, productType, {
                    increment: orderAmount,
                } as PrismaUpdateDataDto);
                return device;
            });
            this.logger.debug(`Device with ID: ${updatedDevice.id} increased stock by ${orderAmount} ${productType}`);
            return updatedDevice;
        } catch (e) {
            this.logger.error(e);
            if (e instanceof ForbiddenException) {
                throw e;
            } else {
                throw new ForbiddenException('Order is failed.');
            }
        }
    };

    updateProductStock = async (deviceID: string, productType: string, updatedData: PrismaUpdateDataDto) => {
        try {
            return await this.prisma.device.update({
                where: { deviceID },
                data: {
                    [productType]: updatedData,
                },
            });
        } catch (e) {
            this.logger.error(e);
            throw new ForbiddenException('Stock update is failed.');
        }
    };

    get = async (deviceID: string) => {
        try {
            const device: Device = await this.getDeviceById(deviceID);
            const deviceDto: GetDeviceDto = {
                deviceID: device.deviceID,
                softener: device.softener,
                detergent: device.detergent,
                createdAt: device.createdAt,
                updatedAt: device.updatedAt,
            };
            this.logger.debug(`Device with ID: ${device.id} was found.`);
            return deviceDto;
        } catch (e) {
            throw new ForbiddenException('Device is not found.');
        }
    };

    getAll = async () => {
        try {
            const devices: GetDeviceDto[] = await this.prisma.device.findMany({
                select: {
                    deviceID: true,
                    softener: true,
                    detergent: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });
            this.logger.debug(`Devices were found.`);
            return devices;
        } catch (e) {
            throw new ForbiddenException('Devices are not found.');
        }
    };

    private getDeviceById = async (deviceID: string) => {
        try {
            const device: Device = await this.prisma.device.findUnique({
                where: { deviceID },
            });
            return device;
        } catch (e) {
            throw new ForbiddenException('Device is not found.');
        }
    };

    private checkStock = (updatedAmount: number) => {
        if (updatedAmount < 0) {
            throw new ForbiddenException('Not enough product to consume.');
        }
    };

    private logCriticalStock = (device: Device) => {
        if (
            device.softener < this.config.get('softenerThreshold') ||
            device.detergent < this.config.get('detergentThreshold')
        ) {
            this.logger.debug(`Device with ID: ${device.id} has critical stock`);
            this.logger.warn(
                `Device ID: ${device.id} Softener: ${device.softener} Detergent: ${device.detergent} Timestamp: ${device.updatedAt}`,
            );
        }
    };
}
