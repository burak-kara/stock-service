import { IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OrderQuery {
    @IsString()
    @Length(parseInt(process.env.MIN_VENDOR_ID_LENGTH, 10) || 1, parseInt(process.env.MAX_VENDO_ID_LENGTH, 10) || 40)
    @IsOptional()
    @ApiProperty({
        name: 'vendorId',
        description: 'Vendor ID. Minimum length: 1, Maximum length: 40',
        required: false,
        type: String,
    })
    vendorId: string;
}
