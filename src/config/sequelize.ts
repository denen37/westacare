import config from './configSetup';

module.exports = {
    development: {
        username: config.DBNAME,
        password: config.DBPASSWORD,
        database: config.DBNAME,
        host: config.DBHOST || "127.0.0.1",
        dialect: config.DBDIALECT || "mysql"
    },
    test: {
        username: config.DBNAME,
        password: config.DBPASSWORD,
        database: config.DBNAME,
        host: config.DBHOST || "127.0.0.1",
        dialect: config.DBDIALECT || "mysql"
    },
    production: {
        username: config.DBNAME,
        password: config.DBPASSWORD,
        database: config.DBNAME,
        host: config.DBHOST || "127.0.0.1",
        dialect: config.DBDIALECT || "mysql"
    }
};