//src/compomemts/EmployeeDetails.tsx
import type { Employee } from "../type";
import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/finance";

// Функция расчета Net (оставляем как была)
const calculateNet = (gross: number): number => {
  const taxRate = gross > 6000 ? 0.2 : 0.15;
  return gross * (1 - taxRate);
};

interface EmployeeListProps {
  employees: Employee[];
  onDelete: (id: number) => void;
  onBonus: (id: number, amount: number) => void;
}

export default function EmployeeList({
  employees,
  onDelete,
  onBonus,
}: EmployeeListProps) {
  return (
    <div className="employee-grid"> 
      {employees.map((emp) => (
        <div key={emp.id} className="employee-card">
         
          <div className="card-header" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            
          
            <div className="avatar" style={{ flexShrink: 0 }}>
              {emp.imageUrl ? (
                <img 
                  src={emp.imageUrl} 
                  alt={emp.name} 
                  style={{ 
                    width: '50px', 
                    height: '50px', 
                    borderRadius: '50%', 
                    objectFit: 'cover',
                    display: 'block',
                    border: '1px solid #eee'
                  }}
                 
                  onError={(e) => { e.currentTarget.style.display = 'none'; }} 
                />
              ) : (
                <div style={{
                  width: '50px', 
                  height: '50px', 
                  borderRadius: '50%', 
                  background: '#e0e0e0', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  color: '#555'
                }}>
                  {emp.name.charAt(0)}
                </div>
              )}
            </div>
            
            <div className="name-box">
              <Link
                to={`/employee/${emp.id}`}
                style={{
                  textDecoration: "none",
                  color: "#007bff",
                  cursor: "pointer",
                  display: "block"
                }}
              >
                <strong>{emp.name}</strong>
              </Link>
              <small style={{ color: '#666' }}>{emp.position}</small>
            </div>
          </div>

        
<div className="card-body" style={{ 
  margin: '15px 0', 
  padding: '12px', 
  background: '#f8f9fa', 
  borderRadius: '8px',
  border: '1px solid #edf0f2' 
}}>
  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
  <span style={{ color: '#666', fontSize: '0.85rem' }}>Gross Salary:</span>
  <span style={{ fontWeight: '600', color: '#333' }}>
    {formatCurrency(emp.grossSalary)}
  </span>
</div>
  
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <span style={{ color: '#666', fontSize: '0.85rem' }}>Net (Take Home):</span>
    <span style={{ 
      color: '#28a745', 
      fontWeight: 'bold', 
      fontSize: '1rem',
      background: '#e8f5e9',
      padding: '2px 8px',
      borderRadius: '4px'
    }}>
      {formatCurrency(calculateNet(emp.grossSalary))}
    </span>
  </div>
</div>

       
          <div className="card-actions" style={{ display: 'flex', gap: '8px' }}>
            <button className="bonus-btn" onClick={() => onBonus(emp.id, 500)}>
              + $500 Bonus
            </button>
            <button className="delete-btn" onClick={() => onDelete(emp.id)}>
              Delete
            </button>
          </div>

        </div>
      ))}
    </div>
  );
}