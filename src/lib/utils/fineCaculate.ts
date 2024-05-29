import { Borrow } from "../models/borrow.model";
import { getDaysDiff } from "./getDaysDiff";

export const fineCaculate = (borrow?: Borrow | Partial<Borrow>) => {
  if (!borrow) {
    return {
      amount: 0,
      label: "-",
    };
  }

  const { diff } = getDaysDiff(borrow);
  if (diff >= 0) {
    return {
      amount: 0,
      label: "-",
    };
  }
  let charge = 0;
  if (diff < 15) {
    charge = 0;
  } else if (diff < 50) {
    charge = 15000;
  } else if (diff < 100) {
    charge = 20000;
  } else {
    charge = 25000;
  }

  const amount = charge + Math.abs(diff) * 1000;

  return {
    diff: Math.abs(diff),
    isLate: diff < 0,
    amount,
    label: amount
      ?.toLocaleString("it-IT", {
        style: "currency",
        currency: "VND",
      })
      ?.replace("VND", "đ"),
  };
};
