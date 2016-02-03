var settings = require("./settings");
var irc = require('irc');
console.log("IRC loading " + settings.IRC.server);
var client = new irc.Client(settings.IRC.server, settings.IRC.nick, {
    "password":settings.IRC.password,
    "userName":settings.IRC.nick,
    "debug":true,
    "channels":settings.IRC.channels

});

client.addListener('message#', function (from, to, message) {
    console.log(from + ' => ' + to + ': ' + message);
    if(stringStartsWith(message, "hello")){
        console.log("responding");
        client.say(to, "Hello " + from);
    }
});

client.addListener('join', function(channel, nick, message) {
    console.log("Joined: ", channel, nick, message);
    client.say(channel, "Hello");
});

// client.addListener('raw', function(message){
//     console.log("Raw: ", message);
// });

function stringStartsWith (string, prefix) {
    return string.slice(0, prefix.length) == prefix;
}

// console.log(client);

module.exports = this;