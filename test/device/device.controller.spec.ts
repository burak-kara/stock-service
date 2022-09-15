import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { ConsumeParam, ConsumeQuery, GetDeviceDto, NewDeviceDto, OrderParam, OrderQuery } from '../../src/device/dto';
import { DeviceController } from '../../src/device/device.controller';
import { PrismaService } from '../../src/prisma/prisma.service';
import { DeviceService } from '../../src/device/device.service';
import { VendorService } from '../../src/vendor/vendor.service';
import { Device } from '@prisma/client';

describe('DeviceController', () => {
    let deviceController: DeviceController;
    let deviceService: DeviceService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [DeviceController],
            providers: [DeviceService, ConfigService, PrismaService, VendorService],
        }).compile();

        deviceService = moduleRef.get<DeviceService>(DeviceService);
        deviceController = moduleRef.get<DeviceController>(DeviceController);
    });

    describe('getAll', () => {
        it('should return an array of devices', async () => {
            const result: GetDeviceDto[] = [
                {
                    deviceID: 'WMLTDEC00200',
                    softener: 1000,
                    detergent: 400,
                    createdAt: '2022-09-13T10:30:01.243Z' as unknown as Date,
                    updatedAt: '2022-09-13T22:10:50.936Z' as unknown as Date,
                },
                {
                    deviceID: 'WMLTDEC00100',
                    softener: 1000,
                    detergent: 1448,
                    createdAt: '2022-09-13T09:27:39.837Z' as unknown as Date,
                    updatedAt: '2022-09-13T22:11:41.083Z' as unknown as Date,
                },
                {
                    deviceID: 'WMLTDEC00500',
                    softener: 1000,
                    detergent: 1000,
                    createdAt: '2022-09-13T22:21:31.535Z' as unknown as Date,
                    updatedAt: '2022-09-13T22:21:31.536Z' as unknown as Date,
                },
            ];

            jest.spyOn(deviceService, 'getAll').mockImplementation(async () => result);

            expect(await deviceController.getAll()).toMatchObject(result);
        });
    });

    describe('getDevice', () => {
        it('should return a device', async () => {
            const result: GetDeviceDto = {
                deviceID: 'WMLTDEC00200',
                softener: 1000,
                detergent: 400,
                createdAt: '2022-09-13T10:30:01.243Z' as unknown as Date,
                updatedAt: '2022-09-13T22:10:50.936Z' as unknown as Date,
            };
            jest.spyOn(deviceService, 'get').mockImplementation(async () => result);

            expect(await deviceController.get({ deviceId: 'WMLTDEC00200' })).toMatchObject(result);
        });
    });

    describe('create', () => {
        it('should return a device', async () => {
            const device: NewDeviceDto = {
                deviceID: 'WMLTDEC002000',
                softener: 1000,
                detergent: 1000,
            };
            const result: Device = {
                id: 8,
                createdAt: '2022-09-14T20:45:46.543Z' as unknown as Date,
                updatedAt: '2022-09-14T20:45:46.543Z' as unknown as Date,
                deviceID: 'WMLTDEC002000',
                softener: 1000,
                detergent: 1000,
            };

            jest.spyOn(deviceService, 'create').mockImplementation(async () => result);

            expect(await deviceController.create(device)).toStrictEqual(result);
        });
    });

    describe('order', () => {
        it('should order new softener and return a device', async () => {
            const orderParam: OrderParam = {
                deviceId: 'WMLTDEC002000',
                productType: 'ASDJAF567-det-productId',
            };
            const orderQuery: OrderQuery = {
                vendorId: '523',
            };
            const result: Device = {
                id: 8,
                createdAt: '2022-09-14T20:45:46.543Z' as unknown as Date,
                updatedAt: '2022-09-14T20:45:46.543Z' as unknown as Date,
                deviceID: 'WMLTDEC002000',
                softener: 1000,
                detergent: 990,
            };

            jest.spyOn(deviceService, 'order').mockImplementation(async () => result);

            expect(await deviceController.order(orderParam, orderQuery)).toStrictEqual(result);
        });
    });

    describe('consume', () => {
        it('should consume and return a device', async () => {
            const consumeParams: ConsumeParam = {
                deviceId: 'WMLTDEC002000',
                productType: 'softener',
            };
            const consumeQuery: ConsumeQuery = {
                amount: 10,
            };
            const result: Device = {
                id: 8,
                createdAt: '2022-09-14T20:45:46.543Z' as unknown as Date,
                updatedAt: '2022-09-14T20:45:46.543Z' as unknown as Date,
                deviceID: 'WMLTDEC002000',
                softener: 1000,
                detergent: 990,
            };

            jest.spyOn(deviceService, 'consume').mockImplementation(async () => result);

            expect(await deviceController.consume(consumeParams, consumeQuery)).toStrictEqual(result);
        });
    });
});
