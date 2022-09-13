import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import helmet from 'helmet';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: true,
        logger: ['error', 'warn', 'debug', 'log'],
    });

    // Request Validation
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
        }),
    );
    app.setGlobalPrefix('api', {
        exclude: [
            {
                path: '/',
                method: RequestMethod.GET,
            },
            {
                path: 'health-check',
                method: RequestMethod.GET,
            },
        ],
    });
    // Helmet Middleware against known security vulnerabilities
    app.use(helmet());
    // Swagger API Documentation
    const options = new DocumentBuilder()
        .setTitle('Stock Service REST API')
        .setDescription(
            'This designed endpoint will be used\n' +
                'by a portal. With this portal, the behavior of the device will be simulated. The stock status of the\n' +
                'detergent and softener in the devices will be monitored and the necessary inventory\n' +
                'decrease/increase will be ensured.',
        )
        .setVersion('0.1.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    await app.listen(process.env.PORT || 3000, process.env.HOST || '127.0.0.1');
}

bootstrap();
