/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { Employee, SortConfig, FilterConfig } from '../types';
import { generateData } from '../utils/generateData';

interface TableContextType {
  data: Employee[];
  filteredData: Employee[];
  sortConfig: SortConfig;
  filterConfig: FilterConfig;
  editedRows: Record<string, Partial<Employee>>;
  hasUnsavedChanges: boolean;
  setSortConfig: React.Dispatch<React.SetStateAction<SortConfig>>;
  setFilterConfig: React.Dispatch<React.SetStateAction<FilterConfig>>;
  handleEdit: (id: string, field: keyof Employee, value: string | number) => void;
  saveRow: (id: string) => void;
  cancelEdit: (id: string) => void;
  undoRow: (id: string) => void;
  saveAll: () => void;
  generateNewData: (count: number) => void;
}

const TableContext = createContext<TableContextType | undefined>(undefined);

export const TableProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<Employee[]>(() => generateData(10000));
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: null });
  const [filterConfig, setFilterConfig] = useState<FilterConfig>({ global: '', department: '', status: '' });
  
  // Edited rows draft state
  const [editedRows, setEditedRows] = useState<Record<string, Partial<Employee>>>({});
  // History for undo (storing previous complete state of a row once it's saved)
  const [, setHistory] = useState<Record<string, Employee[]>>({});

  const generateNewData = useCallback((count: number) => {
    setData(generateData(count));
    setEditedRows({});
    setHistory({});
  }, []);

  // Filtering
  const filteredData = useMemo(() => {
    let result = [...data];

    if (filterConfig.global) {
      const lowerQuery = filterConfig.global.toLowerCase();
      result = result.filter(emp => 
        emp.name.toLowerCase().includes(lowerQuery) ||
        emp.email.toLowerCase().includes(lowerQuery) ||
        emp.id.toLowerCase().includes(lowerQuery)
      );
    }
    
    if (filterConfig.department) {
      result = result.filter(emp => emp.department === filterConfig.department);
    }
    
    if (filterConfig.status) {
      result = result.filter(emp => emp.status === filterConfig.status);
    }

    // Sorting
    if (sortConfig.key && sortConfig.direction) {
      result.sort((a, b) => {
        const key = sortConfig.key as keyof Employee;
        const aVal = a[key];
        const bVal = b[key];
        
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [data, filterConfig, sortConfig]);

  const handleEdit = useCallback((id: string, field: keyof Employee, value: string | number) => {
    setEditedRows(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value
      }
    }));
  }, []);

  const saveRow = useCallback((id: string) => {
    if (!editedRows[id]) return;
    
    setData(prev => {
      const newData = [...prev];
      const index = newData.findIndex(emp => emp.id === id);
      if (index !== -1) {
        // Save current state to history before overwriting
        setHistory(prevHist => {
          const currentHist = prevHist[id] || [];
          return {
            ...prevHist,
            [id]: [...currentHist, newData[index]]
          };
        });
        
        newData[index] = { ...newData[index], ...editedRows[id] };
      }
      return newData;
    });

    setEditedRows(prev => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, [editedRows]);

  const cancelEdit = useCallback((id: string) => {
    setEditedRows(prev => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const undoRow = useCallback((id: string) => {
    setHistory(prevHist => {
      const currentHist = prevHist[id] || [];
      if (currentHist.length === 0) return prevHist;
      
      const previousState = currentHist[currentHist.length - 1];
      const newHistForId = currentHist.slice(0, -1);
      
      setData(prevData => {
        const newData = [...prevData];
        const index = newData.findIndex(emp => emp.id === id);
        if (index !== -1) {
          newData[index] = previousState;
        }
        return newData;
      });
      
      return {
        ...prevHist,
        [id]: newHistForId
      };
    });
  }, []);

  const saveAll = useCallback(() => {
    setData(prev => {
      const newData = [...prev];
      Object.keys(editedRows).forEach(id => {
        const index = newData.findIndex(emp => emp.id === id);
        if (index !== -1) {
          newData[index] = { ...newData[index], ...editedRows[id] };
        }
      });
      return newData;
    });
    setEditedRows({});
  }, [editedRows]);

  const hasUnsavedChanges = Object.keys(editedRows).length > 0;

  // Unsaved changes prompt before leaving page
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  return (
    <TableContext.Provider value={{
      data,
      filteredData,
      sortConfig,
      filterConfig,
      editedRows,
      hasUnsavedChanges,
      setSortConfig,
      setFilterConfig,
      handleEdit,
      saveRow,
      cancelEdit,
      undoRow,
      saveAll,
      generateNewData
    }}>
      {children}
    </TableContext.Provider>
  );
};

export const useTable = () => {
  const context = useContext(TableContext);
  if (context === undefined) {
    throw new Error('useTable must be used within a TableProvider');
  }
  return context;
};
