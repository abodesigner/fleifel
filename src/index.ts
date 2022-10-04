import express from 'express';
import morgan from 'morgan';
import helmet from "helmet";
import rateLimit from 'express-rate-limit';

const app = express();
const PORT = 5000;

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
    message: "hello from post req",
    data: req.body
  })
});

app.listen(PORT, () => {
  console.log('server running ...');
});

export default app;
