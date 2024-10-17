require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const axios =require("axios");
const express = require("express");
const app = express();
const token = process.env.TELEGRAM_BOT_TOKEN;
const webAppUrl = 'https://bugalteria.netlify.app/';

app.get("/", (req, res) => {
    res.send("Bot в шоке");
});
const port = 8000;
app.listen(port, () => {
    console.log('Server running at http://localhost:${port}');
})

const bot  = new TelegramBot( token, {polling: true});

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if(text === '/start') {
        await bot.sendMessage(chatId, 'Добро пожаловать! ', {
            reply_markup: {
                inline_keyboard: [
                    [{text: 'Войти', web_app: {url: webAppUrl}}]
                ]
            }
        });
    }

});

module.exports = app;
