import nats from 'node-nats-streaming';
import { randomBytes } from 'crypto';
import { TicketCreatedPublisher } from './events/ticket-create-publisher';

console.clear();

const stan = nats.connect('ticketing', 'abc', {
	url: 'http://localhost:4222',
});

stan.on('connect', async () => {
	console.log('Publisher Connected to NATS streaming server');

	const publisher = new TicketCreatedPublisher(stan);
	try {
		await publisher.publish({
			id: '123',
			title: 'concert',
			price: 20,
		});
	} catch (error) {
		console.error(error);
	}
});
