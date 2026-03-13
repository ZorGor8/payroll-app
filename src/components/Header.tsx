// src/components/Header.tsx

import { formatCurrency } from "../utils/finance";
import { Linkedin, Twitter, Scale, Globe } from "lucide-react"; 

interface HeaderProps {
  totalGross: number; 
  totalNet: number;   
  count: number;
}

const Header = ({ totalGross, totalNet, count }: HeaderProps) => {
  return (
    <header className="header" style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'flex-start', 
      padding: '20px 0',
      borderBottom: '1px solid #f0f0f0',
      marginBottom: '20px'
    }}>
      
      {/* ЛЕВАЯ ЧАСТЬ: Возвращаем "P" логотип + Заголовок + Статистика */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
          
          {/* Тот самый синий квадрат с буквой P (The blue square with letter P) */}
          <div style={{
            width: '45px',
            height: '45px',
            backgroundColor: '#007bff',
            borderRadius: '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            P
          </div>

          <h1 style={{ margin: 0, fontSize: '2.2rem', fontWeight: '800' }}>
            Employee Management
          </h1>
        </div>

        <div className="stats" style={{ textAlign: 'left' }}>
          <p style={{ margin: '4px 0' }}>Total Employees: <strong>{count}</strong></p>
          <p style={{ margin: '4px 0' }}>Gross Budget: <strong>{formatCurrency(totalGross)}$</strong></p>
          <p style={{ margin: '4px 0' }}>Net Budget: <strong style={{ color: '#4CAF50' }}>{formatCurrency(totalNet)}$</strong></p>
        </div>
      </div>

     
      <div style={{ textAlign: 'right', paddingTop: '10px' }}>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'flex-end', marginBottom: '10px' }}>
          <a href="#" style={{ color: '#333' }}><Globe size={32} strokeWidth={1.5} /></a>
          <a href="#" style={{ color: '#0077b5' }}><Linkedin size={32} strokeWidth={1.5} /></a>
          <a href="#" style={{ color: '#1DA1F2' }}><Twitter size={32} strokeWidth={1.5} /></a>
          <a href="#" style={{ color: '#666' }}><Scale size={32} strokeWidth={1.5} /></a>
        </div>
        
        <div style={{ fontSize: '0.9rem', color: '#888', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <span>Our Site</span> | <span>Social Media</span> | <span>Legal Info</span>
        </div>
      </div>

    </header>
  );
};

export default Header;