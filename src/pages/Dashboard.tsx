import React from 'react';
import { Users, GraduationCap, BookOpen, Building2, TrendingUp, AlertTriangle, CheckCircle2, Clock, ArrowRight } from 'lucide-react';
import type { Page } from '../App';

interface DashboardProps { onNavigate: (page: Page) => void; }

const stats = [
  { label: 'Alunos matriculados', value: '1.247', delta: '+38 este mês', icon: Users, color: 'bg-[#0066cc]/10 text-[#0066cc]', border: 'border-[#0066cc]/20' },
  { label: 'Professores ativos', value: '84', delta: '6 turmas descobertas', icon: GraduationCap, color: 'bg-amber-50 text-amber-600', border: 'border-amber-200/60' },
  { label: 'Turmas abertas', value: '42', delta: '2026 — 1º Bimestre', icon: BookOpen, color: 'bg-[#009966]/10 text-[#009966]', border: 'border-[#009966]/20' },
  { label: 'Espaços disponíveis', value: '18/23', delta: '5 em manutenção', icon: Building2, color: 'bg-slate-100 text-slate-600', border: 'border-slate-200' },
];

const alerts = [
  { type: 'warning', message: '6 turmas sem professor titular atribuído', action: 'Ver turmas' },
  { type: 'info', message: 'Grade horária do 2º ano A incompleta', action: 'Editar grade' },
  { type: 'success', message: 'Matrículas 2026 encerradas com sucesso', action: null },
  { type: 'error', message: 'Laboratório de Informática em manutenção até 05/07', action: null },
];

const recentActivity = [
  { icon: Users, text: 'Lucas Mendes matriculado no 9º ano B', time: '10 min atrás', color: 'text-[#0066cc]' },
  { icon: GraduationCap, text: 'Prof. Ana Paula designada para Matemática — 7º ano A', time: '32 min atrás', color: 'text-[#009966]' },
  { icon: BookOpen, text: 'Turma 8º ano C criada com 34 alunos', time: '1h atrás', color: 'text-amber-500' },
  { icon: Building2, text: 'Sala 12 reservada para reforço — Segunda 14h', time: '2h atrás', color: 'text-slate-400' },
  { icon: GraduationCap, text: 'Prof. Roberto saiu da disciplina de Física — 1º EM', time: '3h atrás', color: 'text-[#e7000b]' },
];

const turmasPendentes = [
  { turma: '6º ano A', disciplina: 'Ciências', status: 'sem professor' },
  { turma: '7º ano B', disciplina: 'Inglês', status: 'sem professor' },
  { turma: '8º ano A', disciplina: 'Artes', status: 'sem professor' },
  { turma: '1º EM A', disciplina: 'Física', status: 'sem professor' },
];

export default function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="space-y-6 max-w-7xl">
      {/* Welcome */}
      <div>
        <h2 className="text-lg font-bold text-[#0f172b]">Bom dia, Administrador 👋</h2>
        <p className="text-sm text-slate-500 mt-0.5">Visão geral da escola — Semana 26, 2026</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className={`bg-white border rounded-2xl p-5 shadow-sm ${stat.border}`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500">{stat.label}</p>
                  <p className="text-2xl font-extrabold text-[#0f172b] mt-1">{stat.value}</p>
                  <p className="text-[11px] text-slate-400 mt-1 font-medium">{stat.delta}</p>
                </div>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Alertas */}
        <div className="xl:col-span-2 bg-white border border-[#e2e8f0] rounded-2xl shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#0f172b]">Alertas e pendências</h3>
            <span className="text-xs font-bold text-[#e7000b] bg-red-50 px-2 py-0.5 rounded-full border border-red-200/60">{alerts.filter(a=>a.type!=='success').length} pendentes</span>
          </div>
          <div className="divide-y divide-slate-100">
            {alerts.map((alert, i) => {
              const colors = {
                warning: 'bg-amber-50 border-amber-200/60 text-amber-600',
                info: 'bg-[#0066cc]/5 border-[#0066cc]/15 text-[#0066cc]',
                success: 'bg-[#009966]/5 border-[#009966]/15 text-[#009966]',
                error: 'bg-red-50 border-red-200/60 text-[#e7000b]',
              };
              const icons = { warning: AlertTriangle, info: Clock, success: CheckCircle2, error: AlertTriangle };
              const Icon = icons[alert.type as keyof typeof icons];
              return (
                <div key={i} className="px-5 py-3.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 ${colors[alert.type as keyof typeof colors]}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-xs text-slate-700 font-medium">{alert.message}</p>
                  </div>
                  {alert.action && (
                    <button className="text-[11px] font-bold text-[#0066cc] hover:underline whitespace-nowrap cursor-pointer shrink-0">
                      {alert.action}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Atividade recente */}
        <div className="bg-white border border-[#e2e8f0] rounded-2xl shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <h3 className="text-sm font-bold text-[#0f172b]">Atividade recente</h3>
          </div>
          <div className="divide-y divide-slate-100">
            {recentActivity.map((act, i) => {
              const Icon = act.icon;
              return (
                <div key={i} className="px-4 py-3 flex items-start gap-3">
                  <div className={`w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 mt-0.5`}>
                    <Icon className={`w-3.5 h-3.5 ${act.color}`} />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-700 font-medium leading-snug">{act.text}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{act.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Turmas sem professor */}
      <div className="bg-white border border-[#e2e8f0] rounded-2xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#0f172b]">Turmas com disciplinas descobertas</h3>
          <button onClick={() => onNavigate('turmas')} className="text-xs font-bold text-[#0066cc] hover:underline flex items-center gap-1 cursor-pointer">
            Ver todas <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider px-5 py-3">Turma</th>
                <th className="text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider px-5 py-3">Disciplina</th>
                <th className="text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider px-5 py-3">Status</th>
                <th className="text-right text-[11px] font-bold text-slate-400 uppercase tracking-wider px-5 py-3">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {turmasPendentes.map((t, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-3 text-sm font-bold text-[#0f172b]">{t.turma}</td>
                  <td className="px-5 py-3 text-sm text-slate-600">{t.disciplina}</td>
                  <td className="px-5 py-3">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/60">
                      <AlertTriangle className="w-3 h-3" />{t.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button onClick={() => onNavigate('professores')} className="text-xs font-bold text-[#0066cc] hover:underline cursor-pointer">
                      Atribuir professor
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
