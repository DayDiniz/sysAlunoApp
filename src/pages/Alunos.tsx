import React, { useState } from 'react';
import { Search, Plus, Filter, ChevronDown, X, Check, Users } from 'lucide-react';

const ALUNOS = [
  { id: 1, nome: 'Ana Beatriz Souza', ra: '20260001', turma: '6º ano A', turno: 'Manhã', status: 'Ativo', responsavel: 'Maria Souza' },
  { id: 2, nome: 'Bruno Carvalho Lima', ra: '20260002', turma: '7º ano B', turno: 'Manhã', status: 'Ativo', responsavel: 'José Lima' },
  { id: 3, nome: 'Carla Fernanda Rocha', ra: '20260003', turma: '8º ano A', turno: 'Tarde', status: 'Ativo', responsavel: 'Sandra Rocha' },
  { id: 4, nome: 'Diego Martins Alves', ra: '20260004', turma: '9º ano C', turno: 'Manhã', status: 'Inativo', responsavel: 'Paulo Alves' },
  { id: 5, nome: 'Eduarda Pinto Costa', ra: '20260005', turma: '1º EM A', turno: 'Noite', status: 'Ativo', responsavel: 'Ana Costa' },
  { id: 6, nome: 'Felipe Torres Neves', ra: '20260006', turma: '2º EM B', turno: 'Manhã', status: 'Ativo', responsavel: 'Carlos Neves' },
  { id: 7, nome: 'Gabriela Mendes Silva', ra: '20260007', turma: '3º EM A', turno: 'Manhã', status: 'Ativo', responsavel: 'Lúcia Silva' },
  { id: 8, nome: 'Henrique Oliveira Cruz', ra: '20260008', turma: '6º ano B', turno: 'Tarde', status: 'Ativo', responsavel: 'Roberto Cruz' },
];

const TURMAS_OPTIONS = ['6º ano A', '6º ano B', '7º ano A', '7º ano B', '8º ano A', '8º ano C', '9º ano B', '9º ano C', '1º EM A', '1º EM B', '2º EM A', '2º EM B', '3º EM A'];

interface NovoAlunoForm { nome: string; ra: string; turma: string; turno: string; responsavel: string; email: string; }

export default function Alunos() {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState<NovoAlunoForm>({ nome: '', ra: '', turma: '', turno: 'Manhã', responsavel: '', email: '' });

  const filtered = ALUNOS.filter(a =>
    a.nome.toLowerCase().includes(search.toLowerCase()) ||
    a.ra.includes(search) ||
    a.turma.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => { setSuccess(false); setShowModal(false); setForm({ nome: '', ra: '', turma: '', turno: 'Manhã', responsavel: '', email: '' }); }, 1500);
  };

  return (
    <div className="space-y-4 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-[#0f172b]">Alunos matriculados</h2>
          <p className="text-xs text-slate-500 mt-0.5">{ALUNOS.length} alunos cadastrados • {ALUNOS.filter(a=>a.status==='Ativo').length} ativos</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2.5 bg-[#0066cc] hover:bg-[#0055b3] text-white text-sm font-bold rounded-xl transition-all active:scale-95 cursor-pointer shadow-sm shadow-blue-500/20">
          <Plus className="w-4 h-4" />
          Novo aluno
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-white border border-[#e2e8f0] rounded-xl px-3 py-2.5 flex-1 max-w-sm shadow-sm">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar por nome, RA ou turma..." className="bg-transparent text-sm text-slate-700 placeholder:text-slate-400 outline-none w-full" />
        </div>
        <button className="flex items-center gap-2 px-3 py-2.5 bg-white border border-[#e2e8f0] rounded-xl text-sm text-slate-600 font-medium hover:bg-slate-50 transition-colors cursor-pointer shadow-sm">
          <Filter className="w-4 h-4 text-slate-400" />
          Filtros
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#e2e8f0] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider px-5 py-3.5">Aluno</th>
                <th className="text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider px-5 py-3.5">RA</th>
                <th className="text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider px-5 py-3.5">Turma</th>
                <th className="text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider px-5 py-3.5">Turno</th>
                <th className="text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider px-5 py-3.5">Responsável</th>
                <th className="text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider px-5 py-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(aluno => (
                <tr key={aluno.id} className="hover:bg-slate-50/50 transition-colors cursor-pointer group">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-[#0066cc]/10 text-[#0066cc] flex items-center justify-center text-xs font-bold shrink-0">
                        {aluno.nome.split(' ').map(n=>n[0]).slice(0,2).join('')}
                      </div>
                      <span className="text-sm font-semibold text-[#0f172b] group-hover:text-[#0066cc] transition-colors">{aluno.nome}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-xs font-mono text-slate-500">{aluno.ra}</td>
                  <td className="px-5 py-3.5 text-sm text-slate-600 font-medium">{aluno.turma}</td>
                  <td className="px-5 py-3.5 text-sm text-slate-500">{aluno.turno}</td>
                  <td className="px-5 py-3.5 text-sm text-slate-500">{aluno.responsavel}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center text-[11px] font-bold px-2.5 py-1 rounded-full border ${aluno.status === 'Ativo' ? 'bg-[#009966]/8 text-[#009966] border-[#009966]/20' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                      {aluno.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <Users className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-500">Nenhum aluno encontrado</p>
            </div>
          )}
        </div>
        <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-400">{filtered.length} resultado{filtered.length !== 1 ? 's' : ''}</p>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:bg-slate-100 cursor-pointer">Anterior</button>
            <button className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#0066cc] text-white cursor-pointer">1</button>
            <button className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:bg-slate-100 cursor-pointer">2</button>
            <button className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:bg-slate-100 cursor-pointer">Próximo</button>
          </div>
        </div>
      </div>

      {/* Modal novo aluno */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-[#e2e8f0]">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-bold text-[#0f172b]">Matricular novo aluno</h3>
              <button onClick={() => setShowModal(false)} className="p-1.5 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            {success ? (
              <div className="py-12 text-center">
                <div className="w-14 h-14 rounded-full bg-[#009966]/10 border border-[#009966]/20 flex items-center justify-center mx-auto mb-3">
                  <Check className="w-7 h-7 text-[#009966] stroke-[2.5]" />
                </div>
                <p className="text-sm font-bold text-[#0f172b]">Aluno matriculado com sucesso!</p>
              </div>
            ) : (
              <form onSubmit={handleSave} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Nome completo</label>
                    <input required value={form.nome} onChange={e => setForm(f=>({...f,nome:e.target.value}))} className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#e2e8f0] rounded-xl text-sm text-[#0f172b] focus:outline-none focus:border-[#0066cc]/50 transition-all" placeholder="Nome do aluno" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">RA</label>
                    <input required value={form.ra} onChange={e => setForm(f=>({...f,ra:e.target.value}))} className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#e2e8f0] rounded-xl text-sm text-[#0f172b] focus:outline-none focus:border-[#0066cc]/50 transition-all font-mono" placeholder="20260000" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Turno</label>
                    <select value={form.turno} onChange={e => setForm(f=>({...f,turno:e.target.value}))} className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#e2e8f0] rounded-xl text-sm text-[#0f172b] focus:outline-none focus:border-[#0066cc]/50 transition-all cursor-pointer">
                      <option>Manhã</option><option>Tarde</option><option>Noite</option>
                    </select>
                  </div>
                  <div className="col-span-2 space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Turma</label>
                    <select required value={form.turma} onChange={e => setForm(f=>({...f,turma:e.target.value}))} className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#e2e8f0] rounded-xl text-sm text-[#0f172b] focus:outline-none focus:border-[#0066cc]/50 transition-all cursor-pointer">
                      <option value="">Selecione a turma</option>
                      {TURMAS_OPTIONS.map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Responsável</label>
                    <input required value={form.responsavel} onChange={e => setForm(f=>({...f,responsavel:e.target.value}))} className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#e2e8f0] rounded-xl text-sm text-[#0f172b] focus:outline-none focus:border-[#0066cc]/50 transition-all" placeholder="Nome do responsável" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">E-mail do responsável</label>
                    <input type="email" value={form.email} onChange={e => setForm(f=>({...f,email:e.target.value}))} className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#e2e8f0] rounded-xl text-sm text-[#0f172b] focus:outline-none focus:border-[#0066cc]/50 transition-all" placeholder="email@exemplo.com" />
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2.5 border border-[#e2e8f0] rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-50 cursor-pointer transition-all">Cancelar</button>
                  <button type="submit" className="flex-1 py-2.5 bg-[#0066cc] hover:bg-[#0055b3] text-white rounded-xl text-sm font-bold cursor-pointer transition-all shadow-sm">Matricular aluno</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
