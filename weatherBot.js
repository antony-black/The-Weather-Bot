const { Telegraf } = require('telegraf');
const axios = require('axios');

const bot = new Telegraf('6148427925:AAGs3eXafaWpjMJgHjHA82y36RvJ89D47KI');
bot.start((ctx) => ctx.reply('Hi, there'));
bot.on('message', async (ctx) => {
const location = ctx.message.location;

  if (location) {
    // console.log(ctx.message.location);
    const lat = ctx.message.location.latitude;
    const lon = ctx.message.location.longitude;

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=bce55d64e996b38e0c8cf0b6cbc49b3c`;
    const response = await axios.get(url);
    // console.log(response);
    const locationName = response.data.name;
    const temp = transformToCelsius(response.data.main.temp);
    ctx.reply(`${locationName}: ${temp}C`);
  }
});

const transformToCelsius = (kelvin) => {
  return Math.floor(kelvin - 273.15);
}

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))