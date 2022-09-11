import { IsNotEmpty, IsString, Length, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class DeviceDto {
    @IsNotEmpty()
    @IsString()
    @Length(
        parseInt(process.env.MIN_DEVICE_ID_LENGTH, 10) || 1,
        parseInt(process.env.MAX_DEVICE_ID_LENGTH, 10) || 40,
    )
    deviceID: string;

    @IsNotEmpty()
    @Min(0)
    @Type(() => Number)
    softenerAmount: number;

    @IsNotEmpty()
    @Min(0)
    @Type(() => Number)
    detergentAmount: number;
}
