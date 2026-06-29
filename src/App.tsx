import React, { useState } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Alunos from './pages/Alunos';
import Configuracoes from './pages/Configuracoes';
import Relatorios from './pages/Relatorios';
import Sidebar from './components/admin/Sidebar';
import Topbar from './components/admin/Topbar';
import { Professores, Turmas, Grade, Espacos } from './pages/Pages';

export type Page =
  | 'dashboard' | 'relatorios' | 'faq'
  | 'diario'
  | 'calendario-ano' | 'calendario-periodos' | 'calendario-atribuicao'
  | 'alunos' | 'professores' | 'disciplinas'
  | 'comunicacao-interna' | 'comunicacao-externa' | 'comunicacao-atendimento'
  | 'espacos' | 'ambientes-vagas'
  | 'financeiro'
  | 'configuracoes';

type UserRole = 'admin' | 'coordenador';

const PAGE_TITLES: Record<Page, string> = {
  dashboard: 'Dashboard',
  relatorios: 'Central de Relatórios',
  faq: 'FAQ e Central de Ajuda',
  diario: 'Diário de Aula',
  'calendario-ano': 'Ano Letivo',
  'calendario-periodos': 'Períodos',
  'calendario-atribuicao': 'Atribuição Docente',
  alunos: 'Alunos',
  professores: 'Professores',
  disciplinas: 'Disciplinas (BNCC)',
  'comunicacao-interna': 'Comunicação Interna',
  'comunicacao-externa': 'Comunicação Externa',
  'comunicacao-atendimento': 'Atendimento Acadêmico',
  espacos: 'Mapa de Ambientes',
  'ambientes-vagas': 'Gestão de Vagas',
  financeiro: 'Financeiro',
  configuracoes: 'Configurações',
};

// Placeholder para telas ainda não construídas
function EmBreve({ titulo }: { titulo: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center max-w-sm mx-auto space-y-4">
      <div className="w-16 h-16 rounded-2xl bg-[#0066cc]/10 border border-[#0066cc]/20 flex items-center justify-center">
        <span className="text-2xl">🚧</span>
      </div>
      <h3 className="text-base font-bold text-[#0f172b]">{titulo}</h3>
      <p className="text-sm text-slate-500 leading-relaxed">Esta tela está no backlog do Pacote 2 e será entregue na próxima sprint.</p>
      <span className="text-xs font-bold text-[#0066cc] bg-[#0066cc]/8 px-3 py-1.5 rounded-full border border-[#0066cc]/20">Em desenvolvimento</span>
    </div>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState<Page>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [role, setRole] = useState<UserRole>('admin');

  if (!isLoggedIn) return <Login onLogin={() => setIsLoggedIn(true)} />;

  const pages: Record<Page, React.ReactNode> = {
    dashboard: <Dashboard onNavigate={setActivePage} role={role} />,
    relatorios: <Relatorios />,
    faq: <EmBreve titulo="FAQ e Central de Ajuda" />,
    diario: <EmBreve titulo="Diário de Aula" />,
    'calendario-ano': <EmBreve titulo="Ano Letivo" />,
    'calendario-periodos': <EmBreve titulo="Períodos" />,
    'calendario-atribuicao': <EmBreve titulo="Atribuição Docente" />,
    alunos: <Alunos />,
    professores: <Professores />,
    disciplinas: <EmBreve titulo="Disciplinas (BNCC)" />,
    'comunicacao-interna': <EmBreve titulo="Comunicação Interna" />,
    'comunicacao-externa': <EmBreve titulo="Comunicação Externa" />,
    'comunicacao-atendimento': <EmBreve titulo="Atendimento Acadêmico" />,
    espacos: <Espacos />,
    'ambientes-vagas': <EmBreve titulo="Gestão de Vagas" />,
    financeiro: <EmBreve titulo="Financeiro" />,
    configuracoes: <Configuracoes />,
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
          title={PAGE_TITLES[activePage]}
          onToggleSidebar={() => setSidebarOpen(o => !o)}
          onLogout={() => setIsLoggedIn(false)}
          role={role}
          onToggleRole={() => setRole(r => r === 'admin' ? 'coordenador' : 'admin')}
        />
        <main className="flex-1 overflow-y-auto p-6 no-scrollbar">
          {pages[activePage]}
        </main>
      </div>
    </div>
  );
}
