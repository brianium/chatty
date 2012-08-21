var util = require('util')
  , events = require('events')
  , helpers = require('./utils');

module.exports = Client;

function Client(socket) {
    events.EventEmitter.call(this);
    socket.setEncoding('utf8');
    this.socket = socket;
    this.socket.on('connect', this.connected.bind(this));
}

util.inherits(Client, events.EventEmitter);

Client.prototype = helpers.extend(Client.prototype, {

    isDataRead:false,

    username:undefined,

    connected:function() {
        ["Connected on " + this.socket.remoteAddress,
         "Type to chat or type 'quit' to disconnect",
         "Please provide your name: "].forEach(this.writeLine.bind(this));

        this.socket.on('data', this.dataReceived.bind(this));

        this.emit("connect", this);
    },

    dataReceived:function(str) {
        this.username ? this.emit('message', this, str) 
                      : this.setUsername(str.trim());

        this.emit('data', str);
    },

    setUsername:function(username) {
        this.username = username;
        this.writeLine("Welcome " + username + '!');
        this.emit("user", this);
    },

    writeLine:function(msg) {
        this.socket.write(msg + "\r\n");
    }
});