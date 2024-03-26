import cookieParser from 'cookie-parser';
import 'dotenv/config';
import express from 'express';
import logger from 'morgan';
import { errorHandler } from './middleware';
import { completionsRouter, lessonsRouter } from './routes';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/completions', completionsRouter);
app.use('/lessons', lessonsRouter);

app.use(errorHandler);

export default app;
