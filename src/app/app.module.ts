import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { AppController } from './app.controller';
import { DeviceModule } from '../device/device.module';
import config from '../config/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [config],
        }),
        PrismaModule,
        DeviceModule,
    ],
    controllers: [AppController],
})
export class AppModule {}
