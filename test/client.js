var net = require('net')
  , Client = require('../src/client')
  , should = require('should')
  , events = require('events')

describe('Client', function(){
	var client, socket;

	beforeEach(function(){
		socket = new net.Socket();
		client = new Client(socket);
	});

	describe('instance', function(){
		it('should be instance of EventEmitter', function(){
			client.should.be.an.instanceof(events.EventEmitter);
		});
	});

	describe('.socket', function(){
		it('should have one "on" event', function(){
			client.socket.listeners('connect').length.should.equal(1);
		});
	});
});