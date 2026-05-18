import { TableProvider } from './context/TableContext';
import { DataTable } from './components/DataTable';
import { Users } from 'lucide-react';
import './index.css'; // Make sure styles are loaded

function App() {
  return (
    <TableProvider>
      <div className="app-container">
        <header className="app-header">
          <div className="header-brand">
            <div className="logo-box">
              <Users size={24} color="#ffffff" />
            </div>
            <h1>Advanced Workforce Directory</h1>
          </div>
          <div className="header-user">
            <img src="https://i.pravatar.cc/150?img=11" alt="User Profile" className="avatar" />
          </div>
        </header>
        
        <main className="app-main">
          <div className="glass-panel">
            <DataTable />
          </div>
        </main>
      </div>
    </TableProvider>
  );
}

export default App;
