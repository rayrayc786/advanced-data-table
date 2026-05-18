export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  salary: number;
  status: 'Active' | 'Inactive' | 'On Leave';
  joinDate: string;
}

export type SortDirection = 'asc' | 'desc' | null;

export interface SortConfig {
  key: keyof Employee | null;
  direction: SortDirection;
}

export interface FilterConfig {
  global: string;
  department: string;
  status: string;
}
