export const minutesToHour = (min: number) => {
  const hour = Math.floor(min / 60);
  const minutes = min % 60;
  return `${hour}s ${minutes}d`
};
