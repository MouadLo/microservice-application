import { Message, Stan } from 'node-nats-streaming';
import Listner from './base-listener';
import { Subjects } from './subjects';
import { TicketUpdatedEvent } from './ticket-updated-event';

export class TickeUpdatedListner extends Listner<TicketUpdatedEvent> {
	subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
	queueGroupName = 'payment-service';

	constructor(client: Stan) {
		super(client);
	}
	onMessage = (data: TicketUpdatedEvent['data'], msg: Message) => {
		console.log('Event data!', data);

		console.log(data.title);
		msg.ack();
	};
}
