import { Logger } from "@7util/logger";

const options = {
  useColor: true,
  logInFile: false,
  logLevel: process.env.LOG_LEVEL,
};

const logger = new Logger(options);

export default logger;
