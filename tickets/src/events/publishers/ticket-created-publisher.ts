import { Publisher, Subjects, TicketCreatedEvent } from '@mlproducts/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
	subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
