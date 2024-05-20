import { groupBy } from 'lodash';
import { Transaction, sumTransactions } from "./state";
import { getDate, getDaysInMonth, getMonth, getYear } from 'date-fns';


export interface HistoryData {
  expense: number;
  income: number;
  year: number;
  month: number;
  day?: number;
};

export const getYearlyHistory = ({ data, year }: { data: Transaction[], year: number }) => {
  const grouppedTransactions = groupBy(data.filter(item => getYear(item.date) === year), (item) => getMonth(item.date))
  const history: HistoryData[] = [];
  for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
    if (monthIndex in grouppedTransactions) {
      history.push({
        year,
        month: monthIndex,
        expense: sumTransactions(grouppedTransactions[monthIndex].filter(item => item.type === 'expense')),
        income: sumTransactions(grouppedTransactions[monthIndex].filter(item => item.type === 'income')),
      });
    } else {
      history.push({
        year,
        month: monthIndex,
        expense: 0,
        income: 0,
      });
    }
  }
  return history
}

export const getMonthlyHistory = ({ data, year, month }: { data: Transaction[], year: number, month: number }) => {
  const grouppedTransactions = groupBy(
    data.filter(item => getYear(item.date) === year && getMonth(item.date) === month),
    (item) => getDate(item.date)
  )
  const history: HistoryData[] = [];
  const daysInMonth = getDaysInMonth(new Date(year, month));
  for (let day = 1; day <= daysInMonth; day++) {
    if (day in grouppedTransactions) {
      history.push({
        year,
        month,
        day,
        expense: sumTransactions(grouppedTransactions[day].filter(item => item.type === 'expense')),
        income: sumTransactions(grouppedTransactions[day].filter(item => item.type === 'income')),
      });
    } else {
      history.push({
        year,
        month,
        day,
        expense: 0,
        income: 0,
      });
    }
  }
  return history
}