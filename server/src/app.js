import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';

// Set up the express app
const app = express();

const logger = morgan;

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => res.send('Hello World!'));

const port = process.env.PORT || 8000;

app.listen(port);

export default app;
