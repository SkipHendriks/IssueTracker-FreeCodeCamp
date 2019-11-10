import './set-env';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import { join as joinPath } from 'path';

import router from './routes/api';
import fccTestingRoutes from './routes/fcctesting';
import runner from './test-runner';

const app = express();

app.use('/public', express.static(joinPath(__dirname, 'public')));

app.use(cors({ origin: '*' })); // For FCC testing purposes only

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Sample front-end
app.route('/:project/')
  .get((req: Request, res: Response): void => {
    res.sendFile(`${process.cwd()}/src/views/issue.html`);
  });

// Index page (static HTML)
app.route('/')
  .get((req: Request, res: Response): void => {
    res.sendFile(`${process.cwd()}/src/views/index.html`);
  });

// For FCC testing purposes
fccTestingRoutes(app);

// Routing for API
app.use(router);

// 404 Not Found Middleware
app.use((req: Request, res: Response, next: Function): void => {
  res.status(404)
    .type('text')
    .send('Not Found');
});

const startServer = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
    app.listen(process.env.PORT, (): void => {
      console.log(`Listening on port ${process.env.PORT}`);
      if (process.env.NODE_ENV === 'test') {
        console.log('Running Tests...');
        setTimeout((): void => {
          try {
            runner.run();
          } catch (error) {
            console.log('Tests are not valid:');
            console.log(error);
          }
        }, 3500);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

startServer();

export { app }; // for testing
