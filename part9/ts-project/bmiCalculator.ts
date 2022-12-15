const main = () => {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.error("Not enough args");
    process.exit(1);
  }

  const [height, weight] = args.map((arg) => Number(arg));

  if ([height, weight].includes(NaN)) {
    console.error("Invalid numbers provided");
    process.exit(1);
  }

  console.log(calculateBmi(height, weight));
};

type Category = "Normal (healthy weight)" | "Overweight" | "Obese";

const calculateBmi = (
  heightInCentimeters: number,
  weightInKilograms: number
): Category => {
  if (heightInCentimeters < 1 || weightInKilograms < 1) {
    throw new Error("Values cannot be less than 1");
  }

  const heightInMeters = heightInCentimeters / 100;
  const bmi = weightInKilograms / heightInMeters ** 2;

  if (bmi < 25) {
    return "Normal (healthy weight)";
  }

  if (bmi < 30) {
    return "Overweight";
  }

  return "Obese";
};

main();
