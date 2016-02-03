var settings = require("./settings");
var irc = require('irc');
var _ = require('underscore');

console.log("IRC loading " + settings.IRC.server);
var client = new irc.Client(settings.IRC.server, settings.IRC.nick, {
    "password":settings.IRC.password,
    "userName":settings.IRC.nick,
    "debug":false,
    "channels":settings.IRC.channels
});

//PubNub 
var pubnub = require("pubnub")({
    ssl:true,
    publish_key: settings.pubnub.publish_key,
    subscribe_key: settings.pubnub.subscribe_key,
});

// Should be a database
var entryCount = 0;

client.addListener('message#', function (from, to, message) {
    console.log(from + ' => ' + to + ': ' + message);
    // Test
    if (stringStartsWith(message, "hello")) {
        console.log("responding");
        client.say(to, "Hello " + from);
    }

    // Entry
    if (stringStartsWith(message, "!entry ")) {
        console.log("New entry received! " + message);

        // TODO: Validate the entry

        pubnub.publish({
            channel: to,
            message: {
                "action":"entry",
                "entry":message.substr(7),
                "index": ++entryCount
            },
            callback: function(e){console.log("Success!", e); },
            error: function(e){console.log("Failed!", e); }
        });
        client.say(to, "Entry received from " + from);
    }

    if (stringStartsWith(message, "!vote ")) {
        console.log("New vote! ", message);

        // TODO: Validate the vote number

        pubnub.publish({
            channel: to,
            message: {
                "action":"vote",
                "index":parseInt(message.substr(6))
            }
        });
    }

});

client.addListener('join', function(channel, nick, message) {
    console.log("Joined: ", channel);
    // client.say(channel, "Hello");
});

// client.addListener('raw', function(message){
//     console.log("Raw: ", message);
// });

function stringStartsWith (string, prefix) {
    return string.slice(0, prefix.length) == prefix;
}

// console.log(client);

module.exports = this;