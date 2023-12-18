import express from 'express';
import { calculateExercises } from './exerciseCalculator';
import { calculateBmi } from './bmiCalculator';
import bodyParser from 'body-parser';
const app = express();
app.use(bodyParser.json());
app.use(express.json());

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

app.post('/exercise', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const exercise: number[] = req.body.exercise;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const target: number = req.body.target;

  if (!exercise || !target) {
    return res.status(400).json({ error: 'parameters missing' });
  } else {
    try {
      return res.send(calculateExercises(exercise, target));
    } catch (error: unknown) {
      return res.status(400).send({ error: error });
    }
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
