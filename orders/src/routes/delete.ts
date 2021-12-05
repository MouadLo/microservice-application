import express, { Request, Response } from "express";
import {
  requireAuth,
  NotFoundError,
  BadRequestError,
  NotAuthorizedError,
  OrderStatus,
} from "@mlproducts/common";
import { Order } from "../models/order";
import mongoose from "mongoose";
import { natsWrapper } from "../nats-wrapper";
import { OrderCancelledPublisher } from "../events/publishers/order-cancelled-publisher";

const router = express.Router();

router.delete(
  "/api/orders/:orderId",
  requireAuth,
  async (req: Request, res: Response) => {
    if (!mongoose.isValidObjectId(req.params.orderId)) {
      throw new BadRequestError("You must provide a valid order");
    }
    const order = await Order.findById(req.params.orderId).populate("ticket");
    if (!order) {
      throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    order.status = OrderStatus.Cancelled;
    await order.save();

    // Publish an event saying that the order was Cancelled
    new OrderCancelledPublisher(natsWrapper.client).publish({
      id: order.id,
      ticket: {
        id: order.ticket.id,
      },
    });
    res.status(204).send(order);
  }
);

export { router as deleteOrderRouter };
