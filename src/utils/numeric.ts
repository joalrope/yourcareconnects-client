export const accFormat = (number: number) => {
  return Number(number).toLocaleString("es-CO", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
};
