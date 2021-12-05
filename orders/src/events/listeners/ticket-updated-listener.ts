import { Message } from "node-nats-streaming";
import {
  Subjects,
  Listener,
  TicketUpdatedEvent,
  BadRequestError,
} from "@mlproducts/common";
import { Ticket } from "../../models/ticket";
import { queueGroupName } from "./queue-group-name";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: TicketUpdatedEvent["data"], msg: Message) {
    const { id, title, price } = data;

    const ticket = await Ticket.findById(id);

    if (!ticket) {
      throw new BadRequestError("Ticket not found");
    }

    ticket.set({ title, price });
    await ticket.save();

    msg.ack();
  }
}
