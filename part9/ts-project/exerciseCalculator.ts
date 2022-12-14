const calculateExercises = (
  dailyExerciseHours: Array<number>,
  target: number
): Result => {
  const trainningDays = dailyExerciseHours.filter((hour) => hour > 0);
  const average = calculateAverage(dailyExerciseHours);
  const percentage = (average * 100) / target;

  let success: boolean;
  let rating: Rating;
  let ratingDescription: RatingDescription;

  if (percentage < 85) {
    rating = 1;
    success = false;
    ratingDescription = "target not reached";
  } else if (percentage < 100) {
    rating = 2;
    success = false;
    ratingDescription = "not too bad, but could be better";
  } else if (percentage === 100) {
    rating = 3;
    success = true;
    ratingDescription = "target reached 🎉";
  } else {
    rating = 3;
    success = true;
    ratingDescription = "on a roll 🚀, keep it up!";
  }

  return {
    periodLength: dailyExerciseHours.length,
    trainingDays: trainningDays.length,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

type Rating = 1 | 2 | 3;
type RatingDescription =
  | "target not reached"
  | "not too bad, but could be better"
  | "target reached 🎉"
  | "on a roll 🚀, keep it up!";

interface Result {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: Rating;
  ratingDescription: RatingDescription;
}

const calculateAverage = (numbers: Array<number>): number => {
  const total = numbers.reduce((total, current) => total + current);

  if (isNaN(total) || !isFinite(total)) {
    throw new Error("Invalid numbers found inside the array provided");
  } else if (numbers.length < 1) {
    throw new Error("An empty array was provided");
  }

  return total / numbers.length;
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
