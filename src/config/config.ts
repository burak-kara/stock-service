export default () => ({
    connection: {
        port: parseInt(process.env.PORT, 10) || 3000,
        host: process.env.HOST || '0.0.0.0',
    },
    minDeviceIdLength: parseInt(process.env.MIN_DEVICE_ID_LENGTH, 10) || 1,
    maxDeviceIdLength: parseInt(process.env.MAX_DEVICE_ID_LENGTH, 10) || 40,
    minAmount: parseInt(process.env.MIN_AMOUNT, 10) || 0,
    maxAmount: parseInt(process.env.MAX_AMOUNT, 10) || 700,
    minVendorIdLength: parseInt(process.env.MIN_VENDOR_ID_LENGTH, 10) || 1,
    maxVendorIdLength: parseInt(process.env.MAX_VENDOR_ID_LENGTH, 10) || 40,
    minProductIdLength: parseInt(process.env.MIN_PRODUCT_ID_LENGTH, 10) || 1,
    maxProductIdeLength: parseInt(process.env.MAX_PRODUCT_ID_LENGTH, 10) || 40,
    orderAmount: parseInt(process.env.ORDER_AMOUNT, 10) || 500,
});
