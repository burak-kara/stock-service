import { IsEnum, IsNotEmpty, Length } from 'class-validator';

export class ConsumeParam {
    @IsNotEmpty()
    @Length(parseInt(process.env.MIN_DEVICE_ID_LENGTH, 10) || 1, parseInt(process.env.MAX_DEVICE_ID_LENGTH, 10) || 40)
    deviceId: string;

    @IsNotEmpty()
    @IsEnum(['softener', 'detergent'])
    productType: string;
}
