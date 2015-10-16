var request = require('request');
var moment = require('moment');
var TelegramBot = require('node-telegram-bot-api');
var token = process.env.botkey;
var bot = new TelegramBot(token, { polling: true });

function sendTimeTables(url, msg){
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var opts = {
                reply_to_message_id: msg.message_id
            };

            var result = JSON.parse(body);
            var message2send = '';
            for (var i = 1; i <= 4; i++) {
                var nextMetro = result.connections[i - 1].from.departure;
                message2send += i + ': ' + moment(nextMetro).fromNow() + '\n';
            }
            bot.sendMessage(msg.chat.id, message2send, opts);
        } else {
            bot.sendMessage(msg.chat.id, 'Error getting timetable', opts);
        }
    })
};

bot.on('message', function (msg) {
    var chatId = msg.chat.id;

    if (msg.text == '/next') {
        
        var opts = {
            reply_to_message_id: msg.message_id,
            reply_markup: JSON.stringify({
                keyboard: [
                    ['Metro from EPFL to lausanne'],
                    ['Metro from EPFL to renens']],
                one_time_keyboard: true
            }),
            ForceReply: true
        };
        bot.sendMessage(chatId, 'Where do you want to go?', opts);
    } else if (msg.text == 'Metro from EPFL to lausanne') {
        sendTimeTables('http://transport.opendata.ch/v1/connections?from=EPFL&to=Lausanne', msg);
    } else if (msg.text == 'Metro from EPFL to renens') {
        sendTimeTables('http://transport.opendata.ch/v1/connections?from=EPFL&to=renens', msg);
    } else if (msg.text == '/help') { 
        
    } else {
        bot.sendMessage(chatId, msg.text);
    }
});
        
        
var http = require('http')
var port = process.env.PORT || 1337;
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello Nepabot0.5');
}).listen(port);