import React from 'react';
import {
  Users, GraduationCap, BookOpen, Building2, TrendingUp,
  AlertTriangle, CheckCircle2, Clock, ArrowRight, DollarSign,
  MessageSquare, ShieldAlert, BarChart2, Activity, Target
} from 'lucide-react';
import type { Page } from '../App';

interface DashboardProps {
  onNavigate: (page: Page) => void;
  role: 'admin' | 'coordenador';
}

// ── Dashboard Admin ──────────────────────────────────────────────────────────
function DashboardAdmin({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const stats = [
    { label: 'Alunos matriculados', value: '1.247', sub: '+38 este mês', icon: Users, color: 'text-[#0066cc] bg-[#0066cc]/10 border-[#0066cc]/20' },
    { label: 'Professores ativos', value: '84', sub: '6 turmas descobertas', icon: GraduationCap, color: 'text-amber-600 bg-amber-50 border-amber-200/60' },
    { label: 'Inadimplência', value: 'R$ 48k', sub: '12 alunos em atraso', icon: DollarSign, color: 'text-[#e7000b] bg-red-50 border-red-200/60' },
    { label: 'Ocorrências abertas', value: '7', sub: '3 críticas pendentes', icon: ShieldAlert, color: 'text-purple-600 bg-purple-50 border-purple-200/60' },
    { label: 'Turmas abertas', value: '42', sub: '2026 — 1º Bimestre', icon: BookOpen, color: 'text-[#009966] bg-[#009966]/10 border-[#009966]/20' },
    { label: 'Ambientes disponíveis', value: '18/23', sub: '5 em manutenção', icon: Building2, color: 'text-slate-600 bg-slate-100 border-slate-200' },
  ];

  const alerts = [
    { type: 'error', msg: '3 ocorrências críticas sem resposta há +48h', action: 'Ver ocorrências', page: 'comunicacao-atendimento' as Page },
    { type: 'warning', msg: '6 turmas sem professor titular atribuído', action: 'Atribuir', page: 'calendario-atribuicao' as Page },
    { type: 'warning', msg: 'Laboratório de Informática em manutenção até 05/07', action: null, page: null },
    { type: 'success', msg: 'Matrículas 2026 encerradas com sucesso', action: null, page: null },
  ];

  const financeiro = [
    { label: 'Receita prevista', value: 'R$ 892k', delta: '+4.2%', up: true },
    { label: 'Recebido no mês', value: 'R$ 844k', delta: '94.6%', up: true },
    { label: 'Inadimplente', value: 'R$ 48k', delta: '5.4%', up: false },
  ];

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[#0f172b]">Bom dia, Administrador 👋</h2>
          <p className="text-xs text-slate-500 mt-0.5">Visão geral da escola — Semana 26, 2026</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0066cc]/8 border border-[#0066cc]/20 rounded-xl">
          <div className="w-2 h-2 rounded-full bg-[#009966] animate-pulse" />
          <span className="text-xs font-bold text-[#0066cc]">Sistema operacional</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className={`bg-white border rounded-2xl p-5 shadow-sm ${s.color.split(' ').find(c => c.startsWith('border')) || 'border-[#e2e8f0]'}`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500">{s.label}</p>
                  <p className="text-2xl font-extrabold text-[#0f172b] mt-1">{s.value}</p>
                  <p className="text-[11px] text-slate-400 mt-1">{s.sub}</p>
                </div>
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${s.color}`}>
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
            <span className="text-xs font-bold text-[#e7000b] bg-red-50 px-2 py-0.5 rounded-full border border-red-200/60">
              {alerts.filter(a => a.type !== 'success').length} pendentes
            </span>
          </div>
          <div className="divide-y divide-slate-100">
            {alerts.map((a, i) => {
              const colors = { error: 'bg-red-50 border-red-200/60 text-[#e7000b]', warning: 'bg-amber-50 border-amber-200/60 text-amber-600', success: 'bg-[#009966]/5 border-[#009966]/15 text-[#009966]' };
              const Icon = a.type === 'success' ? CheckCircle2 : AlertTriangle;
              return (
                <div key={i} className="px-5 py-3.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 ${colors[a.type as keyof typeof colors]}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-xs text-slate-700 font-medium">{a.msg}</p>
                  </div>
                  {a.action && a.page && (
                    <button onClick={() => onNavigate(a.page!)} className="text-[11px] font-bold text-[#0066cc] hover:underline whitespace-nowrap cursor-pointer shrink-0">
                      {a.action}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Financeiro */}
        <div className="bg-white border border-[#e2e8f0] rounded-2xl shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#0f172b]">Financeiro — Junho</h3>
            <button onClick={() => onNavigate('financeiro')} className="text-xs font-bold text-[#0066cc] hover:underline cursor-pointer flex items-center gap-1">
              Ver tudo <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="p-5 space-y-4">
            {financeiro.map((f, i) => (
              <div key={i} className="flex items-center justify-between">
                <p className="text-xs text-slate-500 font-medium">{f.label}</p>
                <div className="text-right">
                  <p className="text-sm font-bold text-[#0f172b]">{f.value}</p>
                  <p className={`text-[10px] font-bold ${f.up ? 'text-[#009966]' : 'text-[#e7000b]'}`}>
                    {f.up ? '↑' : '↓'} {f.delta}
                  </p>
                </div>
              </div>
            ))}
            <div className="pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold text-slate-400">Taxa de recebimento</span>
                <span className="text-[10px] font-bold text-[#009966]">94.6%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#009966] rounded-full" style={{ width: '94.6%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Atividade recente */}
      <div className="bg-white border border-[#e2e8f0] rounded-2xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <h3 className="text-sm font-bold text-[#0f172b]">Atividade recente</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {[
            { icon: Users, text: 'Lucas Mendes matriculado no 9º ano B', time: '10 min', color: 'text-[#0066cc]' },
            { icon: GraduationCap, text: 'Prof. Ana Paula designada para Matemática — 7º ano A', time: '32 min', color: 'text-[#009966]' },
            { icon: DollarSign, text: 'Pagamento recebido — Família Oliveira (R$ 1.240)', time: '1h', color: 'text-[#009966]' },
            { icon: ShieldAlert, text: 'Ocorrência aberta — 8º ano B — Indisciplina', time: '2h', color: 'text-[#e7000b]' },
            { icon: Building2, text: 'Sala 12 reservada para reforço — Segunda 14h', time: '3h', color: 'text-slate-400' },
          ].map((a, i) => {
            const Icon = a.icon;
            return (
              <div key={i} className="px-5 py-3 flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                  <Icon className={`w-3.5 h-3.5 ${a.color}`} />
                </div>
                <p className="text-xs text-slate-700 font-medium flex-1">{a.text}</p>
                <span className="text-[10px] text-slate-400 font-mono shrink-0">{a.time} atrás</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Dashboard Coordenador ────────────────────────────────────────────────────
function DashboardCoordenador({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const stats = [
    { label: 'Frequência média hoje', value: '87%', sub: '↑ 2% vs ontem', icon: Activity, color: 'text-[#009966] bg-[#009966]/10 border-[#009966]/20' },
    { label: 'Alunos em risco', value: '23', sub: 'Frequência abaixo de 75%', icon: AlertTriangle, color: 'text-[#e7000b] bg-red-50 border-red-200/60' },
    { label: 'Turmas sem chamada', value: '4', sub: 'Hoje até agora', icon: Clock, color: 'text-amber-600 bg-amber-50 border-amber-200/60' },
    { label: 'Em recuperação', value: '38', sub: '3.1% dos alunos', icon: Target, color: 'text-purple-600 bg-purple-50 border-purple-200/60' },
    { label: 'Conselho pendente', value: '2', sub: 'Turmas aguardando', icon: Users, color: 'text-[#0066cc] bg-[#0066cc]/10 border-[#0066cc]/20' },
    { label: 'Média geral escola', value: '7.4', sub: 'Todos os níveis — 1º Bim', icon: BarChart2, color: 'text-slate-600 bg-slate-100 border-slate-200' },
  ];

  const mediasPorNivel = [
    { nivel: 'Fundamental I', media: 8.1, cor: 'bg-[#009966]' },
    { nivel: 'Fundamental II', media: 7.2, cor: 'bg-[#0066cc]' },
    { nivel: 'Ensino Médio', media: 7.0, cor: 'bg-purple-500' },
  ];

  const alunosRisco = [
    { nome: 'Diego Martins Alves', turma: '9º ano C', frequencia: 68, disciplina: 'Geral' },
    { nome: 'Priscila Nunes Bento', turma: '7º ano A', frequencia: 71, disciplina: 'Matemática' },
    { nome: 'Rafael Costa Lima', turma: '1º EM B', frequencia: 73, disciplina: 'Física' },
    { nome: 'Larissa Moura Reis', turma: '8º ano B', frequencia: 74, disciplina: 'Português' },
  ];

  const turmasSemChamada = [
    { turma: '6º ano A', professor: 'Ana Borges', horario: '07:00' },
    { turma: '8º ano B', professor: 'Fernanda Lins', horario: '08:40' },
    { turma: '2º EM A', professor: 'Carlos Mota', horario: '07:50' },
    { turma: '1º EM C', professor: 'Marcos Teles', horario: '09:50' },
  ];

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[#0f172b]">Bom dia, Coordenação 📚</h2>
          <p className="text-xs text-slate-500 mt-0.5">Visão pedagógica — Segunda, 29 de Junho de 2026</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0066cc]/8 border border-[#0066cc]/20 rounded-xl">
          <div className="w-2 h-2 rounded-full bg-[#009966] animate-pulse" />
          <span className="text-xs font-bold text-[#0066cc]">1º Bimestre em andamento</span>
        </div>
      </div>

      {/* Stats pedagógicos */}
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          const borderClass = s.color.split(' ').find(c => c.startsWith('border')) || 'border-[#e2e8f0]';
          return (
            <div key={i} className={`bg-white border rounded-2xl p-5 shadow-sm ${borderClass}`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500">{s.label}</p>
                  <p className="text-2xl font-extrabold text-[#0f172b] mt-1">{s.value}</p>
                  <p className="text-[11px] text-slate-400 mt-1">{s.sub}</p>
                </div>
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${s.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Alunos em risco */}
        <div className="xl:col-span-2 bg-white border border-[#e2e8f0] rounded-2xl shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#0f172b]">Alunos em risco de reprovação por frequência</h3>
            <span className="text-xs font-bold text-[#e7000b] bg-red-50 px-2 py-0.5 rounded-full border border-red-200/60">23 no total</span>
          </div>
          <div className="divide-y divide-slate-100">
            {alunosRisco.map((a, i) => (
              <div key={i} className="px-5 py-3.5 flex items-center gap-4">
                <div className="w-8 h-8 rounded-xl bg-red-50 text-[#e7000b] flex items-center justify-center text-xs font-bold shrink-0">
                  {a.nome.split(' ').map(n => n[0]).slice(0, 2).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-[#0f172b] truncate">{a.nome}</p>
                  <p className="text-[10px] text-slate-400">{a.turma} • {a.disciplina}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-extrabold text-[#e7000b]">{a.frequencia}%</p>
                  <p className="text-[10px] text-slate-400">mín. 75%</p>
                </div>
                <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden shrink-0">
                  <div className="h-full bg-[#e7000b] rounded-full" style={{ width: `${a.frequencia}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="px-5 py-3 border-t border-slate-100">
            <button onClick={() => onNavigate('relatorios')} className="text-xs font-bold text-[#0066cc] hover:underline cursor-pointer flex items-center gap-1">
              Ver todos os alunos em risco <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Médias por nível */}
        <div className="bg-white border border-[#e2e8f0] rounded-2xl shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <h3 className="text-sm font-bold text-[#0f172b]">Média por nível — 1º Bimestre</h3>
          </div>
          <div className="p-5 space-y-5">
            {mediasPorNivel.map((m, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold text-slate-600">{m.nivel}</p>
                  <p className="text-sm font-extrabold text-[#0f172b]">{m.media}</p>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${m.cor} rounded-full transition-all`} style={{ width: `${(m.media / 10) * 100}%` }} />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">{m.media >= 7 ? '✓ Acima da média mínima' : '⚠ Abaixo da média mínima'}</p>
              </div>
            ))}

            <div className="pt-3 border-t border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Situação geral</p>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-[#009966]/8 rounded-xl p-2.5 border border-[#009966]/20">
                  <p className="text-base font-extrabold text-[#009966]">89%</p>
                  <p className="text-[9px] text-[#009966] font-bold">Aprovados</p>
                </div>
                <div className="bg-amber-50 rounded-xl p-2.5 border border-amber-200/60">
                  <p className="text-base font-extrabold text-amber-600">8%</p>
                  <p className="text-[9px] text-amber-600 font-bold">Recuperação</p>
                </div>
                <div className="bg-red-50 rounded-xl p-2.5 border border-red-200/60">
                  <p className="text-base font-extrabold text-[#e7000b]">3%</p>
                  <p className="text-[9px] text-[#e7000b] font-bold">Em risco</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Turmas sem chamada */}
      <div className="bg-white border border-[#e2e8f0] rounded-2xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#0f172b]">Turmas sem chamada registrada hoje</h3>
          <button onClick={() => onNavigate('diario')} className="text-xs font-bold text-[#0066cc] hover:underline cursor-pointer flex items-center gap-1">
            Ir para o diário <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                {['Turma', 'Professor', 'Horário', 'Status', 'Ação'].map(h => (
                  <th key={h} className="text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {turmasSemChamada.map((t, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-3 text-sm font-bold text-[#0f172b]">{t.turma}</td>
                  <td className="px-5 py-3 text-sm text-slate-600">{t.professor}</td>
                  <td className="px-5 py-3 text-sm font-mono text-slate-400">{t.horario}</td>
                  <td className="px-5 py-3">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/60">
                      <Clock className="w-3 h-3" />Pendente
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <button className="text-xs font-bold text-[#0066cc] hover:underline cursor-pointer">Notificar professor</button>
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

// ── Export ───────────────────────────────────────────────────────────────────
export default function Dashboard({ onNavigate, role }: DashboardProps) {
  if (role === 'coordenador') return <DashboardCoordenador onNavigate={onNavigate} />;
  return <DashboardAdmin onNavigate={onNavigate} />;
}
