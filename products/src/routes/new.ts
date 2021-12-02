import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import nats from 'node-nats-streaming';
import { requireAuth, validateRequest } from '@mlproducts/common';
import { Ticket } from '../models/ticket';
import { TicketCreatedPublisher } from '../events/publihsers/ticket-created-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.post(
	'/api/tickets',
	requireAuth,
	[
		body('title').not().isEmpty().withMessage('Title is required'),
		body('price')
			.isFloat({ gt: 0 })
			.withMessage('Price must be greater than 0'),
	],
	validateRequest,
	async (req: Request, res: Response) => {
		const { title, price } = req.body;

		const ticket = Ticket.build({
			title,
			price,
			userId: req.currentUser!.id,
		});
		await ticket.save();

		await new TicketCreatedPublisher(natsWrapper.client).publish({
			id: ticket.id,
			title: ticket.title,
			price: ticket.price,
			userId: ticket.userId,
		});

		// stan.publish('ticket:created', JSON.stringify(event), () => {
		// 	console.log('Ticket creation event published');
		// });

		res.status(201).send(ticket);
	}
);

export { router as createTicketRouter };
