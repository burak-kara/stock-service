import { IsNotEmpty, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class ConsumeQuery {
    @IsNotEmpty()
    @Min(parseInt(process.env.MIN_AMOUNT, 10) || 0)
    @Max(parseInt(process.env.MAX_AMOUNT, 10) || 700)
    @Type(() => Number)
    amount: number;
}
