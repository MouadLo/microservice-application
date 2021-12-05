import { Publisher, Subjects, TicketUpdatedEvent } from '@mlproducts/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
	subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
