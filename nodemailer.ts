const nodemailer = require("nodemailer");


let transporter = nodemailer.createTransport({
    host: process.env.MAILER_SERVICE,
    secure: true,
    port: Number(process.env.MAILER_PORT),
    auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS
    },
    debug: false,
    logger: true
});


export const sendMail = async (text: string) => {
        return await transporter.sendMail({
        from: `"GoldPriceAlerts" <${process.env.MAILER_USER}>`,
        to: process.env.EMAIL,
        subject: 'Gold Price Alerts',
        text: text,
    })
}

export { };
