import { ForbiddenException, Injectable } from '@nestjs/common';
import { Device } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { DeviceDto } from './dto';

@Injectable()
export class DeviceService {
    constructor(private prisma: PrismaService) {}

    async consume(deviceId: string, productType: string, amount: number) {
        try {
            const device: Device = await this.prisma.device.findUnique({
                where: { deviceID: deviceId },
            });
            const updatedAmount = device[productType + 'Amount'] - amount;
            if (updatedAmount < 0) {
                throw new ForbiddenException('Not enough product.');
            }
            return await this.prisma.device.update({
                where: { deviceID: deviceId },
                data: {
                    [productType + 'Amount']: {
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
    }

    async createDevice(data: DeviceDto) {
        try {
            return await this.prisma.device.create({ data });
        } catch (e) {
            throw new ForbiddenException('Device is already exists.');
        }
    }
}
