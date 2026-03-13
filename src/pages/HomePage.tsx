// 1. External Libraries
import { useState, useEffect } from "react";

// 2. Types
import type { Employee } from "../type";

// 3. Internal Components
import Header from "../components/Header";
import EmployeeList from "../components/EmployeeList";
import AddEmployeeForm from "../components/AddEmployeeForm";
import Modal from "../components/Modal";
import BudgetChart from "../components/BudgetChart";
import SearchBar from "../components/SearchBar";

// 4. Utils / Helpers
import { calculateNet } from "../utils/finance";

// 5. Styles
import "../App.css";

// 6. Links
import { Link } from "react-router-dom";

export default function HomePage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPos, setFilterPos] = useState("All");
  const [sortBy, setSortBy] = useState("none");
  
  const [isModalOpen, setisModalOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handeleDeleteClick = (id: number) => {
    setSelectedId(id);
    setisModalOpen(true);
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const savedData = localStorage.getItem("my_employees");

      if (savedData) {
        setEmployees(JSON.parse(savedData));
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) throw new Error("Server error");
        const data = await response.json();
        
        const rawData = [...data, ...data]; 

        // ИСПРАВЛЕНИЕ: Типизируем аргументы map и список ролей
        const bigTeam: Employee[] = rawData.map((user: { name: string }, index: number) => {
          // Явно указываем, что это массив допустимых позиций
          const roles: Employee["position"][] = ["Frontend", "Backend", "Designer", "QA Engineer", "PM"];
          
          const empId = index + 1;
          const gender = empId % 2 === 0 ? 'men' : 'women';
          const realPhotoUrl = `https://randomuser.me/api/portraits/${gender}/${empId % 100}.jpg`;  

          return {
            id: empId,
            name: index >= 10 ? `${user.name} (Jr.)` : user.name,
            grossSalary: 3000 + (index * 150),
            position: roles[index % roles.length], // Теперь TS видит совпадение типов
            imageUrl: realPhotoUrl,
          };
        });
        setEmployees(bigTeam);
      } catch (err) {
        // ИСПРАВЛЕНИЕ: Обработка ошибки без any
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (employees.length > 0) {
      localStorage.setItem("my_employees", JSON.stringify(employees));
    }
  }, [employees]);

  const deleteEmployee = async (id: number) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Could not delete");
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Delete failed");
    }
  };

  const giveBonus = (id: number, bonus: number) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === id ? { ...emp, grossSalary: emp.grossSalary + bonus } : emp,
      ),
    );
  };

  const addEmployee = async (name: string, salary: number, pos: Employee["position"]) => {
    const newEmpData = { name, grossSalary: salary, position: pos };
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newEmpData),
      });
      if (!response.ok) throw new Error("Failed to save");
      const data = await response.json();
      setEmployees((prev) => [...prev, { ...newEmpData, id: data.id, imageUrl: `https://randomuser.me/api/portraits/lego/${data.id % 10}.jpg` }]);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error");
    }
  };

  const cleanSearch = searchTerm.trim().toLowerCase();

  const filteredEmployees = employees.filter((emp) => {
    const matchesName = emp.name.toLowerCase().includes(cleanSearch);
    const matchesPos = filterPos === "All" || emp.position === filterPos;
    return matchesName && matchesPos;
  });

  const totals = filteredEmployees.reduce(
    (acc, emp) => ({
      gross: acc.gross + emp.grossSalary,
      net: acc.net + calculateNet(emp.grossSalary)
    }),
    { gross: 0, net: 0 }
  );

  if (isLoading) return <div className="container">Loading...</div>;
  if (error) return <div className="container" style={{ color: "red" }}>Error: {error}</div>;

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    if (sortBy === "high") return b.grossSalary - a.grossSalary;
    if (sortBy === "low") return a.grossSalary - b.grossSalary;
    return 0;
  });

  return (
    <div className="container">
      <Header totalGross={totals.gross} totalNet={totals.net} count={sortedEmployees.length} />
      
      <SearchBar onSearch={setSearchTerm} onFilter={setFilterPos} onSort={setSortBy} />
      
      <AddEmployeeForm onAdd={addEmployee} />
      
      <BudgetChart gross={totals.gross} net={totals.net} />

      <Link to="/analytics" className="nav-button">Go to Analytics → </Link>

      <EmployeeList employees={sortedEmployees} onDelete={handeleDeleteClick} onBonus={giveBonus} />

      <Modal 
        isOpen={isModalOpen} 
        title="Confirm Deletion"
        onClose={() => setisModalOpen(false)}
        onConfirm={() => {
          if (selectedId !== null) {
            deleteEmployee(selectedId);
            setisModalOpen(false);
          }
        }}
      >
        <p>Are you sure you want to delete this employee?</p>
      </Modal>
    </div>
  );
}