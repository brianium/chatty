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

});