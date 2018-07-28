import express from 'express';
import logger from 'morgan';
import path from 'path';
import cors from 'cors';
import { config } from 'dotenv';
import bodyParser from 'body-parser';
import 'babel-polyfill';
import apiRoutes from './routes';
import orderEmitter from './events/Orders';
import notifEmitter from './events/Notifications';
import ErrorHandler from './middlewares/ErrorHandler';
import OrderHandler from './eventHandlers/Orders';
import NotifHandler from './eventHandlers/Notifications';
import webpackDev from './utils/webpackDev';

config();

// Set up the express app
const app = express();

// enable cors
app.use(cors());

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Use webpack dev middleware for frontend
webpackDev(app, process.env.NODE_ENV);

// Documentation
app.use('/api/v1/docs', express.static('server/docs'));

//  Connect all our routes to our application
app.use('/api', apiRoutes);

// Serve static assets
app.use(express.static(path.resolve(__dirname, '../../client/', 'dist')));
app.use(express.static(path.resolve(__dirname, '../../client/', 'public')));

// Serve Client File
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

orderEmitter.on('create', OrderHandler.startOrderProcess);
orderEmitter.on('deliver', OrderHandler.markOrderAsDelivered);
notifEmitter.on('createMenu', NotifHandler.menuForTheDay);

// Handle App Errors
app.use(ErrorHandler.sendError);

const port = process.env.PORT || 8000;

app.listen(port);

export default app;
