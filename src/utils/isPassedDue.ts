export const isPassedDue = (dueDate: string, today: string) => {
  const dueDateTime = new Date(dueDate).getTime();
  const todayTime = new Date(today).getTime();

  if (dueDateTime < todayTime) {
    return true;
  }

  return false;
};
