var util = require('util')
  , net = require('net')
  , Client = require('./client')
  , events = require('events')
  , helpers = require('./utils');

module.exports = ChatServer;

function ChatServer(port, ip) {
    events.EventEmitter.call(this);
    this.port = port;
    this.ip = ip;
    this.clients = [];
    this.socket = net.createServer(this.newClient.bind(this));
}

util.inherits(ChatServer, events.EventEmitter);

ChatServer.prototype = helpers.extend(ChatServer.prototype, {

    newClient:function(socket) {
        var client = new Client(socket);
        client.on("user", this.userConnected.bind(this));
        client.on("message", this.userMessaged.bind(this));
        this.addClient(client);
        this.emit('add-client', this.clients);
    },

    start:function() {
        this.socket.listen(this.port, this.ip);
    },

    addClient:function(client) {
        this.clients.push(client);
    },

    userConnected:function(client) {
        this.broadcast(client.username + " has connected", client);
    },

    userMessaged:function(client, msg) {
        (msg.trim()) && this.broadcast(client.username + " says: " + msg, client);
    },

    broadcast:function(msg, exclude) {
        this.clients.forEach(function(c){
            if(c && c !== exclude)
                c.writeLine(msg);
        });
    }
});