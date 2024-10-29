require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const axios = require("axios");
const express = require("express");
const app = express();
const token = process.env.TELEGRAM_BOT_TOKEN;
const webAppUrl = 'https://bugalteria.netlify.app/';

let startCount = 0; // Инициализация счетчика

app.get("/", (req, res) => {
    res.send("Bot в шоке");
});
const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

const bot = new TelegramBot(token, {polling: true});

// Обработка ошибки polling_error
bot.on('polling_error', (error) => {
    console.error('Polling error:', error.code, error.message);
});

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === '/start') {
        startCount++; // Увеличение счетчика
        await bot.sendMessage(chatId, 'Добро пожаловать!', {
            reply_markup: {
                inline_keyboard: [
                    [{text: 'Войти', web_app: {url: webAppUrl}}]
                ]
            }
        });
    } else if (text === '/count') {
        await bot.sendMessage(chatId, `Бот был запущен ${startCount} раз(а).`);
    } else {
        return;
    }
});

module.exports = app;
