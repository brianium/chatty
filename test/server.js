var net = require('net')
  , Server = require('../src/server')
  , Client = require('../src/client')
  , should = require('should');

describe('Server', function(){
    
    it('can be constructed with port', function(){
        var server = new Server(8000);
        server.port.should.eql(8000);
    });

    it('can be constructed with ip as well', function() {
        var server = new Server(8000, '10.11.12.140');
        server.ip.should.eql('10.11.12.140');
    });

    describe('start()', function() {

        it('should set the socket property', function() {
            var server = new Server(8000);
            server.start();
            server.socket.should.be.instanceOf(net.Server);
        });

    })
});