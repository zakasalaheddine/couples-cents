import { isAfter, isBefore } from "date-fns";
import { Id } from "../../convex/_generated/dataModel";
import { groupBy, map, reduce, sumBy } from "lodash";
import { TypeOfTransaction } from "@/components/shared/transaction-dialog/schema";

export interface Transaction {
  _id: Id<"transactions">;
  _creationTime: number;
  type: string;
  couple: Id<"couples">;
  description: string;
  amount: number;
  date: string;
  category: Id<"categories">
  user: Id<"users">;
}

interface StateProps {
  from: Date
  to: Date
  data: Transaction[]
  categories?: {
    _id: Id<"categories">;
    _creationTime: number;
    couple: Id<"couples">;
    type: string;
    name: string;
    icon: string;
  }[]
}

export const filterData = (data: Transaction[], from: Date, to: Date, type?: TypeOfTransaction,) => {
  return data.filter(tr => {
    if (type) return isAfter(tr.date, from) && isBefore(tr.date, to) && tr.type === type
    return isAfter(tr.date, from) && isBefore(tr.date, to)
  })
}

export const sumTransactions = (data: Transaction[]) => {
  return sumBy(data, item => item.amount)
}

export const getStates = ({ from, to, data }: StateProps) => {
  const totalIncome = sumTransactions(filterData(data, from, to, 'income'))
  const totalExpense = sumTransactions(filterData(data, from, to, 'expense'))
  const balance = totalIncome - totalExpense;

  return { totalExpense, totalIncome, balance }
}

export const getCategoryStats = ({ from, to, data, categories }: StateProps) => {
  const incomesList = filterData(data, from, to, 'income')
  const expensesList = filterData(data, from, to, 'expense')
  const totalIncome = sumTransactions(incomesList)
  const totalExpense = sumTransactions(expensesList)

  const groupedIncome = groupBy(incomesList, item => item.category)
  const groupedExpense = groupBy(expensesList, item => item.category)

  const incomes = map(Object.keys(groupedIncome), categoryId => ({
    category: categories?.find(item => item._id === categoryId)!,
    amount: sumTransactions(groupedIncome[categoryId]),
    percentage: sumTransactions(groupedIncome[categoryId]) / totalIncome * 100
  }))

  const expenses = map(Object.keys(groupedExpense), categoryId => ({
    category: categories?.find(item => item._id === categoryId)!,
    amount: sumTransactions(groupedExpense[categoryId]),
    percentage: sumTransactions(groupedExpense[categoryId]) / totalExpense * 100
  }))

  return { incomes, expenses }
}