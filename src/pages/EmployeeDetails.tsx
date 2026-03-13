//src/pages/EmployeeDetails/tsx

import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import type { Employee } from "../type";
import { 
  Briefcase, 
  DollarSign, 
  Trash2, 
  Edit3, 
  Save, 
  XCircle, 
  ArrowLeft 
} from "lucide-react";

export default function EmployeeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // States
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Form States
  const [editedName, setEditedName] = useState("");
  const [editedPosition, setEditedPosition] = useState("");
  const [editedSalary, setEditedSalary] = useState(0);
  
  // Photo State
  const [currentPhoto, setCurrentPhoto] = useState<string>("");

  useEffect(() => {
    
    const savedData = localStorage.getItem("my_employees");
    let foundInStorage: Employee | undefined;

    if (savedData) {
      const all: Employee[] = JSON.parse(savedData);
      foundInStorage = all.find(e => String(e.id) === String(id));
    }

    
    const photoFromStorage = foundInStorage?.imageUrl || `https://randomuser.me/api/portraits/lego/${Number(id) % 10}.jpg`;
    setTimeout(() => setCurrentPhoto(photoFromStorage), 0);

    
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => res.json())
      .then((data: { name: string, id: number }) => {
        const displaySalary = foundInStorage ? foundInStorage.grossSalary : 4000 + data.id * 100;
        const displayPos = foundInStorage ? foundInStorage.position : (data.id % 2 === 0 ? "Frontend" : "Backend") as Employee["position"];
        const displayName = foundInStorage ? foundInStorage.name : data.name;

        
        setEmployee({
          id: data.id,
          name: displayName,
          grossSalary: displaySalary,
          position: displayPos,
          imageUrl: photoFromStorage 
        });

        
        setEditedName(displayName);
        setEditedPosition(displayPos);
        setEditedSalary(displaySalary);
      })
      .catch((err: unknown) => {
        console.error("Fetch error:", err);
      });
  }, [id]);
  const handleSave = () => {
    if (employee) {
      const updatedEmployee = { 
        ...employee, 
        name: editedName, 
       position: editedPosition as Employee["position"],
        grossSalary: editedSalary,
        imageUrl: currentPhoto 
      };

      const savedData = localStorage.getItem("my_employees");
      const allEmployees: Employee[] = savedData ? JSON.parse(savedData) : [];
      
      const newFullList = allEmployees.map(emp => 
        String(emp.id) === String(id) ? updatedEmployee : emp
      );
      
      localStorage.setItem("my_employees", JSON.stringify(newFullList));
      setEmployee(updatedEmployee);
      setIsEditing(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure?")) {
      const savedData = localStorage.getItem("my_employees");
      if (savedData) {
        const all: Employee[] = JSON.parse(savedData);
        const filtered = all.filter(emp => String(emp.id) !== String(id));
        localStorage.setItem("my_employees", JSON.stringify(filtered));
      }
      navigate("/");
    }
  };

  if (!employee) return <div className="Loader"></div>;

  return (
    <div className="container" style={{ maxWidth: '900px', marginTop: '40px' }}>
      
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: '#666', marginBottom: '20px' }}>
        <ArrowLeft size={18} /> "Back to Dashboard" («Вернуться на главную»)
      </Link>

      <div style={{
        background: '#1a1a1a', 
        borderRadius: '24px',
        padding: '40px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        color: 'white',
        display: 'grid',
        gridTemplateColumns: '300px 1fr',
        gap: '40px'
      }}>
        
        
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '250px', 
            height: '250px', 
            borderRadius: '20px', 
            overflow: 'hidden',
            background: 'linear-gradient(45deg, #007bff, #00ff88)',
            padding: '5px',
            marginBottom: '20px'
          }}>
            <img 
              src={currentPhoto} 
              alt="Profile" 
              style={{ width: '100%', height: '100%', borderRadius: '15px', objectFit: 'cover', background: '#222' }} 
            />
          </div>
          <h2 style={{ margin: '0', fontSize: '1.2rem', opacity: 0.7 }}>Employee ID: {employee.id}</h2>
        </div>

   
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          
          <div style={{ marginBottom: '25px' }}>
            <label style={{ color: '#888', display: 'block', marginBottom: '5px' }}>Full Name</label>
            {isEditing ? (
              <input 
                value={editedName} 
                onChange={(e) => setEditedName(e.target.value)}
                style={{ fontSize: '2rem', width: '100%', background: '#333', border: '1px solid #444', color: 'white', borderRadius: '8px', padding: '5px 10px' }}
              />
            ) : (
              <h1 style={{ margin: 0, fontSize: '2.5rem', fontWeight: '800' }}>{employee.name}</h1>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="info-box" style={{ background: '#252525', padding: '15px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '15px' }}>
              <Briefcase size={24} color="#007bff" />
              <div>
                <small style={{ color: '#888' }}>"Position" («Должность»)</small>
                {isEditing ? (
                  <select value={editedPosition} onChange={(e) => setEditedPosition(e.target.value)} style={{ background: '#333', color: 'white', border: 'none' }}>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Designer">Designer</option>
                    <option value="QA Engineer">QA Engineer</option>
                    <option value="PM">PM</option>
                  </select>
                ) : <p style={{ margin: 0, fontWeight: 'bold' }}>{employee.position}</p>}
              </div>
            </div>

            <div className="info-box" style={{ background: '#252525', padding: '15px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '15px' }}>
              <DollarSign size={24} color="#4CAF50" />
              <div>
                <small style={{ color: '#888' }}>"Base Salary" («Зарплата»)</small>
                {isEditing ? (
                  <input type="number" value={editedSalary} onChange={(e) => setEditedSalary(Number(e.target.value))} style={{ background: '#333', color: 'white', border: 'none', width: '100%' }} />
                ) : <p style={{ margin: 0, fontWeight: 'bold' }}>${employee.grossSalary.toLocaleString()}</p>}
              </div>
            </div>
          </div>

          <div style={{ marginTop: '30px', display: 'flex', gap: '15px' }}>
            <button 
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
              style={{ 
                flex: 1, 
                backgroundColor: isEditing ? '#28a745' : '#007bff',
                color: 'white',
                border: 'none',
                padding: '15px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              {isEditing ? <><Save size={18}/> "Save" («Сохранить»)</> : <><Edit3 size={18}/> "Edit Profile" («Редактировать»)</>}
            </button>

            {isEditing && (
              <button 
                onClick={() => {
                  setIsEditing(false);
                  setEditedName(employee.name);
                  setEditedPosition(employee.position);
                  setEditedSalary(employee.grossSalary);
                }}
                style={{ backgroundColor: '#444', color: 'white', border: 'none', padding: '15px', borderRadius: '12px', cursor: 'pointer' }}
              >
                <XCircle size={18} />
              </button>
            )}

            <button 
              onClick={handleDelete}
              style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '15px', borderRadius: '12px', cursor: 'pointer' }}
            >
              <Trash2 size={18} />
            </button>
          </div>
          
          {showSuccess && <p style={{ color: '#28a745', marginTop: '15px', textAlign: 'center', fontWeight: 'bold' }}>✅ "Saved!" («Сохранено!»)</p>}
        </div>
      </div>
    </div>
  );
}