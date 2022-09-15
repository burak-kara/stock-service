import { ApiProperty } from '@nestjs/swagger';

export class GetVendorDto {
    @ApiProperty({
        name: 'deviceID',
        description:
            'Vendor ID. Minimum length is 1, maximum length is 40. This is a unique identifier for the vendor.',
        required: true,
        type: String,
    })
    vendorID: string;

    @ApiProperty({
        name: 'softener',
        description: 'Amount of softener. Minimum value is 0.',
        required: true,
        type: Number,
    })
    softener: number;

    @ApiProperty({
        name: 'detergent',
        description: 'Amount of detergent. Minimum value is 0.',
        required: true,
        type: Number,
    })
    detergent: number;

    createdAt: Date;
    updatedAt: Date;
}