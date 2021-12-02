import { Publisher, Subjects, TicketUpdatedEvent } from '@mlproducts/common';
import { Stan } from 'node-nats-streaming';

export class TicketUpdatededPublisher extends Publisher<TicketUpdatedEvent> {
	subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
