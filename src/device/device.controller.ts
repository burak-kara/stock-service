import { Controller, Get, Param, Query } from '@nestjs/common';
import { DeviceService } from './device.service';
import {
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { OperationObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { ConsumeParam, ConsumeQuery } from './dto';
import { ConfigService } from '@nestjs/config';

@ApiTags('Device')
@Controller('device')
export class DeviceController {
    constructor(
        private deviceService: DeviceService,
        private configService: ConfigService,
    ) {}

    @Get('consume/:deviceId/:productType?')
    @ApiOperation({
        title: 'Consumes by device id and product type',
    } as unknown as OperationObject)
    @ApiOkResponse({ description: 'Consumed successfully.' })
    @ApiNotFoundResponse({ description: 'Consume is failed.' })
    async consume(@Param() params: ConsumeParam, @Query() query: ConsumeQuery) {
        console.log(params);
        console.log(query);
        console.log(this.configService.get('connection.host'));
        console.log(this.configService.get('connection.port'));
    }
}
