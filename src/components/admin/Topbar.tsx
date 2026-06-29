import React, { useState } from 'react';
import { Menu, Bell, Search, LogOut, ChevronDown, RefreshCw } from 'lucide-react';

interface TopbarProps {
  title: string;
  onToggleSidebar: () => void;
  onLogout: () => void;
  role: 'admin' | 'coordenador';
  onToggleRole: () => void;
}

export default function Topbar({ title, onToggleSidebar, onLogout, role, onToggleRole }: TopbarProps) {
  const [showUser, setShowUser] = useState(false);

  const roleLabel = role === 'admin' ? 'Administrador' : 'Coordenador';
  const roleColor = role === 'admin' ? 'bg-[#0066cc]' : 'bg-purple-600';

  return (
    <header className="h-16 bg-white border-b border-[#e2e8f0] flex items-center justify-between px-6 shrink-0 z-20">
      <div className="flex items-center gap-4">
        <button onClick={onToggleSidebar} className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer">
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-base font-bold text-[#0f172b]">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 bg-slate-50 border border-[#e2e8f0] rounded-xl px-3 py-2 w-56">
          <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <input type="text" placeholder="Buscar..." className="bg-transparent text-xs text-slate-700 placeholder:text-slate-400 outline-none w-full font-medium" />
        </div>

        {/* Notificações */}
        <button className="relative p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer">
          <Bell className="w-4.5 h-4.5" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#e7000b] border border-white" />
        </button>

        {/* Toggle perfil — só para demo */}
        <button
          onClick={onToggleRole}
          title="Alternar perfil (demo)"
          className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl text-[11px] font-bold text-slate-500 cursor-pointer transition-all"
        >
          <RefreshCw className="w-3 h-3" />
          Demo: trocar perfil
        </button>

        {/* Usuário */}
        <div className="relative">
          <button
            onClick={() => setShowUser(v => !v)}
            className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <div className={`w-7 h-7 rounded-lg ${roleColor} flex items-center justify-center text-white text-xs font-bold`}>
              {role === 'admin' ? 'A' : 'C'}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-bold text-[#0f172b] leading-none">{role === 'admin' ? 'Admin' : 'Marcia'}</p>
              <p className="text-[10px] text-slate-400 mt-0.5 leading-none">{roleLabel}</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showUser && (
            <div className="absolute right-0 top-full mt-2 w-44 bg-white border border-[#e2e8f0] rounded-2xl shadow-lg py-2 z-50">
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-[#e7000b] hover:bg-red-50 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sair do sistema
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
