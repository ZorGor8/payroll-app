//src/data/mockData.ts


//Defining the data type for one months:
export interface MonthlyBudget {
  month: string;
  total: number;
}


export const monthlyHistory: MonthlyBudget[] = [
  //  (January)
  { month: 'Jan 01', total: 1800 }, { month: 'Jan 05', total: 1850 },
  { month: 'Jan 10', total: 1950 }, { month: 'Jan 15', total: 1700 },
  { month: 'Jan 20', total: 2100 }, { month: 'Jan 25', total: 2000 },
  { month: 'Jan 31', total: 2200 },
  //  (February)
  { month: 'Feb 05', total: 2100 }, { month: 'Feb 10', total: 2300 },
  { month: 'Feb 15', total: 2250 }, { month: 'Feb 20', total: 2500 },
  { month: 'Feb 25', total: 2400 }, { month: 'Feb 28', total: 2600 },
  //  (March)
  { month: 'Mar 05', total: 2550 }, { month: 'Mar 10', total: 2700 },
  { month: 'Mar 15', total: 2600 }, { month: 'Mar 20', total: 2850 },
  { month: 'Mar 25', total: 2900 }, { month: 'Mar 31', total: 3100 },
];