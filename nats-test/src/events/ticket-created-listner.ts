import { Message, Stan } from 'node-nats-streaming';
import Listner from './base-listener';
import { Subjects } from './subjects';
import { TicketCreatedEvent } from './ticket-created-event';

export class TickeCreatedListner extends Listner<TicketCreatedEvent> {
	subject: Subjects.TicketCreated = Subjects.TicketCreated;
	queueGroupName = 'payment-service';

	constructor(client: Stan) {
		super(client);
	}
	onMessage = (data: TicketCreatedEvent['data'], msg: Message) => {
		console.log('Event data!', data);

		console.log(data.title);
		msg.ack();
	};
}
