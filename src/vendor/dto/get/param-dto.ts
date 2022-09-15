import { IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetParam {
    @IsNotEmpty()
    @Length(parseInt(process.env.MIN_VENDOR_ID_LENGTH, 10) || 1, parseInt(process.env.MAX_VENDOR_ID_LENGTH, 10) || 40)
    @ApiProperty({
        name: 'vendorId',
        description: 'Vendor ID',
        required: true,
        type: String,
    })
    vendorId: string;
}