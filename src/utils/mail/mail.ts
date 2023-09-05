import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { Attachments, Mail } from './mail.types';
/**
 * Permite enviar un correo electrónico
 * @param message mensaje ha enviar
 * @param _SMTPTransport SMTP Transport
 * @returns
 */
export const sendMail = (
    message: Mail,
    _SMTPTransport: SMTPTransport | any = {
        host: process.env.MAILER_HOST,
        port: parseInt(`${process.env.MAILER_PORT}`),
        secure: process.env.MAILER_SECURE,
        auth: {
            user: process.env.MAILER_USER,
            pass: process.env.MAILER_PASSWORD,
        },
    }
): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        try {
            /**
             * Crear transporter con la configuración del app.config -> Nota: Si la integracion es
             * con gmail se debe poner la clave de aplicaciones en el password y el secure es igual a true
             * Ejemplo:
             * host: 'smtp.gmail.com'
             * port: 465
             * secure: true
             * user: 'angelloor.dev@gmail.com'
             * password: 'contraseña de aplicaciones'
             */
            const transporter = nodemailer.createTransport(_SMTPTransport);
            /**
             * sending
             */
            transporter.sendMail(message).then(() => {
                resolve(`MessageAPI: email sent to ${message.to}`);
            });
        } catch (error: any) {
            reject(error.toString());
        }
    });
};
/**
 * Permite crear un correo con la información proporcionada
 * @param from remitente
 * @param mail destinatario
 * @param subject asunto
 * @param html cuerpo del correo
 * @param attachments anexos
 * @returns Mail Object
 */
export const generateMail = (
    from: string,
    mail: string,
    subject: string,
    html: string,
    attachments: Attachments[] = []
): Mail => {
    return {
        from: from,
        to: mail,
        subject: subject,
        html: html,
        attachments: attachments,
    };
};
