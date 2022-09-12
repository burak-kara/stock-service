import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Vendor } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { VendorDto } from './dto';

@Injectable()
export class VendorService {
    private readonly logger = new Logger(VendorService.name);

    constructor(private config: ConfigService, private prisma: PrismaService) {}

    create = async (data: VendorDto) => {
        try {
            const vendor: Vendor = await this.prisma.vendor.create({ data });
            this.logger.debug(`Vendor created with ID: ${vendor.id}`);
            return vendor;
        } catch (e) {
            this.logger.error(e);
            throw new ForbiddenException('Vendor is already exists.');
        }
    };

    updateProductStock = async (vendorID: string, productType: string, orderAmount: number) => {
        try {
            const vendor: Vendor = await this.getVendorById(vendorID);
            const updatedAmount: number = vendor[productType] - orderAmount;
            this.checkStock(updatedAmount);
            const updatedVendor: Vendor = await this.prisma.vendor.update({
                where: { vendorID },
                data: {
                    [productType]: {
                        set: updatedAmount,
                    },
                },
            });
            this.logger.debug(`Vendor updated with ID: ${updatedVendor.id}`);
            return updatedVendor;
        } catch (e) {
            this.logger.error(e);
            if (e instanceof ForbiddenException) {
                throw e;
            } else {
                throw new ForbiddenException('Vendor is not found.');
            }
        }
    };

    getVendorById = async (vendorID: string) => {
        try {
            return await this.prisma.vendor.findUnique({
                where: { vendorID },
            });
        } catch (e) {
            throw new ForbiddenException('Vendor is not found.');
        }
    };

    private checkStock = (updatedAmount: number) => {
        if (updatedAmount < 0) {
            throw new ForbiddenException('Not enough product to order in this vendor.');
        }
    };
}
