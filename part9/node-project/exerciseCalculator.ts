interface resultInterface {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (workoutHours: number[]): resultInterface => {
  const result: resultInterface = {
    periodLength: workoutHours.length,
    trainingDays: workoutHours.filter((x) => x != 0).length,
    success: false,
    rating: 1,
    ratingDescription: 'good',
    target: 2,
    average: workoutHours.reduce((a, b) => a + b, 0) / workoutHours.length,
  };

  return result;
};

console.log(calculateExercises([1, 2, 3]));
