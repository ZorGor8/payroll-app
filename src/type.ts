//type.ts
export interface Employee {
  id: number;
  name: string;
  grossSalary: number;
  position: "Frontend" | "Backend" | "Designer" | "QA Engineer" | "PM"; 
  netSalary?: number;
  imageUrl?: string;
}