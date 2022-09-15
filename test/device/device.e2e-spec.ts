import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../src/app/app.module';
import { NewDeviceDto } from '../../src/device/dto';
import request from 'supertest';

describe('DeviceController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
                transform: true,
            }),
        );
        await app.init();
    });

    describe('/api/device/create (POST)', () => {
        it('should create a device', async () => {
            return await request(app.getHttpServer())
                .post('/device/create')
                .send({
                    deviceID: 'WMLTDEC001000',
                    softener: 1000,
                    detergent: 1000,
                } as unknown as NewDeviceDto)
                .expect(201);
        });

        it('should give 403 for the duplicate device', async () => {
            return await request(app.getHttpServer())
                .post('/device/create')
                .send({
                    deviceID: 'WMLTDEC001000',
                    softener: 1000,
                    detergent: 1000,
                } as unknown as NewDeviceDto)
                .expect(403);
        });

        it('should give 403 for the missing field', async () => {
            const { status, body } = await request(app.getHttpServer())
                .post('/device/create')
                .send({
                    deviceID: 'WMLTDEC007000',
                    detergent: 1000,
                } as unknown as NewDeviceDto);
            expect(status).toEqual(400);
            expect(body.message[1]).toEqual('softener should not be empty');
        });

        it('should create object without the extra field', async () => {
            const { status, body } = await request(app.getHttpServer())
                .post('/device/create')
                .send({
                    deviceID: 'WMLTDEC00500',
                    softener: 1000,
                    detergent: 1000,
                    test: 1000,
                } as unknown as NewDeviceDto);
            expect(status).toEqual(201);
            expect(body).not.toHaveProperty('test');
            expect(body).toHaveProperty('deviceID');
            expect(body).toHaveProperty('softener');
            expect(body).toHaveProperty('detergent');
        });
    });

    afterAll(async () => {
        await app.close();
    });
});
