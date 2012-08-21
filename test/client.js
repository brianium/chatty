var net = require('net')
  , Client = require('../src/client')
  , should = require('should')
  , events = require('events')

describe('Client', function(){
    var server, client, socket,
        port = 7357;

    before(function(){
        server = net.createServer();
        server.listen(port);
    });

    after(function(){
        server.close();
    });

    beforeEach(function(){
        socket = new net.Socket();
        client = new Client(socket);
    });

    describe('.socket', function(){
        
        it('should connect to server', function(){
            client.socket.connect(port);
        });

        it('should bind connect event', function(){
            client.socket.listeners('connect').length.should.equal(1);
        });
    });

    describe('.isDataRead', function() {
        it('should initialize to false', function(){
            client.isDataRead.should.be.false;
        });
    });

    describe('connected()', function() {

        it('should emit "connect" event when socket connects', function(done){
            client.on('connect', function(){
                this.should.equal(client);
                done();
            });
            client.socket.connect(port);
        });

        it('should bind data event on socket', function(done){
            client.on('connect', function(){
                this.socket.listeners('data').length.should.equal(1);
                done();
            })
            client.socket.connect(port);
        });
    });

    describe('dataReceived()', function() {

        it('should set username to first string read', function(done) {
            client.on('data', function() {
                client.username.should.equal('brian');
                done();
            });

            client.on('connect', function(){
                client.socket.emit('data', 'brian');
            });

            client.socket.connect(port);
        });

        it('should emit message event with client and string for reads after first', function(done){
            client.on('message', function(cl, msg) {
                cl.should.equal(client) && msg.should.eql("hello world");
                done();
            });

            client.on('connect', function(){
                client.socket.emit('data', 'brian');
                client.socket.emit('data', 'hello world');
            });

            client.socket.connect(port);
        });
    });

    describe('setUsername()', function() {

        it('should emit user event with client name set', function(done){
            client.on('user', function(cl) {
                cl.should.equal(client) && client.username.should.equal('brian');
                done();
            });

            client.on('connect', function(){
                client.socket.emit('data', 'brian');
            });

            client.socket.connect(port);
        });
    });
    
});