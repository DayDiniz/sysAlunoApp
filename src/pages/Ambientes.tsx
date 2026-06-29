import React, { useState } from 'react';
import {
  Search, Plus, X, Check, Building2, Users, Clock,
  Monitor, FlaskConical, Music, Dumbbell, BookOpen,
  AlertTriangle, CheckCircle2, Filter, ChevronDown, Edit2, Trash2
} from 'lucide-react';

// ── Tipos ────────────────────────────────────────────────────────────────────
type StatusAmbiente = 'Disponível' | 'Ocupado' | 'Manutenção';
type TipoAmbiente = 'Sala de Aula' | 'Laboratório' | 'Quadra' | 'Auditório' | 'Biblioteca' | 'Sala de Artes';
type Turno = 'Manhã' | 'Tarde' | 'Noite' | 'Integral';

interface Ambiente {
  id: string;
  nome: string;
  tipo: TipoAmbiente;
  capacidade: number;
  bloco: string;
  turmaAtual?: string;
  turno?: Turno;
  professor?: string;
  status: StatusAmbiente;
  observacao?: string;
}

// ── Dados ────────────────────────────────────────────────────────────────────
const AMBIENTES_DATA: Ambiente[] = [
  { id: '1', nome: 'Sala 01', tipo: 'Sala de Aula', capacidade: 35, bloco: 'Bloco A', turmaAtual: '6º ano A', turno: 'Manhã', professor: 'Ana Borges', status: 'Ocupado' },
  { id: '2', nome: 'Sala 02', tipo: 'Sala de Aula', capacidade: 35, bloco: 'Bloco A', turmaAtual: '6º ano B', turno: 'Tarde', professor: 'Fernanda Lins', status: 'Ocupado' },
  { id: '3', nome: 'Sala 03', tipo: 'Sala de Aula', capacidade: 35, bloco: 'Bloco A', turmaAtual: '7º ano A', turno: 'Manhã', professor: 'Carlos Mota', status: 'Ocupado' },
  { id: '4', nome: 'Sala 04', tipo: 'Sala de Aula', capacidade: 35, bloco: 'Bloco A', status: 'Disponível' },
  { id: '5', nome: 'Sala 05', tipo: 'Sala de Aula', capacidade: 35, bloco: 'Bloco B', turmaAtual: '8º ano A', turno: 'Manhã', professor: 'Marcos Teles', status: 'Ocupado' },
  { id: '6', nome: 'Sala 06', tipo: 'Sala de Aula', capacidade: 35, bloco: 'Bloco B', status: 'Disponível' },
  { id: '7', nome: 'Sala 07', tipo: 'Sala de Aula', capacidade: 35, bloco: 'Bloco B', turmaAtual: '9º ano B', turno: 'Tarde', professor: 'Ana Borges', status: 'Ocupado' },
  { id: '8', nome: 'Sala 08', tipo: 'Sala de Aula', capacidade: 35, bloco: 'Bloco C', status: 'Disponível' },
  { id: '9', nome: 'Lab. Informática', tipo: 'Laboratório', capacidade: 30, bloco: 'Bloco C', status: 'Manutenção', observacao: 'Manutenção dos computadores — previsão 05/07' },
  { id: '10', nome: 'Lab. Ciências', tipo: 'Laboratório', capacidade: 25, bloco: 'Bloco C', status: 'Disponível' },
  { id: '11', nome: 'Lab. Robótica', tipo: 'Laboratório', capacidade: 20, bloco: 'Bloco C', turmaAtual: '2º EM A', turno: 'Noite', professor: 'Marcos Teles', status: 'Ocupado' },
  { id: '12', nome: 'Sala de Artes', tipo: 'Sala de Artes', capacidade: 28, bloco: 'Bloco B', turmaAtual: '7º ano B', turno: 'Tarde', professor: 'Juliana Ramos', status: 'Ocupado' },
  { id: '13', nome: 'Quadra Esportiva', tipo: 'Quadra', capacidade: 80, bloco: 'Externo', turmaAtual: 'Uso compartilhado', turno: 'Integral', status: 'Ocupado' },
  { id: '14', nome: 'Auditório', tipo: 'Auditório', capacidade: 200, bloco: 'Bloco A', status: 'Disponível' },
  { id: '15', nome: 'Biblioteca', tipo: 'Biblioteca', capacidade: 50, bloco: 'Bloco A', turmaAtual: 'Uso livre', turno: 'Integral', status: 'Ocupado' },
];

const TIPO_ICONS: Record<TipoAmbiente, React.ElementType> = {
  'Sala de Aula': BookOpen,
  'Laboratório': FlaskConical,
  'Quadra': Dumbbell,
  'Auditório': Users,
  'Biblioteca': BookOpen,
  'Sala de Artes': Music,
};

const STATUS_CONFIG = {
  'Disponível': { bg: 'bg-[#009966]/8', border: 'border-[#009966]/25', badge: 'bg-[#009966]/10 text-[#009966] border-[#009966]/20', dot: 'bg-[#009966]', icon: CheckCircle2 },
  'Ocupado': { bg: 'bg-[#0066cc]/5', border: 'border-[#0066cc]/20', badge: 'bg-[#0066cc]/8 text-[#0066cc] border-[#0066cc]/20', dot: 'bg-[#0066cc]', icon: Clock },
  'Manutenção': { bg: 'bg-[#e7000b]/5', border: 'border-[#e7000b]/20', badge: 'bg-[#e7000b]/8 text-[#e7000b] border-[#e7000b]/20', dot: 'bg-[#e7000b]', icon: AlertTriangle },
};

// ── Modal de detalhes ────────────────────────────────────────────────────────
function ModalAmbiente({ ambiente, onClose, onSave }: {
  ambiente: Ambiente;
  onClose: () => void;
  onSave: (updated: Ambiente) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...ambiente });
  const [success, setSuccess] = useState(false);

  const handleSave = () => {
    setSuccess(true);
    setTimeout(() => { onSave(form); setSuccess(false); setEditing(false); }, 1200);
  };

  const cfg = STATUS_CONFIG[form.status];
  const Icon = TIPO_ICONS[form.tipo];

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-[#e2e8f0]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${cfg.badge}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0f172b]">{ambiente.nome}</h3>
              <p className="text-xs text-slate-400">{ambiente.tipo} • {ambiente.bloco}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!editing && (
              <button onClick={() => setEditing(true)} className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 cursor-pointer transition-colors">
                <Edit2 className="w-4 h-4" />
              </button>
            )}
            <button onClick={onClose} className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 cursor-pointer transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {success ? (
          <div className="py-12 text-center">
            <div className="w-14 h-14 rounded-full bg-[#009966]/10 border border-[#009966]/20 flex items-center justify-center mx-auto mb-3">
              <Check className="w-7 h-7 text-[#009966] stroke-[2.5]" />
            </div>
            <p className="text-sm font-bold text-[#0f172b]">Ambiente atualizado!</p>
          </div>
        ) : editing ? (
          /* Modo edição */
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Nome</label>
                <input value={form.nome} onChange={e => setForm(f => ({ ...f, nome: e.target.value }))} className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#e2e8f0] rounded-xl text-sm text-[#0f172b] focus:outline-none focus:border-[#0066cc]/50" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Capacidade</label>
                <input type="number" value={form.capacidade} onChange={e => setForm(f => ({ ...f, capacidade: Number(e.target.value) }))} className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#e2e8f0] rounded-xl text-sm text-[#0f172b] focus:outline-none focus:border-[#0066cc]/50" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Turma alocada</label>
                <input value={form.turmaAtual || ''} onChange={e => setForm(f => ({ ...f, turmaAtual: e.target.value }))} placeholder="Ex: 7º ano A" className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#e2e8f0] rounded-xl text-sm text-[#0f172b] focus:outline-none focus:border-[#0066cc]/50" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Turno</label>
                <select value={form.turno || ''} onChange={e => setForm(f => ({ ...f, turno: e.target.value as Turno }))} className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#e2e8f0] rounded-xl text-sm text-[#0f172b] focus:outline-none cursor-pointer">
                  <option value="">Nenhum</option>
                  <option>Manhã</option><option>Tarde</option><option>Noite</option><option>Integral</option>
                </select>
              </div>
              <div className="col-span-2 space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Status</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Disponível', 'Ocupado', 'Manutenção'] as StatusAmbiente[]).map(s => (
                    <button key={s} type="button" onClick={() => setForm(f => ({ ...f, status: s }))}
                      className={`py-2.5 rounded-xl border-2 text-xs font-bold transition-all cursor-pointer ${form.status === s ? `border-current ${STATUS_CONFIG[s].badge}` : 'border-[#e2e8f0] text-slate-500 hover:border-slate-300'}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              {form.status === 'Manutenção' && (
                <div className="col-span-2 space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Observação</label>
                  <input value={form.observacao || ''} onChange={e => setForm(f => ({ ...f, observacao: e.target.value }))} placeholder="Descreva o motivo da manutenção" className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#e2e8f0] rounded-xl text-sm text-[#0f172b] focus:outline-none focus:border-[#0066cc]/50" />
                </div>
              )}
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setEditing(false)} className="flex-1 py-2.5 border border-[#e2e8f0] rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-50 cursor-pointer">Cancelar</button>
              <button onClick={handleSave} className="flex-1 py-2.5 bg-[#0066cc] hover:bg-[#0055b3] text-white rounded-xl text-sm font-bold cursor-pointer shadow-sm flex items-center justify-center gap-2">
                <Check className="w-4 h-4 stroke-[3]" />Salvar alterações
              </button>
            </div>
          </div>
        ) : (
          /* Modo visualização */
          <div className="p-6 space-y-4">
            <div className={`flex items-center gap-2 p-3 rounded-xl border ${cfg.badge}`}>
              <div className={`w-2 h-2 rounded-full ${cfg.dot}`} />
              <span className="text-sm font-bold">{form.status}</span>
              {form.observacao && <span className="text-xs text-current opacity-70 ml-1">— {form.observacao}</span>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Capacidade', value: `${form.capacidade} pessoas` },
                { label: 'Bloco', value: form.bloco },
                { label: 'Turno', value: form.turno || '—' },
                { label: 'Tipo', value: form.tipo },
              ].map((item, i) => (
                <div key={i} className="bg-slate-50 rounded-xl p-3.5 border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.label}</p>
                  <p className="text-sm font-bold text-[#0f172b] mt-1">{item.value}</p>
                </div>
              ))}
            </div>

            {form.turmaAtual && (
              <div className="bg-[#0066cc]/4 border border-[#0066cc]/15 rounded-xl p-4">
                <p className="text-[10px] font-bold text-[#0066cc] uppercase tracking-wider mb-2">Alocação atual</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-[#0f172b]">{form.turmaAtual}</p>
                    {form.professor && <p className="text-xs text-slate-500 mt-0.5">Prof. {form.professor}</p>}
                  </div>
                  {form.turno && (
                    <span className="text-xs font-bold text-[#0066cc] bg-[#0066cc]/10 px-2.5 py-1 rounded-full border border-[#0066cc]/20">{form.turno}</span>
                  )}
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button onClick={onClose} className="flex-1 py-2.5 border border-[#e2e8f0] rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-50 cursor-pointer">Fechar</button>
              <button onClick={() => setEditing(true)} className="flex-1 py-2.5 bg-[#0066cc] hover:bg-[#0055b3] text-white rounded-xl text-sm font-bold cursor-pointer shadow-sm flex items-center justify-center gap-2">
                <Edit2 className="w-4 h-4" />Editar ambiente
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Mapa de Ambientes (cards) ─────────────────────────────────────────────────
export function MapaAmbientes() {
  const [ambientes, setAmbientes] = useState<Ambiente[]>(AMBIENTES_DATA);
  const [search, setSearch] = useState('');
  const [filtroStatus, setFiltroStatus] = useState<StatusAmbiente | 'Todos'>('Todos');
  const [filtroBloco, setFiltroBloco] = useState('Todos');
  const [selected, setSelected] = useState<Ambiente | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [newSuccess, setNewSuccess] = useState(false);

  const blocos = ['Todos', ...Array.from(new Set(AMBIENTES_DATA.map(a => a.bloco)))];

  const filtered = ambientes.filter(a => {
    const matchSearch = a.nome.toLowerCase().includes(search.toLowerCase()) || a.tipo.toLowerCase().includes(search.toLowerCase()) || (a.turmaAtual || '').toLowerCase().includes(search.toLowerCase());
    const matchStatus = filtroStatus === 'Todos' || a.status === filtroStatus;
    const matchBloco = filtroBloco === 'Todos' || a.bloco === filtroBloco;
    return matchSearch && matchStatus && matchBloco;
  });

  const counts = {
    disponivel: ambientes.filter(a => a.status === 'Disponível').length,
    ocupado: ambientes.filter(a => a.status === 'Ocupado').length,
    manutencao: ambientes.filter(a => a.status === 'Manutenção').length,
  };

  const handleSave = (updated: Ambiente) => {
    setAmbientes(prev => prev.map(a => a.id === updated.id ? updated : a));
    setSelected(null);
  };

  const handleNewSave = (e: React.FormEvent) => {
    e.preventDefault();
    setNewSuccess(true);
    setTimeout(() => { setNewSuccess(false); setShowNew(false); }, 1500);
  };

  return (
    <div className="space-y-5 max-w-7xl">
      {selected && <ModalAmbiente ambiente={selected} onClose={() => setSelected(null)} onSave={handleSave} />}

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-base font-bold text-[#0f172b]">Mapa de Ambientes</h2>
          <p className="text-xs text-slate-500 mt-0.5">{ambientes.length} ambientes cadastrados</p>
        </div>
        <button onClick={() => setShowNew(true)} className="flex items-center gap-2 px-4 py-2.5 bg-[#0066cc] text-white text-sm font-bold rounded-xl cursor-pointer hover:bg-[#0055b3] transition-all shadow-sm shadow-blue-500/20">
          <Plus className="w-4 h-4" />Novo ambiente
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Disponíveis', value: counts.disponivel, status: 'Disponível' as StatusAmbiente, ...STATUS_CONFIG['Disponível'] },
          { label: 'Ocupados', value: counts.ocupado, status: 'Ocupado' as StatusAmbiente, ...STATUS_CONFIG['Ocupado'] },
          { label: 'Manutenção', value: counts.manutencao, status: 'Manutenção' as StatusAmbiente, ...STATUS_CONFIG['Manutenção'] },
        ].map((s, i) => (
          <button
            key={i}
            onClick={() => setFiltroStatus(filtroStatus === s.status ? 'Todos' : s.status)}
            className={`rounded-2xl border p-4 text-left cursor-pointer transition-all hover:shadow-sm ${filtroStatus === s.status ? `${s.bg} ${s.border} ring-2 ring-offset-1 ${s.border.replace('border-', 'ring-')}` : `bg-white ${s.border}`}`}
          >
            <p className={`text-2xl font-extrabold ${s.badge.split(' ').find(c => c.startsWith('text-'))}`}>{s.value}</p>
            <p className={`text-xs font-bold mt-0.5 opacity-80 ${s.badge.split(' ').find(c => c.startsWith('text-'))}`}>{s.label}</p>
          </button>
        ))}
      </div>

      {/* Filtros */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 bg-white border border-[#e2e8f0] rounded-xl px-3 py-2.5 flex-1 min-w-[200px] max-w-sm shadow-sm">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar ambiente ou turma..." className="bg-transparent text-sm text-slate-700 placeholder:text-slate-400 outline-none w-full" />
        </div>
        <select value={filtroBloco} onChange={e => setFiltroBloco(e.target.value)} className="px-3.5 py-2.5 bg-white border border-[#e2e8f0] rounded-xl text-sm font-semibold text-[#0f172b] focus:outline-none cursor-pointer shadow-sm">
          {blocos.map(b => <option key={b}>{b}</option>)}
        </select>
      </div>

      {/* Grid de cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(amb => {
          const cfg = STATUS_CONFIG[amb.status];
          const Icon = TIPO_ICONS[amb.tipo];
          return (
            <button
              key={amb.id}
              onClick={() => setSelected(amb)}
              className={`bg-white border rounded-2xl p-5 text-left hover:shadow-md active:scale-[0.99] transition-all cursor-pointer group relative overflow-hidden ${cfg.border}`}
            >
              {/* Accent line */}
              <div className={`absolute top-0 bottom-0 left-0 w-1 ${cfg.dot}`} />

              <div className="pl-2">
                {/* Header do card */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${cfg.badge}`}>
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#0f172b] group-hover:text-[#0066cc] transition-colors">{amb.nome}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{amb.bloco}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${cfg.badge}`}>
                    {amb.status}
                  </span>
                </div>

                {/* Info */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 font-medium">{amb.tipo}</span>
                    <span className="font-bold text-slate-600 flex items-center gap-1">
                      <Users className="w-3 h-3 text-slate-400" />{amb.capacidade} pessoas
                    </span>
                  </div>

                  {amb.turmaAtual ? (
                    <div className={`mt-2 p-2.5 rounded-xl border ${cfg.bg} ${cfg.border}`}>
                      <p className="text-xs font-bold text-[#0f172b]">{amb.turmaAtual}</p>
                      <div className="flex items-center justify-between mt-1">
                        {amb.professor && <p className="text-[10px] text-slate-500">Prof. {amb.professor.split(' ')[0]}</p>}
                        {amb.turno && <span className="text-[10px] font-bold text-slate-500">{amb.turno}</span>}
                      </div>
                    </div>
                  ) : amb.status === 'Manutenção' ? (
                    <div className="mt-2 p-2.5 rounded-xl bg-red-50 border border-red-200/60">
                      <p className="text-[11px] text-[#e7000b] font-medium leading-snug">{amb.observacao || 'Em manutenção'}</p>
                    </div>
                  ) : (
                    <div className="mt-2 p-2.5 rounded-xl bg-[#009966]/5 border border-[#009966]/15 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#009966]" />
                      <p className="text-[11px] text-[#009966] font-bold">Disponível para alocação</p>
                    </div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="bg-white border border-[#e2e8f0] rounded-2xl py-16 text-center shadow-sm">
          <Building2 className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-bold text-slate-500">Nenhum ambiente encontrado</p>
          <p className="text-xs text-slate-400 mt-1">Tente ajustar os filtros</p>
        </div>
      )}

      {/* Modal novo ambiente */}
      {showNew && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-[#e2e8f0]">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-bold text-[#0f172b]">Cadastrar ambiente</h3>
              <button onClick={() => setShowNew(false)} className="p-1.5 bg-slate-100 rounded-full text-slate-500 cursor-pointer"><X className="w-4 h-4" /></button>
            </div>
            {newSuccess ? (
              <div className="py-12 text-center">
                <div className="w-14 h-14 rounded-full bg-[#009966]/10 border border-[#009966]/20 flex items-center justify-center mx-auto mb-3">
                  <Check className="w-7 h-7 text-[#009966] stroke-[2.5]" />
                </div>
                <p className="text-sm font-bold text-[#0f172b]">Ambiente cadastrado!</p>
              </div>
            ) : (
              <form onSubmit={handleNewSave} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Nome</label>
                    <input required className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#e2e8f0] rounded-xl text-sm focus:outline-none focus:border-[#0066cc]/50" placeholder="Ex: Sala 16" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Tipo</label>
                    <select className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#e2e8f0] rounded-xl text-sm focus:outline-none cursor-pointer">
                      <option>Sala de Aula</option><option>Laboratório</option><option>Quadra</option><option>Auditório</option><option>Biblioteca</option><option>Sala de Artes</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Bloco</label>
                    <input required className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#e2e8f0] rounded-xl text-sm focus:outline-none focus:border-[#0066cc]/50" placeholder="Ex: Bloco A" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Capacidade</label>
                    <input type="number" required className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#e2e8f0] rounded-xl text-sm focus:outline-none focus:border-[#0066cc]/50" placeholder="35" />
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowNew(false)} className="flex-1 py-2.5 border border-[#e2e8f0] rounded-xl text-sm font-bold text-slate-500 cursor-pointer">Cancelar</button>
                  <button type="submit" className="flex-1 py-2.5 bg-[#0066cc] text-white rounded-xl text-sm font-bold cursor-pointer hover:bg-[#0055b3]">Cadastrar</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Gestão de Vagas (tabela) ──────────────────────────────────────────────────
export function GestaoVagas() {
  const [ambientes, setAmbientes] = useState<Ambiente[]>(AMBIENTES_DATA);
  const [search, setSearch] = useState('');
  const [filtroTurno, setFiltroTurno] = useState<Turno | 'Todos'>('Todos');
  const [selected, setSelected] = useState<Ambiente | null>(null);

  const filtered = ambientes.filter(a => {
    const matchSearch = a.nome.toLowerCase().includes(search.toLowerCase()) || (a.turmaAtual || '').toLowerCase().includes(search.toLowerCase());
    const matchTurno = filtroTurno === 'Todos' || a.turno === filtroTurno;
    return matchSearch && matchTurno;
  });

  const handleSave = (updated: Ambiente) => {
    setAmbientes(prev => prev.map(a => a.id === updated.id ? updated : a));
    setSelected(null);
  };

  const ocupacao = Math.round((ambientes.filter(a => a.status === 'Ocupado').length / ambientes.length) * 100);

  return (
    <div className="space-y-5 max-w-7xl">
      {selected && <ModalAmbiente ambiente={selected} onClose={() => setSelected(null)} onSave={handleSave} />}

      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-base font-bold text-[#0f172b]">Gestão de Vagas</h2>
          <p className="text-xs text-slate-500 mt-0.5">Alocação de turmas por ambiente e turno</p>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold ${ocupacao > 80 ? 'bg-amber-50 text-amber-600 border-amber-200/60' : 'bg-[#009966]/8 text-[#009966] border-[#009966]/20'}`}>
          <div className={`w-2 h-2 rounded-full ${ocupacao > 80 ? 'bg-amber-500' : 'bg-[#009966]'} animate-pulse`} />
          {ocupacao}% de ocupação geral
        </div>
      </div>

      {/* Barra de ocupação */}
      <div className="bg-white border border-[#e2e8f0] rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Ocupação por turno</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {(['Manhã', 'Tarde', 'Noite'] as Turno[]).map(turno => {
            const total = ambientes.filter(a => a.tipo === 'Sala de Aula').length;
            const ocupados = ambientes.filter(a => a.turno === turno && a.status === 'Ocupado').length;
            const pct = Math.round((ocupados / total) * 100);
            return (
              <div key={turno}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-slate-600">{turno}</span>
                  <span className="text-xs font-bold text-[#0f172b]">{ocupados}/{total}</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#0066cc] rounded-full transition-all" style={{ width: `${pct}%` }} />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">{pct}% ocupado</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filtros */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 bg-white border border-[#e2e8f0] rounded-xl px-3 py-2.5 flex-1 min-w-[200px] max-w-sm shadow-sm">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar ambiente ou turma..." className="bg-transparent text-sm text-slate-700 placeholder:text-slate-400 outline-none w-full" />
        </div>
        <div className="flex items-center gap-2">
          {(['Todos', 'Manhã', 'Tarde', 'Noite'] as const).map(t => (
            <button key={t} onClick={() => setFiltroTurno(t as Turno | 'Todos')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${filtroTurno === t ? 'bg-[#0066cc] text-white shadow-sm' : 'bg-white border border-[#e2e8f0] text-slate-600 hover:bg-slate-50'}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Tabela */}
      <div className="bg-white border border-[#e2e8f0] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                {['Ambiente', 'Tipo', 'Bloco', 'Capacidade', 'Turma', 'Professor', 'Turno', 'Status'].map(h => (
                  <th key={h} className="text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider px-5 py-3.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(amb => {
                const cfg = STATUS_CONFIG[amb.status];
                const Icon = TIPO_ICONS[amb.tipo];
                return (
                  <tr key={amb.id} onClick={() => setSelected(amb)} className="hover:bg-slate-50/50 transition-colors cursor-pointer group">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 ${cfg.badge}`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-sm font-bold text-[#0f172b] group-hover:text-[#0066cc] transition-colors">{amb.nome}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-slate-500">{amb.tipo}</td>
                    <td className="px-5 py-3.5 text-xs font-mono text-slate-400">{amb.bloco}</td>
                    <td className="px-5 py-3.5 text-sm text-slate-600 font-mono">{amb.capacidade}</td>
                    <td className="px-5 py-3.5 text-sm font-semibold text-[#0f172b]">{amb.turmaAtual || <span className="text-slate-300">—</span>}</td>
                    <td className="px-5 py-3.5 text-xs text-slate-500">{amb.professor || <span className="text-slate-300">—</span>}</td>
                    <td className="px-5 py-3.5">
                      {amb.turno ? (
                        <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">{amb.turno}</span>
                      ) : <span className="text-slate-300">—</span>}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full border ${cfg.badge}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                        {amb.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-400">{filtered.length} ambiente{filtered.length !== 1 ? 's' : ''} exibido{filtered.length !== 1 ? 's' : ''}</p>
          <button className="text-xs font-bold text-[#0066cc] hover:underline cursor-pointer">Exportar planilha</button>
        </div>
      </div>
    </div>
  );
}
