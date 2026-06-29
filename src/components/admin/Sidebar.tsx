import React from 'react';
import { LayoutDashboard, Users, GraduationCap, BookOpen, CalendarRange, Building2, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Page } from '../../App';

interface SidebarProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const navItems = [
  { id: 'dashboard' as Page, label: 'Dashboard', icon: LayoutDashboard },
  { id: 'alunos' as Page, label: 'Alunos', icon: Users },
  { id: 'professores' as Page, label: 'Professores', icon: GraduationCap },
  { id: 'turmas' as Page, label: 'Turmas', icon: BookOpen },
  { id: 'grade' as Page, label: 'Grade Horária', icon: CalendarRange },
  { id: 'espacos' as Page, label: 'Espaços Físicos', icon: Building2 },
];

export default function Sidebar({ activePage, onNavigate, isOpen, onToggle }: SidebarProps) {
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
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto no-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              title={!isOpen ? item.label : undefined}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all cursor-pointer group ${
                isActive
                  ? 'bg-[#0066cc] text-white'
                  : 'text-slate-400 hover:bg-white/6 hover:text-white'
              }`}
            >
              <Icon className="w-4.5 h-4.5 shrink-0" />
              {isOpen && <span className="text-sm font-semibold truncate">{item.label}</span>}
            </button>
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
