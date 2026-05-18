import type { ChangeEvent } from 'react';
import { useTable } from '../context/TableContext';
import { exportToCSV } from '../utils/exportCSV';
import { Search, Download, Trash2, Save, AlertCircle } from 'lucide-react';

export const TableToolbar = () => {
  const { filterConfig, setFilterConfig, filteredData, hasUnsavedChanges, saveAll } = useTable();

  const handleGlobalChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterConfig(prev => ({ ...prev, global: e.target.value }));
  };

  const handleDepartmentChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilterConfig(prev => ({ ...prev, department: e.target.value }));
  };

  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilterConfig(prev => ({ ...prev, status: e.target.value }));
  };

  const clearFilters = () => {
    setFilterConfig({ global: '', department: '', status: '' });
  };

  return (
    <div className="table-toolbar">
      <div className="toolbar-left">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search by name, email, ID..."
            value={filterConfig.global}
            onChange={handleGlobalChange}
            className="input-field"
          />
        </div>
        
        <select value={filterConfig.department} onChange={handleDepartmentChange} className="select-field">
          <option value="">All Departments</option>
          <option value="Engineering">Engineering</option>
          <option value="Marketing">Marketing</option>
          <option value="Sales">Sales</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
          <option value="Support">Support</option>
          <option value="Legal">Legal</option>
          <option value="Product">Product</option>
          <option value="Design">Design</option>
          <option value="Operations">Operations</option>
        </select>

        <select value={filterConfig.status} onChange={handleStatusChange} className="select-field">
          <option value="">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="On Leave">On Leave</option>
        </select>

        {(filterConfig.global || filterConfig.department || filterConfig.status) && (
          <button onClick={clearFilters} className="btn btn-outline" title="Clear Filters">
            <Trash2 size={16} />
            <span>Clear</span>
          </button>
        )}
      </div>

      <div className="toolbar-right">
        <div className="row-count">
          {filteredData.length.toLocaleString()} rows
        </div>
        
        {hasUnsavedChanges && (
          <div className="unsaved-badge">
            <AlertCircle size={16} />
            Unsaved Changes
            <button onClick={saveAll} className="btn btn-primary btn-sm ml-2">
              <Save size={14} /> Save All
            </button>
          </div>
        )}

        <button 
          onClick={() => exportToCSV(filteredData, 'employees.csv')} 
          className="btn btn-primary"
        >
          <Download size={16} />
          <span>Export CSV</span>
        </button>
      </div>
    </div>
  );
};
