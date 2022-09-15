import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { VendorService } from './vendor.service';
import { GetParam, NewVendorDto } from './dto';

@ApiTags('Vendor')
@Controller('vendor')
export class VendorController {
    constructor(private vendorService: VendorService) {}

    @Get('get/all')
    @ApiOperation({
        summary: 'Get all vendors',
    })
    @ApiOkResponse({ description: 'Vendors are found.' })
    @ApiNotFoundResponse({ description: 'Vendors are not found.' })
    async getAll() {
        return this.vendorService.getAll();
    }

    @Get('get/:vendorId')
    @ApiOperation({
        summary: 'Get Vendor by id',
    })
    @ApiOkResponse({ description: 'Vendor is found.' })
    @ApiNotFoundResponse({ description: 'Vendor is not found.' })
    async get(@Param() param: GetParam) {
        return this.vendorService.get(param.vendorId);
    }

    @Post('create')
    @ApiOperation({
        summary: 'Create a new vendor',
    })
    @ApiCreatedResponse({ description: 'Vendor is created successfully.' })
    async create(@Body() body: NewVendorDto) {
        return this.vendorService.create(body);
    }
}
