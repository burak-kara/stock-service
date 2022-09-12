import { IsOptional, IsString, Length } from 'class-validator';

export class OrderQuery {
    @IsString()
    @Length(
        parseInt(process.env.MIN_VENDOR_ID_LENGTH, 10) || 1,
        parseInt(process.env.MAX_VENDO_ID_LENGTH, 10) || 40,
    )
    @IsOptional()
    vendorId: string;
}
