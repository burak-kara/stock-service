import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { DeviceModule } from '../../src/device/device.module';
import * as request from 'supertest';
import { DeviceService } from '../../src/device/device.service';

describe('DeviceController (e2e)', () => {
    let app: INestApplication;
    let deviceService = {
        create: () => ({
            id: 1,
            createdAt: '2022-09-12T10:16:24.105Z',
            updatedAt: '2022-09-12T10:16:24.106Z',
            deviceID: 'WMLTDEC00100',
            softenerAmount: 1000,
            detergentAmount: 1000,
        }),
    };

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [DeviceModule],
        })
            .overrideProvider(DeviceService)
            .useValue(deviceService)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/api/device/create (POST)', () => {
        return request(app.getHttpServer())
            .post('/api/device/create')
            .send({
                deviceID: 'WMLTDEC00100',
                softenerAmount: 1000,
                detergentAmount: 1000,
            })
            .expect(201)
            .expect('Moved Permanently. Redirecting to health-check');
    });

    afterAll(async () => {
        await app.close();
    });
});
