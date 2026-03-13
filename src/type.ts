//type.ts
export interface Employee {
  id: number;
  name: string;
  grossSalary: number;
  position: "Frontend" | "Backend" | "Designer";
  netSalary?: number;
  imageUrl?: string;
}