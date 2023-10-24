export const SeparateNumber = (num: number | string) => {
  if (typeof num === "string" ||!isNaN(num)) {
    return " ";
  }
  return num.toLocaleString("ar-EG");
};
