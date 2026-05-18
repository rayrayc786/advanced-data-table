import { useTable } from '../context/TableContext';
import type { Employee } from '../types';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';

export const TableHeader = () => {
  const { sortConfig, setSortConfig } = useTable();

  const requestSort = (key: keyof Employee) => {
    let direction: 'asc' | 'desc' | null = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    } else if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = null;
    }
    setSortConfig({ key: direction ? key : null, direction });
  };

  const getSortIcon = (key: keyof Employee) => {
    if (sortConfig.key !== key) {
      return <ChevronsUpDown size={14} className="sort-icon inactive" />;
    }
    if (sortConfig.direction === 'asc') {
      return <ChevronUp size={14} className="sort-icon active" />;
    }
    return <ChevronDown size={14} className="sort-icon active" />;
  };

  return (
    <div className="table-header-row">
      <div className="table-cell col-id" onClick={() => requestSort('id')}>
        ID {getSortIcon('id')}
      </div>
      <div className="table-cell col-name" onClick={() => requestSort('name')}>
        Name {getSortIcon('name')}
      </div>
      <div className="table-cell col-email" onClick={() => requestSort('email')}>
        Email {getSortIcon('email')}
      </div>
      <div className="table-cell col-dept" onClick={() => requestSort('department')}>
        Department {getSortIcon('department')}
      </div>
      <div className="table-cell col-salary" onClick={() => requestSort('salary')}>
        Salary {getSortIcon('salary')}
      </div>
      <div className="table-cell col-status" onClick={() => requestSort('status')}>
        Status {getSortIcon('status')}
      </div>
      <div className="table-cell col-date" onClick={() => requestSort('joinDate')}>
        Join Date {getSortIcon('joinDate')}
      </div>
      <div className="table-cell col-actions">
        Actions
      </div>
    </div>
  );
};
