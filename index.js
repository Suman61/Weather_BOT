const TelegramBot = require('node-telegram-bot-api');
const axios = require("axios");

const token = "6544708852:AAF45i8b1DcaHdENyjX9tWE5zkDoDUnUAi8";

const bot = new TelegramBot(token, {polling: true});

bot.on("message", async(msg) => {
    const chatId = msg.chat.id;
    const userInput = msg.text;
  
    try{
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=7819267af2f49fbd2303676a5b15af97`
        );
        const data = response.data;
        const weather = data.weather[0].description;
        const temperature = data.main.temp - 273.15;
        const city = data.name;
        const humidity = data.main.humidity;
        const pressure = data.main.pressure;
        const windSpeed = data.wind.speed;
        const message = `The weather in ${city} is ${weather} with a temperature of ${temperature.toFixed(2)}C. The humidity is ${humidity}%, the pressure is ${pressure}hPa, and the wind speed is ${windSpeed}m/s.`;

        bot.sendMessage(chatId, message);
    }
    catch(error){
        bot.sendMessage(chatId, "City dosen't exist");
    }
})