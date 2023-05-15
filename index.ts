require('dotenv').config();
import { schedule } from 'node-cron';
import { fetchPrice } from "./fetchPrice";
import { sendMail } from "./nodemailer";
import logger from './logger';

const commodity = process.env.COMMODITY;

logger.info(`Starting ${commodity}PriceAlerts job.`);
logger.info(`${commodity}PriceAlerts will run every 59 minutes.`);

schedule('*/59 * * * *', async () => {
  try {

  fetchPrice().then(async (res: any) => {
    const price = JSON.parse(res).price;
    logger.info("res  ", price);



    if (price < Number(process.env.HIGH_VALUE)) { 
      const info = await sendMail(`${commodity} price now is ${price} USD per troy ounce.`);
      logger.info("Message sent: %s", info.messageId);
      logger.info("Done");
    }



    if (price < Number(process.env.LOW_VALUE)) { 
      const info = await sendMail(`${commodity} price now is ${price} USD per troy ounce.`);
      logger.info("Message sent: %s", info.messageId);
      logger.info("Done");
    }

    if (price > Number(process.env.HIGH_VALUE)) { 
      logger.warn('Price is above ', Number(process.env.HIGH_VALUE), ' USD per troy ounce.')
    }
    
  });

  } catch (error) {
    const info = await sendMail(`${commodity} price ferch error ${error.message}`);
    logger.info("Message sent: %s", info.messageId);
    logger.info("Done");

  }
});
