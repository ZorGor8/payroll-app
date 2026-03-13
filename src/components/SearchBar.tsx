import React from "react";

interface SearchBarProps {
  onSearch: (text: string) => void;
  onFilter: (pos: string) => void;
  onSort: (sort: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onFilter, onSort }) => {
  return (
    <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', background: '#fff', padding: '15px', borderRadius: '8px' }}>
      <input 
        placeholder="Search by name..." 
        onChange={(e) => onSearch(e.target.value)}
        style={{ flex: 2 }}
      />
      <select onChange={(e) => onFilter(e.target.value)} style={{ flex: 1 }}>
        <option value="All">All Positions</option>
        <option value="Frontend">Frontend</option>
        <option value="Backend">Backend</option>
        <option value="Designer">Designer</option>
        <option value="QA Engineer">QA Engineer</option>
        <option value="PM">PM</option>
      </select>
      <select onChange={(e) => onSort(e.target.value)} style={{ flex: 1 }}>
        <option value="none">No Sort</option>
        <option value="high">Salary: High to Low</option>
        <option value="low">Salary: Low to High</option>
      </select>
    </div>
  );
};

export default SearchBar;