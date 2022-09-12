import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { VendorService } from './vendor.service';
import { VendorDto } from './dto';

@ApiTags('Vendor')
@Controller('vendor')
export class VendorController {
    constructor(private vendorService: VendorService) {}

    @Post('create')
    @ApiOperation({
        summary: 'Create a new vendor',
    })
    @ApiCreatedResponse({ description: 'Vendor is created successfully.' })
    async create(@Body() body: VendorDto) {
        return this.vendorService.create(body);
    }
}
