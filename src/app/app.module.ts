import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { AppController } from './app.controller';
import { DeviceModule } from '../device/device.module';
import { VendorModule } from '../vendor/vendor.module';
import config from '../config/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [config],
        }),
        PrismaModule,
        DeviceModule,
        VendorModule,
    ],
    controllers: [AppController],
})
export class AppModule {}
