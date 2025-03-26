"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const configSetup_1 = __importDefault(require("./configSetup"));
module.exports = {
    development: {
        username: configSetup_1.default.DBUSERNAME,
        password: configSetup_1.default.DBPASSWORD,
        database: configSetup_1.default.DBNAME,
        host: configSetup_1.default.DBHOST || "127.0.0.1",
        dialect: configSetup_1.default.DBDIALECT || "mysql"
    },
    test: {
        username: configSetup_1.default.DBUSERNAME,
        password: configSetup_1.default.DBPASSWORD,
        database: configSetup_1.default.DBNAME,
        host: configSetup_1.default.DBHOST || "127.0.0.1",
        dialect: configSetup_1.default.DBDIALECT || "mysql"
    },
    production: {
        username: configSetup_1.default.DBUSERNAME,
        password: configSetup_1.default.DBPASSWORD,
        database: configSetup_1.default.DBNAME,
        host: configSetup_1.default.DBHOST || "127.0.0.1",
        dialect: configSetup_1.default.DBDIALECT || "mysql"
    }
};
