import express from 'express';
import logger from 'morgan';
import path from 'path';
import webpack from 'webpack';
import { config } from 'dotenv';
import bodyParser from 'body-parser';
import 'babel-polyfill';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import apiRoutes from './routes';
import errors from '../data/errors.json';
import orderEmitter from './events/Orders';
import notifEmitter from './events/Notifications';
import ErrorHandler from './middlewares/ErrorHandler';
import OrderHandler from './eventHandlers/Orders';
import NotifHandler from './eventHandlers/Notifications';
import webpackConfig from '../../webpack.common';

config();

// Set up the express app
const app = express();

const compiler = webpack(config);

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Use webpack dev middleware
app.use(webpackDevMiddleware(compiler, {
  noInfo: true, publicPath: webpackConfig.output.publicPath
}));

// Hot reloading
app.use(webpackHotMiddleware(compiler));

// Documentation
app.use('/api/v1/docs', express.static('server/docs'));

//  Connect all our routes to our application
app.use('/api', apiRoutes);

// Default catch-all API route that sends back a Item Not Found warning for wrong routes.
app.use('api/*', (req, res) => res.status(404).json({
  message: errors['404']
}));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '../../client/', 'dist')));

// Serve Client File
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/src/index.html'));
});

// Default catch-all Route
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/src/index.html'));
});

orderEmitter.on('create', OrderHandler.startOrderProcess);
orderEmitter.on('deliver', OrderHandler.markOrderAsDelivered);
notifEmitter.on('createMenu', NotifHandler.notifyAllUsers);

// Handle App Errors
app.use(ErrorHandler.sendError);

const port = process.env.PORT || 8000;

app.listen(port);

export default app;
