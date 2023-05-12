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



    if (price < 1950) {
      const info = await sendMail("Gold price now is " + price + " USD per troy ounce.");
      logger.info("Message sent: %s", info.messageId);
      logger.info("Done");
    }



    if (price < 1850) {
      const info = await sendMail("Gold price now is " + price + " USD per troy ounce.");
      logger.info("Message sent: %s", info.messageId);
      logger.info("Done");
    }

    logger.warn('Price is above 1950 USD per troy ounce.')
    
  });

  } catch (error) {
    const info = await sendMail("Gold price ferch error " + error);
    logger.info("Message sent: %s", info.messageId);
    logger.info("Done");

  }
});
