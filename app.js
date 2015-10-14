var TelegramBot = require('node-telegram-bot-api');
var azure = require('azure');
var token ;

azure.RoleEnvironment.getConfigurationSettings(function (error, settings) {
    if (!error) {
        var token = settings['botkey'];
        var bot = new TelegramBot(token, { polling: true });
        
        bot.on('message', function (msg) {
            var chatId = msg.chat.id;
            bot.sendMeassage(chatId, "hello!");
        });
    }
});
