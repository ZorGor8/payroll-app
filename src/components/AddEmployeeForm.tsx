//src/components/AddEmployeeForm.tsx
import { useState } from "react";
import type { Employee } from "../type"; // Импорт типа из главного файла (Import type from main file)

interface AddEmployeeFormProps {
  onAdd: (name: string, salary: number, position: Employee["position"]) => void;
}

export default function AddEmployeeForm({ onAdd }: AddEmployeeFormProps) {
  const [name, setName] = useState("");
  const [salary, setSalary] = useState(0);
  const [position, setPosition] = useState<Employee["position"]>("Frontend");
  const [ isSubmitting,setIsSubmitting] = useState(false);


  const handleSubmit = async () => {
    if (name.trim() === "" || salary <= 0) return;
    setIsSubmitting(true)
    await onAdd(name,salary, position)
    setName("");
    setSalary(0);
    setIsSubmitting(false)//Unlock the button
  };

  return (
    <div style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name (Имя)" />
      <input type="number" value={salary} onChange={(e) => setSalary(Number(e.target.value))} placeholder="Salary (Зарплата)" />
      <select value={position} onChange={(e) => setPosition(e.target.value as Employee["position"])}>
        <option value="Frontend">Frontend</option>
        <option value="Backend">Backend</option>
        <option value="Designer">Designer</option>
      </select>
      <button type = "submit" onClick = {handleSubmit} disabled = {isSubmitting || name.trim()===""|| salary <=0}>{isSubmitting ? "Adding...":"Add Employee"} (Добавить)</button>
    </div>
  );
}