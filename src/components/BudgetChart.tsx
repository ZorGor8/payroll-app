//src/components/BudgetChart.tsx
import React  from  "react";
import { formatCurrency } from "../utils/finance";

interface BudgetChartProps {
gross: number; //Total gross amount
net: number; //Total net amount

}

const BudgetChart: React.FC<BudgetChartProps>= ({ gross,net }) =>{
//Calculate percentage for a simple visual bar (optional):
const taxAmount = gross - net;
const percentage = gross > 0 ? (net/gross) * 100 : 0 ;

return (

  <div className="budget-chart">
    <h3>Financial Overview</h3>
    
    <div className="budget-item">
      <span>Gross:</span>
      <strong>{formatCurrency(gross)}</strong>
    </div>

    {/* Контейнер для шкалы (Background for the bar) */}
    <div className="progress-bar-background" style={{ backgroundColor: '#eee', height: '10px', borderRadius: '5px', margin: '10px 0' }}>
      <div 
        className="progress-bar-fill" 
        style={{ 
          width: `${percentage}%`, 
          backgroundColor: 'green', 
          height: '100%', 
          borderRadius: '5px',
          transition: 'width 0.3s ease' 
        }} 
      />
    </div>

    <div className="budget-item">
      <span>Net:</span>
      <strong style={{ color: "green" }}>{formatCurrency(net)}</strong>
    </div>
    
    <p style={{ fontSize: '12px' }}>Taxes: {formatCurrency(taxAmount)}</p>
  </div> 
);
}
export default BudgetChart;