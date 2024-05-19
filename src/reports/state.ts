import { isAfter, isBefore } from "date-fns";
import { Id } from "../../convex/_generated/dataModel";
import { sumBy } from "lodash";

interface StateProps {
  from: Date
  to: Date
  data: {
    _id: Id<"transactions">;
    _creationTime: number;
    type: string;
    couple: Id<"couples">;
    description: string;
    amount: number;
    date: string;
    category: Id<"categories">
    user: Id<"users">;
  }[]
}

export const getStates = ({ from, to, data }: StateProps) => {
  const filteredDataByDate = data.filter(transaction => {
    return isAfter(transaction.date, from) && isBefore(transaction.date, to)
  })

  const totalIncome = sumBy(filteredDataByDate.filter(item => item.type === 'income'), item => item.amount)
  const totalExpense = sumBy(filteredDataByDate.filter(item => item.type === 'expense'), item => item.amount)
  const balance = totalIncome - totalExpense;

  return { totalExpense, totalIncome, balance }
}