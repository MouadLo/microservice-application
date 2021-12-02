import nats, { Message, Stan } from 'node-nats-streaming';
import { randomBytes } from 'crypto';
import { TickeCreatedListner } from './events/ticket-created-listner';

console.clear();

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
	url: 'http://localhost:4222',
});

stan.on('connect', () => {
	console.log('Listener Connected to NATS streaming server');

	stan.on('close', () => {
		console.log('NATS connection closed');
		process.exit();
	});

	new TickeCreatedListner(stan).listen();
});

process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());
