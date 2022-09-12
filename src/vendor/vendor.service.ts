import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Vendor } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { VendorDto } from './dto';

@Injectable()
export class VendorService {
    constructor(private config: ConfigService, private prisma: PrismaService) {}

    create = async (data: VendorDto) => {
        try {
            return await this.prisma.vendor.create({ data });
        } catch (e) {
            throw new ForbiddenException('Vendor is already exists.');
        }
    };

    updateProductStock = async (
        vendorID: string,
        productType: string,
        orderAmount: number,
    ) => {
        try {
            const vendor: Vendor = await this.getVendorById(vendorID);
            const updatedAmount = vendor[productType] - orderAmount;
            this.checkStock(updatedAmount);
            return await this.prisma.vendor.update({
                where: { vendorID },
                data: {
                    [productType]: {
                        set: updatedAmount,
                    },
                },
            });
        } catch (e) {
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
            throw new ForbiddenException(
                'Not enough product to order in this vendor.',
            );
        }
    };
}
