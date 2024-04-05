const express = require('express');
const { resolve, join } = require('path');
const { config } = require('dotenv');
const gzipStatic = require('connect-gzip-static');
const { createProxyMiddleware } = require('http-proxy-middleware');

require('@babel/polyfill');

config({ path: resolve(__dirname, '../.env') });

const app = express();

app.use(gzipStatic(resolve(__dirname, '../dist')));
app.use(gzipStatic(resolve(__dirname, '../public')));

app.use('/api/*', createProxyMiddleware({ target: process.env.BASE_API_URL, pathRewrite: { '^/api': '' } }));

app.get('/*', (req, res) => {
  res.sendFile(join(__dirname, '../dist/index.html'));
});

const port = process.env.PORT;

app.listen(port);

module.exports = app;
