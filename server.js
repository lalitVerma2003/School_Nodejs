import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors'
import { initializeDatabase } from './models/index.js';
import env from './contants/environmentVariables.js';
import School from './models/school.js';
import schoolRoutes from './routes/schoolRoutes.js'

const app = express();

app.use(cors());
app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use(express.json({}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

app.use('/', schoolRoutes)

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
  });

initializeDatabase()
  .then(() => {
    app.listen(env.PORT, () => {
      console.info(`Server up successfully - port: ${env.PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to start server due to database connection error:', error);
    process.exit(1);
  });
  
