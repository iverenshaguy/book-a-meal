import express from 'express';
import logger from 'morgan';
import { config } from 'dotenv';
import bodyParser from 'body-parser';
import 'babel-polyfill';
import apiRoutes from './routes';
import errors from '../data/errors.json';
import orderEmitter from './events/Orders';
import ErrorHandler from './middlewares/ErrorHandler';

config();

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Documentation
app.use('/api/v1/docs', express.static('server/docs'));

//  Connect all our routes to our application
app.use('/api', apiRoutes);

// Default catch-all route that sends back a Item Not Found warning for wrong api routes.
app.use('/api/*', (req, res) =>
  res.status(404).json({
    message: errors['404']
  }));

app.get('/', (req, res) =>
  res.status(200).json({
    message: 'Welcome to the Book-A-Meal App',
    api: '/api'
  }));

// Default catch-all route that sends back a Item Not Found warning for wrong routes.
app.get('/*', (req, res) =>
  res.status(404).json({
    message: errors['404']
  }));

orderEmitter.on('create', (order) => {
  // expiry is 15 minutes
  setTimeout(async () => {
    await order.reload();
    if (order.status !== 'canceled') {
      await order.update({ status: 'delivered' });
    }
  }, process.env.EXPIRY);
});

// Handle App Errors
app.use(ErrorHandler.sendError);

const port = process.env.PORT || 8000;

app.listen(port);

export default app;
