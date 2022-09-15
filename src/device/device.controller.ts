import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { ConsumeParam, ConsumeQuery, GetParam, NewDeviceDto, OrderParam, OrderQuery } from './dto';
import { DeviceService } from './device.service';

@ApiTags('Device')
@Controller('device')
export class DeviceController {
    private static SPLITTER = '-';
    private static PRODUCTS = { sof: 'softener', det: 'detergent' };

    constructor(private deviceService: DeviceService) {}

    @Get('consume/:deviceId/:productType?')
    @ApiOperation({
        summary: 'Consumes product from a device',
        description: 'Consumes by device id and product type with required amount',
    })
    @ApiOkResponse({ description: 'Consumed successfully.' })
    @ApiNotFoundResponse({ description: 'Consume is failed.' })
    async consume(@Param() params: ConsumeParam, @Query() query: ConsumeQuery) {
        return this.deviceService.consume(params.deviceId, params.productType, query.amount);
    }

    @Get('order/:deviceId/:productType?')
    @ApiOperation({
        summary: 'Orders product to a device',
        description: 'Orders by device id and product type with optional vendor ID',
    })
    @ApiOkResponse({ description: 'Ordered successfully.' })
    @ApiNotFoundResponse({ description: 'Order is failed.' })
    async order(@Param() params: OrderParam, @Query() query: OrderQuery) {
        let productType: string = params.productType.split(DeviceController.SPLITTER)[1];
        productType = DeviceController.PRODUCTS[productType];
        return this.deviceService.order(params.deviceId, productType, query.vendorId);
    }

    @Get('get/all')
    @ApiOperation({
        summary: 'Get all devices',
    })
    @ApiOkResponse({ description: 'Devices are found.' })
    @ApiNotFoundResponse({ description: 'Devices are not found.' })
    async getAll() {
        return this.deviceService.getAll();
    }

    @Get('get/:deviceId')
    @ApiOperation({
        summary: 'Get device by id',
    })
    @ApiOkResponse({ description: 'Device is found.' })
    @ApiNotFoundResponse({ description: 'Device is not found.' })
    async get(@Param() param: GetParam) {
        return this.deviceService.get(param.deviceId);
    }

    @Post('create')
    @ApiOperation({
        summary: 'Create a new device',
    })
    @ApiCreatedResponse({ description: 'Device is created successfully.' })
    @ApiBadRequestResponse({ description: 'Bad request.' })
    async create(@Body() body: NewDeviceDto) {
        return this.deviceService.create(body);
    }
}
