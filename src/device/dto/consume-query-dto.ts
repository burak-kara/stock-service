import { IsNotEmpty, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ConsumeQuery {
    @IsNotEmpty()
    @Min(parseInt(process.env.MIN_AMOUNT, 10) || 0)
    @Max(parseInt(process.env.MAX_AMOUNT, 10) || 700)
    @Type(() => Number)
    @ApiProperty({
        name: 'amount',
        description: 'Amount of detergent/softener to consume. Between 0 and 700',
        required: true,
        type: Number,
    })
    amount: number;
}
