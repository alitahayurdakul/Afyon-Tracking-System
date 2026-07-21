export const getElapsedTime = (start: string, end: string): string => {
  const now = new Date();
  const newEnd = end || now;
  const diff: number = Math.max(
    new Date(newEnd).getTime() - new Date(start).getTime(),
    1000,
  );

  const hours: number = Math.floor(diff / 3600000);
  const minutes: number = Math.floor((diff % 3600000) / 60000);
  const seconds: number = Math.floor((diff % 60000) / 1000);

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};
