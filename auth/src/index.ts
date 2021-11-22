import express from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();

// configure that traffic is being
// proxy to our application ingress-ingenex
app.set('trust proxy', true);

app.use(express.json());
app.use(
	cookieSession({
		signed: false,
		secure: process.env.NODE_ENV !== 'test',
	})
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.use('*', async (req, res, next) => {
	throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
	if (!process.env.JWT_KEY) {
		throw new Error('JWT_KEY must be defined');
	}
	if (!process.env.MONGO_URI) {
		throw new Error('MONGO_URI must be defined');
	}

	try {
		await mongoose.connect(`${process.env.MONGO_URI}`, {});
		console.log('Connected to MongoDB');
	} catch (error) {
		console.error(error);
	}
	app.listen(3000, () => {
		console.log('Listening on 3000');
	});
};

start();
