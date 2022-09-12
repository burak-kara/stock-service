import { IsNotEmpty, Length, Matches } from 'class-validator';

export class OrderParam {
    @IsNotEmpty()
    @Length(parseInt(process.env.MIN_DEVICE_ID_LENGTH, 10) || 1, parseInt(process.env.MAX_DEVICE_ID_LENGTH, 10) || 40)
    deviceId: string;

    @IsNotEmpty()
    @Matches(/^\w{1,50}-(sof|det)-productId$/, {
        message: 'Product type must be in format: {productCode}-sof-productId or {productCode}-det-productId',
    })
    productType: string;
}
