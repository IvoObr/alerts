
import logger from './logger';

const apiKey: string = process.env.API_KEY;
const myHeaders = new Headers();

myHeaders.append("x-access-token", apiKey);
myHeaders.append("Content-Type", "application/json");

const requestOptions:  RequestInit = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

export const fetchPrice = () => fetch(process.env.API_URL, requestOptions)
  .then(response => response.text())
  .then(result => {
    return result
})
  .catch(error => logger.info('error', error));

