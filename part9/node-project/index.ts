import express from 'express';
import { calculateBmi } from './bmiCalculator';
const app = express();

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/hello', (_req, res) => {
  res.send('Hello World');
});

app.get('/hello', (_req, res) => {
  res.send('Hello World');
});

app.get('/bmi', (req, res) => {
  const height = parseFloat(req.query.height as string);
  const weight = parseFloat(req.query.weight as string);

  if (isNaN(height) || isNaN(weight)) {
    return res.status(400).json({ error: 'Invalid height or weight values' });
  }
  const bmi = calculateBmi(height, weight);

  return res.status(200).json({ height, weight, bmi });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
