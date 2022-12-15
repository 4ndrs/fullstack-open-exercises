const main2 = () => {
  const arguments = process.argv.slice(2);

  if (arguments.length < 3) {
    console.error("Not enough arguments");
    process.exit(1);
  }

  const [target, ...dailyHours] = arguments.map((argument) => Number(argument));

  if ([target, ...dailyHours].includes(NaN)) {
    console.error("Invalid numbers provided");
    process.exit(1);
  }

  console.log(calculateExercises(dailyHours, target));
};

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

main2();
