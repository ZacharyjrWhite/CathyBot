var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'pun':
                ftnPun(channelID);
            break;
            case 'gif':
                ftnGif(channelID);
            break;
            // Just add any case commands if you want to..
         }
     }
});

var ftnPun = function (channelID){
    var url = "https://getpuns.herokuapp.com/api/random";
    var method = "GET";
    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){

            var pun = xhttp.responseText; 
            var obj = JSON.parse(pun);
            logger.info(obj);
            
            var msg = obj.Pun;

            logger.info(msg);

            bot.sendMessage({
                to: channelID,
                message: msg
            });
        }
    }
    
    xhttp.open(method, url, true); 
    xhttp.send(); 
}

var ftnGif = function (channelID){

    const giphy = {
		baseURL: "https://api.giphy.com/v1/gifs/",
		key: "dc6zaTOxFJmzC",
		tag: "pun",
		type: "random",
		rating: "pg-13"
    };
    
    var url = "https://api.giphy.com/v1/gifs/" + giphy.type + "?api_key=" + giphy.key + "&tag=" + giphy.tag+ "&rating=" + giphy.rating;
    var method = "GET";
    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){

            var gif = xhttp.responseText; 
            var obj = JSON.parse(gif);
            var random = Math.floor(Math.random() * 10 - 0 + 0);
            logger.info(obj);
            
            var msg = obj.data.image_url;

            logger.info(msg);

            bot.sendMessage({
                to: channelID,
                message: msg
            });
        }
    }
    
    xhttp.open(method, url, true); 
  
    xhttp.send(); 
};