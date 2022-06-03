const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
  env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:21827';

const PROXY_CONFIG = [
  {
    context: [
      "/api/v1/weatherForecast", //!! be careful !!, this path is case sensitive in forwarding api calls
      "/api/v1/schoolDemo",
   ],
    target: target,
    secure: false,
    headers: {
      Connection: 'Keep-Alive'
    }
  }
]

module.exports = PROXY_CONFIG;
