import { IsEnum, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ConsumeParam {
    @IsNotEmpty()
    @Length(parseInt(process.env.MIN_DEVICE_ID_LENGTH, 10) || 1, parseInt(process.env.MAX_DEVICE_ID_LENGTH, 10) || 40)
    @ApiProperty({
        name: 'deviceId',
        description: 'Device ID',
        required: true,
        type: String,
    })
    deviceId: string;

    @IsNotEmpty()
    @IsEnum(['softener', 'detergent'])
    @ApiProperty({
        name: 'productType',
        description: 'Product Type',
        required: true,
        type: String,
    })
    productType: string;
}
