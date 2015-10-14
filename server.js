﻿var http = require('http')
var port = process.env.PORT || 1337;

var TelegramBot = require('node-telegram-bot-api');
var azure = require('azure');

var token = process.env.botkey;
var bot = new TelegramBot(token, { polling: true });

bot.on('text', function (msg) {
    var chatId = msg.chat.id;
    bot.sendMessage(chatId, "hello!");
});
        
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello Nepabot0.3');
}).listen(port);