import config from './configSetup';

module.exports = {
    development: {
        username: config.DBUSERNAME,
        password: config.DBPASSWORD,
        database: config.DBNAME,
        host: config.DBHOST || "127.0.0.1",
        dialect: config.DBDIALECT || "mysql"
    },
    test: {
        username: config.DBUSERNAME,
        password: config.DBPASSWORD,
        database: config.DBNAME,
        host: config.DBHOST || "127.0.0.1",
        dialect: config.DBDIALECT || "mysql"
    },
    production: {
        username: config.DBUSERNAME,
        password: config.DBPASSWORD,
        database: config.DBNAME,
        host: config.DBHOST || "127.0.0.1",
        dialect: config.DBDIALECT || "mysql"
    }
};