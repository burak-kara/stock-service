import { IsNotEmpty, IsString, Length, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class VendorDto {
    @IsNotEmpty()
    @IsString()
    @Length(
        parseInt(process.env.MIN_VENDOR_ID_LENGTH, 10) || 1,
        parseInt(process.env.MAX_VENDO_ID_LENGTH, 10) || 40,
    )
    vendorID: string;

    @IsNotEmpty()
    @Min(0)
    @Type(() => Number)
    softenerAmount: number;

    @IsNotEmpty()
    @Min(0)
    @Type(() => Number)
    detergentAmount: number;
}
