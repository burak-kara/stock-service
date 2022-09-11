import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { OperationObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { ConfigService } from '@nestjs/config';
import {
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { ConsumeParam, ConsumeQuery, DeviceDto } from './dto';
import { DeviceService } from './device.service';

@ApiTags('Device')
@Controller('device')
export class DeviceController {
    constructor(
        private deviceService: DeviceService,
        private configService: ConfigService,
    ) {}

    @Get('consume/:deviceId/:productType?')
    @ApiOperation({
        summary: 'Consumes by device id and product type',
    } as unknown as OperationObject)
    @ApiOkResponse({ description: 'Consumed successfully.' })
    @ApiNotFoundResponse({ description: 'Consume is failed.' })
    async consume(@Param() params: ConsumeParam, @Query() query: ConsumeQuery) {
        return this.deviceService.consume(
            params.deviceId,
            params.productType,
            query.amount,
        );
    }

    @Post('create')
    @ApiOperation({
        summary: 'Create a new device',
    } as unknown as OperationObject)
    @ApiCreatedResponse({ description: 'Device is created successfully.' })
    async create(@Body() body: DeviceDto) {
        return this.deviceService.createDevice(body);
    }
}
