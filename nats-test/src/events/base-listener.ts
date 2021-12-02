import { Message, Stan } from 'node-nats-streaming';
import { Subjects } from './subjects';

interface Event {
	subject: Subjects;
	data: any;
}

export default abstract class Listner<T extends Event> {
	abstract subject: T['subject'];
	abstract queueGroupName: string; // Event only go off to one subscription instance of our service
	abstract onMessage(data: T['data'], msg: Message): void;
	protected ackWait = 5 * 1000;
	private client: Stan;

	constructor(client: Stan) {
		this.client = client;
	}

	subscriptionOptions() {
		return this.client
			.subscriptionOptions()
			.setManualAckMode(true)
			.setDeliverAllAvailable() //  Get all event that's been emitted in the past
			.setDurableName(this.queueGroupName) // use seperate name to keep track of all event that not Ack
			.setAckWait(this.ackWait);
	}

	listen() {
		const subscription = this.client.subscribe(
			this.subject,
			this.queueGroupName,
			this.subscriptionOptions()
		);
		subscription.on('message', (msg: Message) => {
			console.log(
				`Message received:  ${this.subject} /  ${this.queueGroupName}`
			);
			const parsedData = this.parseMessage(msg);
			this.onMessage(parsedData, msg);
		});
	}

	parseMessage(msg: Message) {
		const data = msg.getData();
		return typeof data === 'string'
			? JSON.parse(data)
			: JSON.parse(data.toString('utf8'));
	}
}
