import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

import cors from 'cors';

import apiRoutes from './routes/api';
import fccTestingRoutes from './routes/fcctesting';
import runner from './test-runner';

const app = express();

app.use('/public', express.static(`${process.cwd()}/public`));

app.use(cors({ origin: '*' })); // For FCC testing purposes only

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Sample front-end
app.route('/:project/')
  .get((req, res) => {
    res.sendFile(`${process.cwd()}/src/views/issue.html`);
  });

// Index page (static HTML)
app.route('/')
  .get((req, res) => {
    res.sendFile(`${process.cwd()}/src/views/index.html`);
  });

// For FCC testing purposes
fccTestingRoutes(app);

// Routing for API
apiRoutes(app);

// 404 Not Found Middleware
app.use((req: Request, res: Response, next: Function) => {
  res.status(404)
    .type('text')
    .send('Not Found');
});

// Start our server and tests!
app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${process.env.PORT}`);
  if (process.env.NODE_ENV === 'test') {
    console.log('Running Tests...');
    setTimeout(() => {
      try {
        runner.run();
      } catch (error) {
        console.log('Tests are not valid:');
        console.log(error);
      }
    }, 3500);
  }
});

module.exports = app; // for testing
