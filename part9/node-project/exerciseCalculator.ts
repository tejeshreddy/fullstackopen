interface resultInterface {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseExerciseArguments = (args: string[]): number[] => {
  if (args.length >= 3) {
    let exercises = [];

    for (let i = 2; i < args.length; i++) {
      exercises.push(Number(args[i]));
    }
    console.log(exercises);
    return exercises;
  } else {
    throw new Error(
      'invalid number of arguments. Run ts-node bmiCalculator.ts <height> <weight>'
    );
  }
};

const calculateExercises = (workoutHours: number[]): resultInterface => {
  const periodLength = workoutHours.length;
  const trainingDays = workoutHours.filter((x) => x != 0).length;
  const success = calculateSuccess(periodLength, trainingDays);
  const totalHours = workoutHours.reduce((total, hours) => total + hours, 0);
  const average = trainingDays > 0 ? totalHours / trainingDays : 0;
  const rating = calculateRating(average);
  const target = 2;
  const ratingDescription = getRatingDescription(rating);

  const result: resultInterface = {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };

  return result;
};

const getRatingDescription = (rating: number): string => {
  switch (rating) {
    case 3:
      return 'excellent';
    case 2:
      return 'good';
    default:
      return 'poor';
  }
};

const calculateSuccess = (
  periodLength: number,
  trainingDays: number
): boolean => {
  if (trainingDays * 2 > periodLength) {
    return true;
  }
  return false;
};

const calculateRating = (average: number): number => {
  if (average >= 2) {
    return 3;
  } else if (average >= 1) {
    return 2;
  } else {
    return 1;
  }
};

try {
  const args = parseExerciseArguments(process.argv);
  const result: resultInterface = calculateExercises(args);
} catch (error) {}
