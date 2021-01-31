import express from 'express';
import { resolve, join } from 'path';
import { config } from 'dotenv';
import gzipStatic from 'connect-gzip-static';
import '@babel/polyfill';
import webpackDev from './utils/webpackDev';

config({ path: resolve(__dirname, '../.env') });

const app = express();

webpackDev(app, process.env.NODE_ENV);

app.use(gzipStatic(resolve(__dirname, '../dist')));
app.use(gzipStatic(resolve(__dirname, '../public')));

app.get('/*', (req, res) => {
  res.sendFile(join(__dirname, '../dist/index.html'));
});

const port = process.env.PORT || 3000;

app.listen(port);

export default app;
