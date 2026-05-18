import type { CSSProperties } from 'react';
import type { Employee } from '../types';
import { useTable } from '../context/TableContext';
import { Edit2, Check, X, Undo } from 'lucide-react';
import { motion } from 'framer-motion';

interface TableRowProps {
  employee: Employee;
  style: CSSProperties;
}

export const TableRow = ({ employee, style }: TableRowProps) => {
  const { editedRows, handleEdit, saveRow, cancelEdit, undoRow } = useTable();
  
  const isEditing = employee.id in editedRows;
  const editDraft = editedRows[employee.id] || {};

  const getValue = (field: keyof Employee) => {
    return isEditing && field in editDraft ? editDraft[field] : employee[field];
  };

  const onChange = (field: keyof Employee, value: string | number) => {
    // If starting edit, copy all fields to draft so we don't have undefined
    if (!isEditing) {
      handleEdit(employee.id, field, value);
    } else {
      handleEdit(employee.id, field, value);
    }
  };

  // The style is provided by react-window. We need to wrap our content carefully.
  return (
    <div style={style} className={`table-row-wrapper ${isEditing ? 'is-editing' : ''}`}>
      <div className="table-row">
        <div className="table-cell col-id">{employee.id}</div>
        
        <div className="table-cell col-name">
          {isEditing ? (
            <input 
              type="text" 
              value={getValue('name') as string} 
              onChange={(e) => onChange('name', e.target.value)}
              className="cell-input"
            />
          ) : (
            <span className="cell-text">{employee.name}</span>
          )}
        </div>

        <div className="table-cell col-email">
          {isEditing ? (
            <input 
              type="email" 
              value={getValue('email') as string} 
              onChange={(e) => onChange('email', e.target.value)}
              className="cell-input"
            />
          ) : (
            <span className="cell-text">{employee.email}</span>
          )}
        </div>

        <div className="table-cell col-dept">
          {isEditing ? (
            <select 
              value={getValue('department') as string} 
              onChange={(e) => onChange('department', e.target.value)}
              className="cell-input"
            >
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
          ) : (
            <span className="badge badge-neutral">{employee.department}</span>
          )}
        </div>

        <div className="table-cell col-salary">
          {isEditing ? (
            <input 
              type="number" 
              value={getValue('salary') as number} 
              onChange={(e) => onChange('salary', parseInt(e.target.value) || 0)}
              className="cell-input"
            />
          ) : (
            <span className="cell-text font-mono">${employee.salary.toLocaleString()}</span>
          )}
        </div>

        <div className="table-cell col-status">
          {isEditing ? (
            <select 
              value={getValue('status') as string} 
              onChange={(e) => onChange('status', e.target.value)}
              className="cell-input"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="On Leave">On Leave</option>
            </select>
          ) : (
            <span className={`status-dot status-${employee.status.toLowerCase().replace(' ', '-')}`}>
              {employee.status}
            </span>
          )}
        </div>

        <div className="table-cell col-date">
          <span className="cell-text text-muted">{employee.joinDate}</span>
        </div>

        <div className="table-cell col-actions">
          {isEditing ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="action-group">
              <button onClick={() => saveRow(employee.id)} className="action-btn save" title="Save">
                <Check size={16} />
              </button>
              <button onClick={() => cancelEdit(employee.id)} className="action-btn cancel" title="Cancel">
                <X size={16} />
              </button>
            </motion.div>
          ) : (
            <div className="action-group">
              <button onClick={() => onChange('name', employee.name)} className="action-btn edit" title="Edit">
                <Edit2 size={16} />
              </button>
              <button onClick={() => undoRow(employee.id)} className="action-btn undo" title="Undo Last Change">
                <Undo size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
