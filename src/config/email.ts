const nodemailer = require('nodemailer');
import config from '../config/configSetup'


export const transporter = nodemailer.createTransport({
    service: config.EMAIL_SERVICE,
    port: config.EMAIL_PORT,
    secure: config.EMAIL_PORT === 465 ? true : false,
    auth: {
        user: config.EMAIL_USER,
        pass: config.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});
