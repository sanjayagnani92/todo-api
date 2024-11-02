export const getRandomDueDate = () => {
  const today = new Date();
  const randomDaysToAdd = Math.floor(Math.random() * 7); // Random number between 0 and 6
  const dueDate = new Date(today);
  dueDate.setDate(today.getDate() + randomDaysToAdd);
  return dueDate.toISOString();
};
