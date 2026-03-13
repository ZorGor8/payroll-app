//src/components/HistoryChart.tsx
import { monthlyHistory } from '../data/mockData';//importing the data [those months] from mockData

import { 
  AreaChart, // Меняем LineChart на AreaChart (Changing to AreaChart)
  Area,      // Меняем Line на Area (Changing to Area)
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

export default function HistoryChart() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={monthlyHistory}>
        
        {/* КИРПИЧ 1: Определение градиента (Defining the gradient) */}
        <defs>
          <linearGradient id="colorTotal" x1="0" y1="1" x2="1" y2="0">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
      <XAxis 
  dataKey="month" 
  // Показывать каждую 3-ю точку, чтобы не перегружать экран
  interval={3} 
  tick={{ fill: '#999', fontSize: 10 }}
  axisLine={false}
  tickLine={false}
/>
        <YAxis stroke="#999" />
        <Tooltip />

        {/* КИРПИЧ 2: Применяем градиент к области (Applying gradient to the area) */}
        <Area 
          type="monotone" 
          dataKey="total" 
          stroke="#8884d8" 
          fillOpacity={1} 
          fill="url(#colorTotal)" // Связываем с ID градиента выше
        />
        
      </AreaChart>
    </ResponsiveContainer>
  );
}




