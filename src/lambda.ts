import { Context, Handler } from 'aws-lambda';
import { Server } from 'http';
import { createServer, proxy } from 'aws-serverless-express';
import { eventContext } from 'aws-serverless-express/middleware';

import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, RequestMethod, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

const express = require('express');

// NOTE: If you get ERR_CONTENT_DECODING_FAILED in your browser, this is likely
// due to a compressed response (e.g. gzip) which has not been handled correctly
// by aws-serverless-express and/or API Gateway. Add the necessary MIME types to
// binaryMimeTypes below
const binaryMimeTypes: string[] = [];

let cachedServer: Server;

async function bootstrapServer(): Promise<Server> {
    if (!cachedServer) {
        const expressApp = express();
        const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(expressApp), {
            cors: true,
            logger: ['error', 'warn', 'debug', 'log'],
        });
        // Request Validation
        nestApp.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
                transform: true,
            }),
        );
        nestApp.setGlobalPrefix('api', {
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
        nestApp.use(helmet());
        nestApp.use(eventContext());
        setupSwagger(nestApp);
        await nestApp.init();
        cachedServer = createServer(expressApp, undefined, binaryMimeTypes);
    }
    return cachedServer;
}

const setupSwagger = (app: INestApplication) => {
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
};

export const handler: Handler = async (event: any, context: Context) => {
    console.log('EVENT: ', JSON.stringify(event));
    console.log('EVENT PATH: ', JSON.stringify(event.path));
    if (!cachedServer) cachedServer = await bootstrapServer();
    return proxy(cachedServer, event, context, 'PROMISE').promise;
};
