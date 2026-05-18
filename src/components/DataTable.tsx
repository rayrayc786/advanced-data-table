import React, { useState, useEffect, useRef } from 'react';
import { List } from 'react-window';
import { useTable } from '../context/TableContext';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';
import { TableToolbar } from './TableToolbar';

const ListComponent = List as unknown as React.FC<Record<string, unknown>>;

// Custom hook for measuring the container reliably
function useMeasure<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [bounds, setBounds] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      setBounds({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return [ref, bounds] as const;
}

export const DataTable = () => {
  const { filteredData } = useTable();
  const [wrapperRef, { width, height }] = useMeasure<HTMLDivElement>();

  // Render function for react-window list
  const renderRow = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const employee = filteredData[index];
    return <TableRow key={employee.id} employee={employee} style={style} />;
  };

  return (
    <div className="data-table-container">
      <TableToolbar />
      <div className="table-wrapper">
        <TableHeader />
        <div className="table-body" ref={wrapperRef}>
          {filteredData.length === 0 ? (
            <div className="empty-state">
              <p>No records found matching your filters.</p>
            </div>
          ) : (
            height > 0 && width > 0 && (
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
                <ListComponent
                  style={{ height, width }}
                  rowCount={filteredData.length}
                  rowHeight={56}
                  rowComponent={renderRow}
                  rowProps={{}}
                  overscanCount={5}
                />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
