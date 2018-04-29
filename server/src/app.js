import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import 'babel-polyfill';
import apiRoutes from './routes';
import errors from './helpers/errors.json';
import ErrorHandler from './middlewares/ErrorHandler';

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//  Connect all our routes to our application
app.use('/api', apiRoutes);

// Default catch-all route that sends back a not found warning for wrong api routes.
app.get('/api/*', (req, res) =>
  res.status(404).send({
    message: errors['404']
  }));

// Handle App Errors
app.use(ErrorHandler.sendError);

const port = process.env.PORT || 8000;

app.listen(port);

export default app;
