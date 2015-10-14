var request = require('request');
var moment = require('moment');
var TelegramBot = require('node-telegram-bot-api');
var token = process.env.botkey;
var bot = new TelegramBot(token, { polling: true });

bot.on('message', function (msg) {
    var chatId = msg.chat.id;

    if (msg.text == '/nextMetroEPFL') {

        request('http://transport.opendata.ch/v1/connections?from=EPFL&to=Lausanne', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var result = JSON.parse(body);
                var message2send = '';
                for (var i = 1; i <= 4; i++) {
                    var nextMetro = result.connections[i-1].from.departure;
                    message2send += i + ': ' + moment(nextMetro).fromNow() + '\n';
                }
                bot.sendMessage(chatId, message2send );
            } else {
                bot.sendMessage(chatId, 'Error getting timetable');
            }
        })
    } else {
        bot.sendMessage(chatId, msg.text);
    }
});
        
        
var http = require('http')
var port = process.env.PORT || 1337;
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello Nepabot0.4');
}).listen(port);