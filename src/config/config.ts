export default () => ({
    connection: {
        port: parseInt(process.env.PORT, 10) || 3000,
        host: process.env.HOST || '0.0.0.0',
    },
    consume: {
        minDeviceIdLength: parseInt(process.env.MIN_DEVICE_ID_LENGTH, 10) || 1,
        maxDeviceIdLength: parseInt(process.env.MAX_DEVICE_ID_LENGTH, 10) || 40,
        minAmount: parseInt(process.env.MIN_AMOUNT, 10) || 1,
        maxAmount: parseInt(process.env.MAX_AMOUNT, 10) || 700,
    },
});
