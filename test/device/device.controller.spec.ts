import { Test, TestingModule } from '@nestjs/testing';
import { DeviceController } from '../../src/device/device.controller';
import { PrismaService } from '../../src/prisma/prisma.service';
import { ConsumeParam, ConsumeQuery, DeviceDto } from '../../src/device/dto';

describe('DeviceController', () => {
    let deviceController: DeviceController;

    const mockPrisma = {
        device: {
            create: () =>
                Promise.resolve({
                    id: 1,
                    createdAt: '2022-09-12T10:16:24.105Z',
                    updatedAt: '2022-09-12T10:16:24.106Z',
                    deviceID: 'WMLTDEC00100',
                    softener: 1000,
                    detergent: 1000,
                }),
            findUnique: () =>
                Promise.resolve({
                    id: 1,
                    createdAt: '2022-09-12T07:35:49.759Z',
                    updatedAt: '2022-09-12T09:54:55.331Z',
                    deviceID: 'WMLTDEC00200',
                    softener: 1000,
                    detergent: 1000,
                }),
        },
    };

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [DeviceController],
            providers: [PrismaService],
        })
            .overrideProvider(PrismaService)
            .useValue(mockPrisma)
            .compile();

        deviceController = app.get<DeviceController>(DeviceController);
    });

    describe('create', () => {
        const device: DeviceDto = {
            deviceID: 'WMLTDEC00100',
            softener: 1000,
            detergent: 1000,
        };
        it('should return a device', () => {
            expect(deviceController.create(device)).resolves.toStrictEqual({
                id: 1,
                createdAt: '2022-09-12T10:16:24.105Z',
                updatedAt: '2022-09-12T10:16:24.106Z',
                deviceID: 'WMLTDEC00100',
                softener: 1000,
                detergent: 1000,
            });
        });
    });

    describe('consume', () => {
        it('', () => {
            const consumeParams: ConsumeParam = {
                deviceId: '1',
                productType: 'softener',
            };
            const consumeQuery: ConsumeQuery = {
                amount: 1,
            };

            expect(deviceController.consume(consumeParams, consumeQuery)).toBe('Up & running');
        });

        it('', () => {
            const consumeParams: ConsumeParam = {
                deviceId: '1',
                productType: 'softener',
            };
            const consumeQuery: ConsumeQuery = {
                amount: 1,
            };
            expect(deviceController.consume(consumeParams, consumeQuery)).toBe(void 0);
        });
    });
});
