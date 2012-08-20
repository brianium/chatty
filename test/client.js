var net = require('net')
  , Client = require('../src/client')
  , should = require('should')
  , events = require('events')

describe('Client', function(){
	var server, client, socket;

	before(function(){
		server = net.createServer();
		server.listen(7357);
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
			client.socket.connect(7357);
		});
	});

});