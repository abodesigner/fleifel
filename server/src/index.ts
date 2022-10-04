import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import config from './config';
import pool from './database';

const app = express();
const PORT = config.port || 5000;

app.use(express.json());
app.use(morgan('common'));
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  })
);

app.get('/', (req, res) => {
  res.send('get request');
});

app.post('/', (req, res) => {
  res.json({
    message: 'hello from post req',
    data: req.body,
  });
});

// TEST DATABASE

const connectDb = async () => {
  try {
    await pool.connect();
    const res = await pool.query('SELECT NOW()');
    console.log(res);
    await pool.end();
  } catch (error) {
    console.log(error);
  }
};

connectDb();

app.use((_req, res) => {
  res.json({
    message: 'This path is not exist',
  });
});

app.listen(PORT, () => {
  console.log(`server running at port ${PORT} ...`);
});

export default app;
