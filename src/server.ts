// BEFORE RELEASE TEST WITH GIVEN TEST RUNNER

import './set-env';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import { join as joinPath } from 'path';

import router from './routes/api';

const fccTestingRoutes = require('./routes/fcctesting');

const app = express();

app.use(express.static(joinPath(__dirname, 'public')));

app.use(cors({ origin: '*' })); // For FCC testing purposes only

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// For FCC testing purposes
fccTestingRoutes(app);

// Routing for API
app.use(router);

// Index page (static HTML)
app.route('*')
  .get((req: Request, res: Response): void => {
    res.sendFile(joinPath(__dirname, 'public/index.html'));
  });

// 404 Not Found Middleware
app.use((req: Request, res: Response, next: Function): void => {
  res.status(404)
    .type('text')
    .send('Not Found');
});

const startServer = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
    const server = app.listen(process.env.PORT);
    console.log(`Listening on port ${process.env.PORT}`);
    return server;
  } catch (error) {
    console.log(error);
  }
};

const server = startServer();

export { server }; // for testing
