import { IsNotEmpty, IsString, Length, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class NewVendorDto {
    @IsNotEmpty()
    @IsString()
    @Length(parseInt(process.env.MIN_VENDOR_ID_LENGTH, 10) || 1, parseInt(process.env.MAX_VENDOR_ID_LENGTH, 10) || 40)
    @ApiProperty({
        name: 'vendorID',
        description:
            'Vendor ID. Minimum length is 1, maximum length is 40. This is a unique identifier for the vendor.',
        required: true,
        type: String,
    })
    vendorID: string;

    @IsNotEmpty()
    @Min(0)
    @Type(() => Number)
    @ApiProperty({
        name: 'softener',
        description: 'Amount of softener. Minimum value is 0.',
        required: true,
        type: Number,
    })
    softener: number;

    @IsNotEmpty()
    @Min(0)
    @Type(() => Number)
    @ApiProperty({
        name: 'detergent',
        description: 'Amount of detergent. Minimum value is 0.',
        required: true,
        type: Number,
    })
    detergent: number;
}
