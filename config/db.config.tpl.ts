export default {
    mysql: {
        "type": "mysql",
        "host": "localhost",
        "port": 3306,
        "username": "_username_",
        "password": "_password_",
        "database": "pserver",
        "entities": ["dist/**/*.entity{.ts,.js}"],
        "synchronize": true
    },
    redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
        db: parseInt(process.env.REDIS_DB),
        password: process.env.REDIS_PASSWORD,
        keyPrefix: process.env.REDIS_PRIFIX,
    }
}