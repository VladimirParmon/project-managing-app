export const filterPastDays = (d: Date | null): boolean => {
  const date = d || new Date();
  const currentDate = new Date();
  const comparison =
    date.getFullYear() >= currentDate.getFullYear() &&
    date.getMonth() >= currentDate.getMonth() &&
    date.getDate() >= currentDate.getDate();
  return comparison;
};
