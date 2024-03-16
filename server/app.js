import cookieParser from 'cookie-parser';
import 'dotenv/config';
import express, { json, urlencoded } from 'express';
import logger from 'morgan';
import { join } from 'path';

import completionsRouter from './routes/completions';
import indexRouter from './routes/index';
import lessonsRouter from './routes/lessons';
import usersRouter from './routes/users';

const app = express();

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, '../public')));

app.use('/', indexRouter);
app.use('/completions', completionsRouter);
app.use('/lessons', lessonsRouter);
app.use('/users', usersRouter);

export default app;
