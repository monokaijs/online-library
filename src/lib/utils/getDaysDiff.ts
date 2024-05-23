export const getDaysDiff = (dateString1?: any, dateString2?: any) => {
  const date1 = new Date(dateString1);
  const date2 = dateString2 ? new Date(dateString2) : new Date();

  const d1: any = new Date(
    date1.getFullYear(),
    date1.getMonth(),
    date1.getDate()
  );
  const d2: any = new Date(
    date2.getFullYear(),
    date2.getMonth(),
    date2.getDate()
  );

  const timeDifference = d1 - d2;

  const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  return dayDifference;
};
