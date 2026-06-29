import React, { useState } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Alunos from './pages/Alunos';
import Professores from './pages/Professores';
import Turmas from './pages/Turmas';
import Grade from './pages/Grade';
import Espacos from './pages/Espacos';
import Relatorios from './pages/Relatorios';
import Configuracoes from './pages/Configuracoes';
import Sidebar from './components/admin/Sidebar';
import Topbar from './components/admin/Topbar';

export type Page = 'dashboard' | 'alunos' | 'professores' | 'turmas' | 'grade' | 'espacos' | 'relatorios' | 'configuracoes';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState<Page>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (!isLoggedIn) return <Login onLogin={() => setIsLoggedIn(true)} />;

  const pages: Record<Page, React.ReactNode> = {
    dashboard: <Dashboard onNavigate={setActivePage} />,
    alunos: <Alunos />,
    professores: <Professores />,
    turmas: <Turmas />,
    grade: <Grade />,
    espacos: <Espacos />,
    relatorios: <Relatorios />,
    configuracoes: <Configuracoes />,
  };

  const pageTitles: Record<Page, string> = {
    dashboard: 'Dashboard',
    alunos: 'Alunos',
    professores: 'Professores',
    turmas: 'Turmas',
    grade: 'Grade Horária',
    espacos: 'Espaços Físicos',
    relatorios: 'Relatórios e Ano Letivo',
    configuracoes: 'Configurações',
  };

  return (
    <div className="flex h-screen bg-[#f1f5f9] overflow-hidden">
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(o => !o)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar
          title={pageTitles[activePage]}
          onToggleSidebar={() => setSidebarOpen(o => !o)}
          onLogout={() => setIsLoggedIn(false)}
        />
        <main className="flex-1 overflow-y-auto p-6 no-scrollbar">
          {pages[activePage]}
        </main>
      </div>
    </div>
  );
}
