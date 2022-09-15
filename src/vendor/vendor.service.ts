import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Vendor } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { GetVendorDto, NewVendorDto } from './dto';

@Injectable()
export class VendorService {
    private readonly logger = new Logger(VendorService.name);

    constructor(private config: ConfigService, private prisma: PrismaService) {}

    create = async (data: NewVendorDto) => {
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

    get = async (vendorID: string) => {
        try {
            const vendor: Vendor = await this.getVendorById(vendorID);
            const vendorDto: GetVendorDto = {
                vendorID: vendor.vendorID,
                softener: vendor.softener,
                detergent: vendor.detergent,
                createdAt: vendor.createdAt,
                updatedAt: vendor.updatedAt,
            };
            this.logger.debug(`Vendor with ID: ${vendor.id} was found.`);
            return vendorDto;
        } catch (e) {
            throw new ForbiddenException('Vendor is not found.');
        }
    };

    getAll = async () => {
        try {
            const vendors: GetVendorDto[] = await this.prisma.vendor.findMany({
                select: {
                    vendorID: true,
                    softener: true,
                    detergent: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });
            this.logger.debug(`Vendors were found.`);
            return vendors;
        } catch (e) {
            throw new ForbiddenException('Vendors are not found.');
        }
    };

    private getVendorById = async (vendorID: string) => {
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
