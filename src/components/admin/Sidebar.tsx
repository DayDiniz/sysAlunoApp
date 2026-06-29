import React, { useState } from 'react';
import {
  LayoutDashboard, BookOpen, Calendar, Users, MessageSquare,
  Building2, DollarSign, Settings, ChevronDown, ChevronRight,
  FileText, HelpCircle, BarChart2, GraduationCap, FlaskConical,
  ChevronLeft, ClipboardList
} from 'lucide-react';
import type { Page } from '../../App';

interface SidebarProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
  isOpen: boolean;
  onToggle: () => void;
}

interface NavChild { id: Page; label: string; }
interface NavGroup {
  id: string;
  label: string;
  icon: React.ElementType;
  children?: NavChild[];
  page?: Page;
  dividerBefore?: boolean;
}

const NAV: NavGroup[] = [
  {
    id: 'painel',
    label: 'Painel Central',
    icon: LayoutDashboard,
    children: [
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'relatorios', label: 'Central de Relatórios' },
      { id: 'faq', label: 'FAQ e Central de Ajuda' },
    ],
  },
  {
    id: 'diario',
    label: 'Diário de Aula',
    icon: BookOpen,
    page: 'diario',
  },
  {
    id: 'calendario',
    label: 'Calendário Escolar',
    icon: Calendar,
    children: [
      { id: 'calendario-ano', label: 'Ano Letivo' },
      { id: 'calendario-periodos', label: 'Períodos' },
      { id: 'calendario-atribuicao', label: 'Atribuição Docente' },
    ],
  },
  {
    id: 'cadastros',
    label: 'Cadastros',
    icon: Users,
    children: [
      { id: 'alunos', label: 'Alunos' },
      { id: 'professores', label: 'Professores' },
      { id: 'disciplinas', label: 'Disciplinas (BNCC)' },
    ],
  },
  {
    id: 'comunicacao',
    label: 'Comunicação',
    icon: MessageSquare,
    children: [
      { id: 'comunicacao-interna', label: 'Interna' },
      { id: 'comunicacao-externa', label: 'Externa' },
      { id: 'comunicacao-atendimento', label: 'Atendimento Acadêmico' },
    ],
  },
  {
    id: 'ambientes',
    label: 'Ambientes',
    icon: Building2,
    children: [
      { id: 'espacos', label: 'Mapa de Ambientes' },
      { id: 'ambientes-vagas', label: 'Gestão de Vagas' },
    ],
  },
  {
    id: 'financeiro',
    label: 'Financeiro',
    icon: DollarSign,
    page: 'financeiro',
  },
  {
    id: 'configuracoes',
    label: 'Configurações',
    icon: Settings,
    page: 'configuracoes',
    dividerBefore: true,
  },
];

export default function Sidebar({ activePage, onNavigate, isOpen, onToggle }: SidebarProps) {
  // Inicializa com o grupo do activePage aberto
  const getInitialOpen = () => {
    for (const group of NAV) {
      if (group.children?.some(c => c.id === activePage)) return group.id;
      if (group.page === activePage) return group.id;
    }
    return 'painel';
  };

  const [openGroup, setOpenGroup] = useState<string>(getInitialOpen);

  const toggleGroup = (id: string) => setOpenGroup(prev => prev === id ? '' : id);

  const isChildActive = (group: NavGroup) =>
    group.children?.some(c => c.id === activePage) || group.page === activePage;

  return (
    <aside className={`${isOpen ? 'w-60' : 'w-16'} transition-all duration-300 bg-[#0f172b] flex flex-col shrink-0 relative`}>
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-white/8 shrink-0">
        {isOpen ? (
          <span className="text-xl font-black italic tracking-tighter select-none">
            <span className="text-white">Sys</span>
            <span className="text-[#0066cc]">Class</span>
            <span className="text-[10px] text-slate-500 font-bold ml-2 not-italic tracking-wide uppercase align-middle">Web</span>
          </span>
        ) : (
          <span className="text-lg font-black italic text-[#0066cc] select-none mx-auto">S</span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto no-scrollbar">
        {NAV.map((group) => {
          const Icon = group.icon;
          const isActive = isChildActive(group);
          const isExpanded = openGroup === group.id;
          const hasChildren = !!group.children;

          return (
            <div key={group.id}>
              {group.dividerBefore && (
                <div className="mx-2 my-3 border-t border-white/8" />
              )}

              {/* Group header */}
              <button
                onClick={() => {
                  if (hasChildren) {
                    toggleGroup(group.id);
                    if (isOpen) return;
                  }
                  if (group.page) onNavigate(group.page);
                  else if (group.children) onNavigate(group.children[0].id);
                }}
                title={!isOpen ? group.label : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all cursor-pointer group ${
                  isActive
                    ? 'bg-[#0066cc]/15 text-white'
                    : 'text-slate-400 hover:bg-white/6 hover:text-white'
                }`}
              >
                <Icon className={`w-4.5 h-4.5 shrink-0 ${isActive ? 'text-[#0066cc]' : ''}`} />
                {isOpen && (
                  <>
                    <span className="flex-1 text-sm font-semibold truncate">{group.label}</span>
                    {hasChildren && (
                      <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    )}
                    {!hasChildren && isActive && (
                      <ChevronRight className="w-3.5 h-3.5 text-[#0066cc]" />
                    )}
                  </>
                )}
              </button>

              {/* Children */}
              {isOpen && hasChildren && isExpanded && (
                <div className="ml-4 pl-3 border-l border-white/8 mt-0.5 mb-1 space-y-0.5">
                  {group.children!.map(child => (
                    <button
                      key={child.id}
                      onClick={() => onNavigate(child.id)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left transition-all cursor-pointer ${
                        activePage === child.id
                          ? 'bg-[#0066cc] text-white'
                          : 'text-slate-400 hover:bg-white/6 hover:text-white'
                      }`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${activePage === child.id ? 'bg-white' : 'bg-slate-600'}`} />
                      <span className="text-xs font-semibold truncate">{child.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Toggle */}
      <div className="p-3 border-t border-white/8 shrink-0">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center p-2 rounded-xl text-slate-500 hover:text-white hover:bg-white/6 transition-all cursor-pointer"
        >
          {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      </div>
    </aside>
  );
}
