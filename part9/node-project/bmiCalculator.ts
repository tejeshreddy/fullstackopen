const BMICalculator = (height: number, weight: number): string => {
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
      category = 'Invalid BMI';
      break;
  }

  return category;
};

console.log(BMICalculator(180, 74));
