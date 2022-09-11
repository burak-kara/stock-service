import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Redirect,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Health Check')
@Controller()
export class AppController {
    @Get()
    @Redirect('health-check', 301)
    redirect() {}

    @Get('health-check')
    @HttpCode(HttpStatus.OK)
    healthCheck(): string {
        return 'Up & running';
    }
}
