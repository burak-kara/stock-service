import { Module } from '@nestjs/common';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';
import { VendorModule } from '../vendor/vendor.module';

@Module({
    controllers: [DeviceController],
    imports: [VendorModule],
    providers: [DeviceService],
})
export class DeviceModule {}
