const { Telegraf } = require('telegraf');
const axios = require('axios');// подключаем библиотеку для работы с HTTP запросами.

const bot = new Telegraf('5559310383:AAEXxVnTTbwltdmMCvXOpP7KN67Ep5V0c3c'); // Бот-токен, получен из bot_father telegram.
bot.start((ctx) => ctx.reply('Приветствую!  Меня зовут MeteoBot. Если Вам нужна погода в своем регионе, то просто пришлите мне Вашу геопозицию!'));
bot.on('message', async (ctx)=>{// 1.бот принимает соощение
    if(ctx.message.location){ // 2.если в сообщении есть локация
    console.log(ctx.message.location); /// 3.бот выводит в консоль сообщение с локацией
    let url= `http://api.openweathermap.org/geo/1.0/reverse?lat=${ctx.message.location.latitude}&lon=${ctx.message.location.longitude}&limit=5&appid=c4ea603e7b9de0f23b6ca1b332c833b1`;
    let url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${ctx.message.location.latitude}&lon=${ctx.message.location.longitude}&appid=c4ea603e7b9de0f23b6ca1b332c833b1`;
    let reply = await axios.get(url); //обращаемся к стороннему сереру для получения погоды по координатам.
    let reply2= await axios.get(url2);// обращаемся к сереру для для более точного получения местоположения. В строке 9 использовано обратное геокодирование, тк при пером запросе (стр9) местоположение выдается неточное.
    console.log(reply, reply2);// вывод ответа с сервера, после обращения по ссылкам url, url2
    ctx.reply(`${reply.data[0].name}: ${Math.round(reply2.data.main.temp - 273.15)} °C`); // итоговый отет бота.
    }
}
)
bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));