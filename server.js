var http = require('http')
var port = process.env.PORT || 1337;

var TelegramBot = require('node-telegram-bot-api');
var azure = require('azure');

azure.RoleEnvironment.getConfigurationSettings(function (error, settings) {
    if (!error) {
        var token = process.env.botkey;
        var bot = new TelegramBot(token, { polling: true });
        
        bot.on('message', function (msg) {
            var chatId = msg.chat.id;
            bot.sendMessage(chatId, "hello!");
        });
    }
});

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello Nepabot2');
}).listen(port);