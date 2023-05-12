require('dotenv').config();
import {cron} from 'node-cron';
import { fetchPrice } from "./fetchPrice";
import { sendMail } from "./nodemailer";
import logger from './logger';

// todo: fix node cron import and compile. Todo: test

logger.info('Starting GoldPriceAlerts job.');
logger.info('GoldPriceAlerts will run every 59 minutes.');

cron.schedule('*/59 * * * *', async () => {
  try {

  fetchPrice().then(async (res: any) => {
    const price = JSON.parse(res).price;
    logger.info("res  ", price);



    if (price < Number(process.env.HIGH_VALUE)) { 
      const info = await sendMail("Gold price now is " + price + " USD per troy ounce.");
      logger.info("Message sent: %s", info.messageId);
      logger.info("Done");
    }



    if (price < Number(process.env.LOW_VALUE)) { 
      const info = await sendMail("Gold price now is " + price + " USD per troy ounce.");
      logger.info("Message sent: %s", info.messageId);
      logger.info("Done");
    }

    logger.warn('Price is above ', Number(process.env.HIGH_VALUE), ' USD per troy ounce.')
    
  });

  } catch (error) {
    const info = await sendMail("Gold price ferch error " + error);
    logger.info("Message sent: %s", info.messageId);
    logger.info("Done");

  }
});
