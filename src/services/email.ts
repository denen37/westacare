import { transporter } from '../config/email'
import { templateData } from '../utils/template';
import config from '../config/configSetup'

export async function sendEmail(to: string, subject: string, text: string, username: string | undefined) {
    const mailOptions = {
        from: config.EMAIL_USER,
        to: to,
        subject: subject,
        text: '',
        html: templateData(text, username)
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        return info;
    } catch (error) {
        console.log(error)
        return
    }
}
