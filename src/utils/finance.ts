//src/utils/finance.ts





// Helper for Net Salary 
export const calculateNet = (gross: number): number => {
  const taxRate = gross > 6000 ? 0.2 : 0.15;
  return gross * (1 - taxRate);
};
//Helper Money Formatting :
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};