import type { Employee } from '../types';

const firstNames = ['John', 'Jane', 'Alex', 'Emily', 'Chris', 'Katie', 'Michael', 'Sarah', 'David', 'Laura', 'Robert', 'Linda', 'William', 'Elizabeth', 'Richard', 'Barbara'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin'];
const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Support', 'Legal', 'Product', 'Design', 'Operations'];
const statuses: Employee['status'][] = ['Active', 'Inactive', 'On Leave'];

export const generateData = (count: number): Employee[] => {
  const data: Employee[] = [];
  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const id = `EMP-${String(i + 1).padStart(5, '0')}`;
    data.push({
      id,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@example.com`,
      department: departments[Math.floor(Math.random() * departments.length)],
      salary: Math.floor(Math.random() * 110000) + 40000,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      joinDate: new Date(Date.now() - Math.floor(Math.random() * 100000000000)).toISOString().split('T')[0],
    });
  }
  return data;
};
