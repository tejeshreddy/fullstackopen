interface bmiInterface {
  height: number;
  weight: number;
}

const parseBMIArguments = (args: string[]): bmiInterface => {
  if (args.length == 4) {
    const height = Number(args[2]);
    const weight = Number(args[3]);

    return { height, weight };
  } else {
    throw new Error(
      'invalid number of arguments. Run ts-node bmiCalculator.ts <height> <weight>'
    );
  }
};

const calculateBmi = (height: number, weight: number): string => {
  const bmi: number = (weight * 100 * 100) / (height * height);

  let category: string = '';

  switch (true) {
    case bmi < 16.0:
      category = 'Underweight (Severe thinness)';
      break;
    case bmi >= 16.0 && bmi <= 16.9:
      category = 'Underweight (Moderate thinness)';
      break;
    case bmi >= 17.0 && bmi <= 18.4:
      category = 'Underweight (Mild thinness)';
      break;
    case bmi >= 18.5 && bmi <= 24.9:
      category = 'Normal range';
      break;
    case bmi >= 25.0 && bmi <= 29.9:
      category = 'Overweight (Pre-obese)';
      break;
    case bmi >= 30.0 && bmi <= 34.9:
      category = 'Obese (Class I)';
      break;
    case bmi >= 35.0 && bmi <= 39.9:
      category = 'Obese (Class II)';
      break;
    case bmi >= 40.0:
      category = 'Obese (Class III)';
      break;
    default:
      category = 'Invalid BMI. Run ts-node bmiCalculator.ts <height> <weight>';
      break;
  }

  return category;
};

try {
  const { height, weight } = parseBMIArguments(process.argv);
  const result: string = calculateBmi(height, weight);
  console.log(result);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
