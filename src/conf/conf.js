const conf = {
    HOSTNAME: String(process.env.HOSTNAME),
    PORT: String(process.env.PORT),
    CORS_ORIGIN: String(process.env.CORS_ORIGIN),
    MONGODB_URI: String(process.env.MONGODB_URI),
    ACCESS_TOKEN_SECRET: String(process.env.ACCESS_TOKEN_SECRET),
    ACCESS_TOKEN_EXPIRY: String(process.env.ACCESS_TOKEN_EXPIRY),
    REFRESH_TOKEN_SECRET: String(process.env.REFRESH_TOKEN_SECRET),
    REFRESH_TOKEN_EXPIRY: String(process.env.REFRESH_TOKEN_EXPIRY),
}

export default conf
