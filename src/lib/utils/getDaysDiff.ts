import { Borrow } from "../models/borrow.model";

export const getDaysDiff = (borrow?: Borrow | Partial<Borrow>) => {
  if (!borrow) {
    return {
      diff: 0,
      label: "-",
    };
  }
  const date1 = borrow.returnDate ? new Date(borrow.returnDate) : new Date();
  const date2 = borrow.realReturnDate
    ? new Date(borrow.realReturnDate)
    : new Date();

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

  return {
    diff: dayDifference,
    label: dayDifference > 0 ? "-" : `${Math.abs(dayDifference)} ngày`,
    isLate: dayDifference < 0,
  };
};
