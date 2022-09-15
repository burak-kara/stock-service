import { IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetParam {
    @IsNotEmpty()
    @Length(parseInt(process.env.MIN_DEVICE_ID_LENGTH, 10) || 1, parseInt(process.env.MAX_DEVICE_ID_LENGTH, 10) || 40)
    @ApiProperty({
        name: 'deviceId',
        description: 'Device ID',
        required: true,
        type: String,
    })
    deviceId: string;
}
