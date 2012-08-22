var net = require('net')
  , Server = require('../src/server')
  , Client = require('../src/client')
  , should = require('should');

describe('Server', function(){
    var server
    ,   port = 8000;

    beforeEach(function(){
        server = new Server(port);
    });

    it('can be constructed with port', function(){
        var server = new Server(1234);
        server.port.should.eql(1234);
    });

    it('can be constructed with ip as well', function() {
        var server = new Server(1234, '10.11.12.140');
        server.ip.should.eql('10.11.12.140');
    });

    it('should be constructed with a socket', function(){
        server.socket.should.be.instanceOf(net.Server);
    });

    it('should bind connection event at construction', function(){
        server.socket.listeners('connection').length.should.equal(1);
    });

    describe('newClient()', function() {

        beforeEach(function(){
            server.start();
        });

        afterEach(function(){
            server.socket.close();
        });

        it("should add client to clients collection", function(done) {
            var socket = new net.Socket();
            server.on('add-client', function(clients) {
                clients.length.should.equal(1);
                done();
            });
            socket.connect(port);
        });

        it("should bind event to client's user event", function(done) {
            var socket = new net.Socket();
            server.on('add-client', function(clients) {
                clients[0].listeners('user').length.should.equal(1);
                done();
            });
            socket.connect(port);
        });

        it("should bind event to client's message event", function(done) {
            var socket = new net.Socket();
            server.on('add-client', function(clients) {
                clients[0].listeners('message').length.should.equal(1);
                done();
            });
            socket.connect(port);
        });

    });
});