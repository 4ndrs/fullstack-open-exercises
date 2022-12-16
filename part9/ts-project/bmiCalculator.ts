type Category = "Normal (healthy weight)" | "Overweight" | "Obese";

export const calculateBmi = (
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
