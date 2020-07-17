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
        name: 'pserver',
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: parseInt(process.env.REDIS_PORT) || 6379,
        db: parseInt(process.env.REDIS_DB),
        password: process.env.REDIS_PASSWORD,
        keyPrefix: process.env.REDIS_PRIFIX,
    }
}