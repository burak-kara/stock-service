import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../../src/app/app.controller';

describe('AppController', () => {
    let appController: AppController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
        }).compile();

        appController = app.get<AppController>(AppController);
    });

    describe('root', () => {
        it('should return "Up & running"', () => {
            expect(appController.healthCheck()).toBe('Up & running');
        });

        it('should be called without any issue', () => {
            expect(appController.redirect()).toBe(void 0);
        });
    });
});
