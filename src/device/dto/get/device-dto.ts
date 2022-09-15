import { ApiProperty } from '@nestjs/swagger';

export class GetDeviceDto {
    @ApiProperty({
        name: 'deviceID',
        description:
            'Device ID. Minimum length is 1, maximum length is 40. This is a unique identifier for the device.',
        required: true,
        type: String,
    })
    deviceID: string;

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
