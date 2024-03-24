import cookieParser from 'cookie-parser';
import 'dotenv/config';
import express from 'express';
import logger from 'morgan';
import path from 'path';

import completionsRouter from './routes/completions';
import indexRouter from './routes/index';
import lessonsRouter from './routes/lessons';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/completions', completionsRouter);
app.use('/lessons', lessonsRouter);

export default app;
