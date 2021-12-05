import { Publisher, OrderCancelledEvent, Subjects } from "@mlproducts/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
