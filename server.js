'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const port = process.env.PORT || 8000;
const server = require('https').createServer(app);
const path = require('path');

app.disable('x-powered-by');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static(path.join('./src/client/public')));

app.use((_req, res) => {
  res.sendFile(path.join(__dirname, './src/client/public', 'index.html'));
});

app.use((_req, res) => {
  res.sendStatus(404);
});

app.use((err, _req, res, _next) => {
  if (err.output && err.output.statusCode) {
    return res
      .status(err.output.statusCode)
      .set('Content-Type', 'text/plain')
      .send(err.message);
  }

  console.error(JSON.stringify(err, null, 2));

  if (err.status) {
    return res
      .status(err.status)
      .set('Content-Type', 'text/plain')
      .send(err.statusText);
  }

  console.error(err.stack);
  res.sendStatus(500);
});

server.listen(port, () => {
  console.log('Listening on port', port);
});
