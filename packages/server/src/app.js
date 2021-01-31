import express from 'express';
import logger from 'morgan';
import { resolve, join } from 'path';
import cors from 'cors';
import { config } from 'dotenv';
import bodyParser from 'body-parser';
import gzipStatic from 'connect-gzip-static';
import helmet from 'helmet';
import '@babel/polyfill';
import apiRoutes from './routes';
import ErrorHandler from './middlewares/ErrorHandler';
import { OrderEventEmitter, NotificationEventEmitter } from './eventEmitters';
import { OrderEventHandler, NotificationEventHandler } from './eventHandlers';
import webpackDev from './utils/webpackDev';
import errors from '../lib/errors.json';

config({ path: resolve(__dirname, '../../../.env') });

const app = express();

app.use(cors());

app.use(helmet());

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

webpackDev(app, process.env.NODE_ENV);

app.use('/api/v1/docs', express.static('../docs'));

app.use('/api', apiRoutes);

app.use('/api/*', (req, res) => {
  res.status(404).json({ error: errors[404] });
});

app.use(gzipStatic(resolve(__dirname, '../../client/', 'dist')));
app.use(gzipStatic(resolve(__dirname, '../../client/', 'public')));

app.get('/*', (req, res) => {
  res.sendFile(join(__dirname, '../../client/dist/index.html'));
});


OrderEventEmitter.on('create', OrderEventHandler.startOrderProcess);
OrderEventEmitter.on('deliver', OrderEventHandler.markOrderAsDelivered);
NotificationEventEmitter.on('createMenu', NotificationEventHandler.menuForTheDay);

app.use(ErrorHandler.sendError);

const port = process.env.PORT || 8000;

app.listen(port);

export default app;
