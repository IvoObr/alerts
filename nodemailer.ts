const nodemailer = require("nodemailer");
const commodity = process.env.COMMODITY;

let transporter = nodemailer.createTransport({
  host: process.env.MAILER_SERVICE,
  secure: true,
  port: Number(process.env.MAILER_PORT),
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASS,
  },
  debug: false,
  logger: true,
});

export const sendMail = async (text: string) => {
  return await transporter.sendMail({
    from: `"${commodity}PriceAlerts" <${process.env.MAILER_USER}>`,
    to: process.env.EMAIL,
    subject: `${commodity}PriceAlerts`,
    text: text,
  });
};

export {};
