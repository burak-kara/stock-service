import { IsNotEmpty, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OrderParam {
    @IsNotEmpty()
    @Length(parseInt(process.env.MIN_DEVICE_ID_LENGTH, 10) || 1, parseInt(process.env.MAX_DEVICE_ID_LENGTH, 10) || 40)
    @ApiProperty({
        name: 'deviceId',
        description: 'Device ID. Minimum length: 1, Maximum length: 40',
        required: true,
        type: String,
    })
    deviceId: string;

    @IsNotEmpty()
    @Matches(/^\w{1,50}-(sof|det)-productId$/, {
        message: 'Product type must be in format: {productCode}-sof-productId or {productCode}-det-productId',
    })
    @ApiProperty({
        name: 'productType',
        description:
            'Product Type. Must be in format: {productCode}-sof-productId or {productCode}-det-productId. Maximum productCode length: 50',
        required: true,
        type: String,
    })
    productType: string;
}
