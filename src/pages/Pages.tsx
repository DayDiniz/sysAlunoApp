import React, { useState } from 'react';
import { Search, Plus, X, Check, GraduationCap, Star } from 'lucide-react';

const PROFESSORES = [
  { id: 1, nome: 'Ana Paula Borges', email: 'ana.borges@escola.edu.br', disciplinas: ['Matemática', 'Física'], turmas: ['6º A', '7º B', '8º A'], turno: 'Manhã', status: 'Ativo' },
  { id: 2, nome: 'Carlos Eduardo Mota', email: 'carlos.mota@escola.edu.br', disciplinas: ['História', 'Geografia'], turmas: ['9º A', '1º EM A'], turno: 'Manhã', status: 'Ativo' },
  { id: 3, nome: 'Fernanda Lins Souza', email: 'fernanda.lins@escola.edu.br', disciplinas: ['Português', 'Literatura'], turmas: ['6º B', '7º A', '8º B'], turno: 'Tarde', status: 'Ativo' },
  { id: 4, nome: 'Marcos Vinicius Teles', email: 'marcos.teles@escola.edu.br', disciplinas: ['Ciências', 'Biologia'], turmas: ['6º A', '9º B', '2º EM A'], turno: 'Manhã', status: 'Ativo' },
  { id: 5, nome: 'Ricardo Almeida Santos', email: 'ricardo.santos@escola.edu.br', disciplinas: ['Inglês'], turmas: [], turno: 'Tarde', status: 'Pendente' },
  { id: 6, nome: 'Juliana Ramos Ferreira', email: 'juliana.ramos@escola.edu.br', disciplinas: ['Artes', 'Ed. Física'], turmas: ['7º B', '8º A'], turno: 'Noite', status: 'Ativo' },
];

export function Professores() {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);

  const filtered = PROFESSORES.filter(p =>
    p.nome.toLowerCase().includes(search.toLowerCase()) ||
    p.disciplinas.some(d => d.toLowerCase().includes(search.toLowerCase()))
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => { setSuccess(false); setShowModal(false); }, 1500);
  };

  return (
    <div className="space-y-4 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-[#0f172b]">Corpo docente</h2>
          <p className="text-xs text-slate-500 mt-0.5">{PROFESSORES.length} professores cadastrados</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2.5 bg-[#0066cc] text-white text-sm font-bold rounded-xl cursor-pointer hover:bg-[#0055b3] transition-all shadow-sm shadow-blue-500/20">
          <Plus className="w-4 h-4" />Novo professor
        </button>
      </div>

      <div className="flex items-center gap-2 bg-white border border-[#e2e8f0] rounded-xl px-3 py-2.5 max-w-sm shadow-sm">
        <Search className="w-4 h-4 text-slate-400 shrink-0" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar professor ou disciplina..." className="bg-transparent text-sm text-slate-700 placeholder:text-slate-400 outline-none w-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(prof => (
          <div key={prof.id} className="bg-white border border-[#e2e8f0] rounded-2xl p-5 shadow-sm hover:border-[#0066cc]/30 transition-colors cursor-pointer group">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#0066cc]/10 text-[#0066cc] flex items-center justify-center text-sm font-bold shrink-0">
                {prof.nome.split(' ').map(n=>n[0]).slice(0,2).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-[#0f172b] group-hover:text-[#0066cc] transition-colors truncate">{prof.nome}</p>
                <p className="text-[11px] text-slate-400 mt-0.5 truncate">{prof.email}</p>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${prof.status === 'Ativo' ? 'bg-[#009966]/8 text-[#009966] border border-[#009966]/20' : 'bg-amber-50 text-amber-600 border border-amber-200/60'}`}>
                {prof.status}
              </span>
            </div>

            <div className="space-y-2.5">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Disciplinas</p>
                <div className="flex flex-wrap gap-1.5">
                  {prof.disciplinas.map(d => (
                    <span key={d} className="text-[11px] font-semibold text-[#0066cc] bg-[#0066cc]/6 border border-[#0066cc]/15 px-2 py-0.5 rounded-lg">{d}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Turmas ({prof.turmas.length})</p>
                {prof.turmas.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {prof.turmas.slice(0,3).map(t => <span key={t} className="text-[11px] text-slate-500 font-mono bg-slate-100 px-2 py-0.5 rounded-lg">{t}</span>)}
                    {prof.turmas.length > 3 && <span className="text-[11px] text-slate-400">+{prof.turmas.length-3}</span>}
                  </div>
                ) : (
                  <span className="text-[11px] text-amber-600 font-medium">Nenhuma turma atribuída</span>
                )}
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
              <span>Turno: {prof.turno}</span>
              <button className="text-[#0066cc] font-bold hover:underline">Ver perfil</button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-[#e2e8f0]">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-bold text-[#0f172b]">Cadastrar professor</h3>
              <button onClick={() => setShowModal(false)} className="p-1.5 bg-slate-100 rounded-full text-slate-500 cursor-pointer"><X className="w-4 h-4" /></button>
            </div>
            {success ? (
              <div className="py-12 text-center">
                <div className="w-14 h-14 rounded-full bg-[#009966]/10 border border-[#009966]/20 flex items-center justify-center mx-auto mb-3">
                  <Check className="w-7 h-7 text-[#009966] stroke-[2.5]" />
                </div>
                <p className="text-sm font-bold text-[#0f172b]">Professor cadastrado!</p>
              </div>
            ) : (
              <form onSubmit={handleSave} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Nome completo</label>
                    <input required className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#e2e8f0] rounded-xl text-sm text-[#0f172b] focus:outline-none focus:border-[#0066cc]/50 transition-all" placeholder="Nome do professor" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">E-mail institucional</label>
                    <input type="email" required className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#e2e8f0] rounded-xl text-sm text-[#0f172b] focus:outline-none focus:border-[#0066cc]/50 transition-all" placeholder="prof@escola.edu.br" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Turno</label>
                    <select className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#e2e8f0] rounded-xl text-sm text-[#0f172b] focus:outline-none cursor-pointer">
                      <option>Manhã</option><option>Tarde</option><option>Noite</option>
                    </select>
                  </div>
                  <div className="col-span-2 space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Disciplinas</label>
                    <input required className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#e2e8f0] rounded-xl text-sm text-[#0f172b] focus:outline-none focus:border-[#0066cc]/50 transition-all" placeholder="Ex: Matemática, Física" />
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2.5 border border-[#e2e8f0] rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-50 cursor-pointer">Cancelar</button>
                  <button type="submit" className="flex-1 py-2.5 bg-[#0066cc] text-white rounded-xl text-sm font-bold cursor-pointer hover:bg-[#0055b3] transition-all">Cadastrar</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── TURMAS ────────────────────────────────────────────────────────────────────
const TURMAS = [
  { id: 1, nome: '6º ano A', nivel: 'Fundamental II', turno: 'Manhã', alunos: 32, sala: 'Sala 01', vagas: 35, professores: 8, status: 'Completa' },
  { id: 2, nome: '6º ano B', nivel: 'Fundamental II', turno: 'Tarde', alunos: 29, sala: 'Sala 02', vagas: 35, professores: 7, status: 'Incompleta' },
  { id: 3, nome: '7º ano A', nivel: 'Fundamental II', turno: 'Manhã', alunos: 34, sala: 'Sala 03', vagas: 35, professores: 9, status: 'Completa' },
  { id: 4, nome: '8º ano A', nivel: 'Fundamental II', turno: 'Manhã', alunos: 31, sala: 'Sala 05', vagas: 35, professores: 8, status: 'Completa' },
  { id: 5, nome: '9º ano B', nivel: 'Fundamental II', turno: 'Tarde', alunos: 28, sala: 'Sala 07', vagas: 35, professores: 6, status: 'Incompleta' },
  { id: 6, nome: '1º EM A', nivel: 'Ensino Médio', turno: 'Manhã', alunos: 38, sala: 'Sala 10', vagas: 40, professores: 11, status: 'Completa' },
  { id: 7, nome: '2º EM B', nivel: 'Ensino Médio', turno: 'Noite', alunos: 35, sala: 'Sala 12', vagas: 40, professores: 10, status: 'Completa' },
  { id: 8, nome: '3º EM A', nivel: 'Ensino Médio', turno: 'Manhã', alunos: 33, sala: 'Sala 11', vagas: 40, professores: 11, status: 'Completa' },
];

export function Turmas() {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);

  const filtered = TURMAS.filter(t => t.nome.toLowerCase().includes(search.toLowerCase()) || t.nivel.toLowerCase().includes(search.toLowerCase()));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => { setSuccess(false); setShowModal(false); }, 1500);
  };

  const nivelColor: Record<string, string> = {
    'Fundamental II': 'bg-[#0066cc]/8 text-[#0066cc] border-[#0066cc]/20',
    'Ensino Médio': 'bg-purple-50 text-purple-600 border-purple-200/60',
  };

  return (
    <div className="space-y-4 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-[#0f172b]">Turmas</h2>
          <p className="text-xs text-slate-500 mt-0.5">{TURMAS.length} turmas abertas em 2026</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2.5 bg-[#0066cc] text-white text-sm font-bold rounded-xl cursor-pointer hover:bg-[#0055b3] transition-all shadow-sm shadow-blue-500/20">
          <Plus className="w-4 h-4" />Nova turma
        </button>
      </div>

      <div className="flex items-center gap-2 bg-white border border-[#e2e8f0] rounded-xl px-3 py-2.5 max-w-sm shadow-sm">
        <Search className="w-4 h-4 text-slate-400 shrink-0" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar turma..." className="bg-transparent text-sm text-slate-700 placeholder:text-slate-400 outline-none w-full" />
      </div>

      <div className="bg-white border border-[#e2e8f0] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                {['Turma','Nível','Turno','Sala','Alunos','Professores','Status'].map(h => (
                  <th key={h} className="text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider px-5 py-3.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(turma => (
                <tr key={turma.id} className="hover:bg-slate-50/50 transition-colors cursor-pointer">
                  <td className="px-5 py-3.5 text-sm font-bold text-[#0f172b]">{turma.nome}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${nivelColor[turma.nivel]}`}>{turma.nivel}</span>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-slate-500">{turma.turno}</td>
                  <td className="px-5 py-3.5 text-sm font-mono text-slate-400">{turma.sala}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 max-w-[80px] h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#0066cc] rounded-full" style={{ width: `${(turma.alunos/turma.vagas)*100}%` }} />
                      </div>
                      <span className="text-xs font-mono text-slate-500">{turma.alunos}/{turma.vagas}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-slate-500">{turma.professores} docentes</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${turma.status === 'Completa' ? 'bg-[#009966]/8 text-[#009966] border-[#009966]/20' : 'bg-amber-50 text-amber-600 border-amber-200/60'}`}>
                      {turma.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-[#e2e8f0]">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-bold text-[#0f172b]">Criar nova turma</h3>
              <button onClick={() => setShowModal(false)} className="p-1.5 bg-slate-100 rounded-full text-slate-500 cursor-pointer"><X className="w-4 h-4" /></button>
            </div>
            {success ? (
              <div className="py-12 text-center">
                <div className="w-14 h-14 rounded-full bg-[#009966]/10 border border-[#009966]/20 flex items-center justify-center mx-auto mb-3">
                  <Check className="w-7 h-7 text-[#009966] stroke-[2.5]" />
                </div>
                <p className="text-sm font-bold text-[#0f172b]">Turma criada com sucesso!</p>
              </div>
            ) : (
              <form onSubmit={handleSave} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Nome da turma</label>
                    <input required className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#e2e8f0] rounded-xl text-sm focus:outline-none focus:border-[#0066cc]/50" placeholder="Ex: 6º ano A" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Nível</label>
                    <select className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#e2e8f0] rounded-xl text-sm focus:outline-none cursor-pointer">
                      <option>Fundamental I</option><option>Fundamental II</option><option>Ensino Médio</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Turno</label>
                    <select className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#e2e8f0] rounded-xl text-sm focus:outline-none cursor-pointer">
                      <option>Manhã</option><option>Tarde</option><option>Noite</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Vagas</label>
                    <input type="number" required className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#e2e8f0] rounded-xl text-sm focus:outline-none focus:border-[#0066cc]/50" placeholder="35" />
                  </div>
                  <div className="col-span-2 space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Sala</label>
                    <input required className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#e2e8f0] rounded-xl text-sm focus:outline-none focus:border-[#0066cc]/50" placeholder="Ex: Sala 01" />
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2.5 border border-[#e2e8f0] rounded-xl text-sm font-bold text-slate-500 cursor-pointer">Cancelar</button>
                  <button type="submit" className="flex-1 py-2.5 bg-[#0066cc] text-white rounded-xl text-sm font-bold cursor-pointer hover:bg-[#0055b3]">Criar turma</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── GRADE ─────────────────────────────────────────────────────────────────────
const DIAS = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
const HORARIOS = ['07:00 - 07:50', '07:50 - 08:40', '08:40 - 09:30', '09:50 - 10:40', '10:40 - 11:30', '11:30 - 12:20'];
const AULAS: Record<string, Record<string, { disciplina: string; professor: string; cor: string } | null>> = {
  'Segunda': {
    '07:00 - 07:50': { disciplina: 'Matemática', professor: 'Ana Borges', cor: 'bg-[#0066cc]/10 text-[#0066cc] border-[#0066cc]/20' },
    '07:50 - 08:40': { disciplina: 'Matemática', professor: 'Ana Borges', cor: 'bg-[#0066cc]/10 text-[#0066cc] border-[#0066cc]/20' },
    '08:40 - 09:30': { disciplina: 'Português', professor: 'Fernanda Lins', cor: 'bg-purple-50 text-purple-600 border-purple-200/60' },
    '09:50 - 10:40': { disciplina: 'Ciências', professor: 'Marcos Teles', cor: 'bg-[#009966]/10 text-[#009966] border-[#009966]/20' },
    '10:40 - 11:30': { disciplina: 'Inglês', professor: '', cor: 'bg-amber-50 text-amber-600 border-amber-200/60' },
    '11:30 - 12:20': { disciplina: 'Ed. Física', professor: 'Juliana Ramos', cor: 'bg-orange-50 text-orange-600 border-orange-200/60' },
  },
  'Terça': {
    '07:00 - 07:50': { disciplina: 'História', professor: 'Carlos Mota', cor: 'bg-rose-50 text-rose-600 border-rose-200/60' },
    '07:50 - 08:40': { disciplina: 'Geografia', professor: 'Carlos Mota', cor: 'bg-rose-50 text-rose-600 border-rose-200/60' },
    '08:40 - 09:30': { disciplina: 'Matemática', professor: 'Ana Borges', cor: 'bg-[#0066cc]/10 text-[#0066cc] border-[#0066cc]/20' },
    '09:50 - 10:40': { disciplina: 'Português', professor: 'Fernanda Lins', cor: 'bg-purple-50 text-purple-600 border-purple-200/60' },
    '10:40 - 11:30': { disciplina: 'Português', professor: 'Fernanda Lins', cor: 'bg-purple-50 text-purple-600 border-purple-200/60' },
    '11:30 - 12:20': { disciplina: 'Artes', professor: 'Juliana Ramos', cor: 'bg-pink-50 text-pink-600 border-pink-200/60' },
  },
  'Quarta': {
    '07:00 - 07:50': { disciplina: 'Ciências', professor: 'Marcos Teles', cor: 'bg-[#009966]/10 text-[#009966] border-[#009966]/20' },
    '07:50 - 08:40': { disciplina: 'Matemática', professor: 'Ana Borges', cor: 'bg-[#0066cc]/10 text-[#0066cc] border-[#0066cc]/20' },
    '08:40 - 09:30': { disciplina: 'Inglês', professor: '', cor: 'bg-amber-50 text-amber-600 border-amber-200/60' },
    '09:50 - 10:40': { disciplina: 'História', professor: 'Carlos Mota', cor: 'bg-rose-50 text-rose-600 border-rose-200/60' },
    '10:40 - 11:30': { disciplina: 'Ed. Física', professor: 'Juliana Ramos', cor: 'bg-orange-50 text-orange-600 border-orange-200/60' },
    '11:30 - 12:20': null,
  },
  'Quinta': {
    '07:00 - 07:50': { disciplina: 'Português', professor: 'Fernanda Lins', cor: 'bg-purple-50 text-purple-600 border-purple-200/60' },
    '07:50 - 08:40': { disciplina: 'Geografia', professor: 'Carlos Mota', cor: 'bg-rose-50 text-rose-600 border-rose-200/60' },
    '08:40 - 09:30': { disciplina: 'Matemática', professor: 'Ana Borges', cor: 'bg-[#0066cc]/10 text-[#0066cc] border-[#0066cc]/20' },
    '09:50 - 10:40': { disciplina: 'Ciências', professor: 'Marcos Teles', cor: 'bg-[#009966]/10 text-[#009966] border-[#009966]/20' },
    '10:40 - 11:30': { disciplina: 'Artes', professor: 'Juliana Ramos', cor: 'bg-pink-50 text-pink-600 border-pink-200/60' },
    '11:30 - 12:20': null,
  },
  'Sexta': {
    '07:00 - 07:50': { disciplina: 'Inglês', professor: '', cor: 'bg-amber-50 text-amber-600 border-amber-200/60' },
    '07:50 - 08:40': { disciplina: 'Português', professor: 'Fernanda Lins', cor: 'bg-purple-50 text-purple-600 border-purple-200/60' },
    '08:40 - 09:30': { disciplina: 'História', professor: 'Carlos Mota', cor: 'bg-rose-50 text-rose-600 border-rose-200/60' },
    '09:50 - 10:40': { disciplina: 'Matemática', professor: 'Ana Borges', cor: 'bg-[#0066cc]/10 text-[#0066cc] border-[#0066cc]/20' },
    '10:40 - 11:30': { disciplina: 'Ciências', professor: 'Marcos Teles', cor: 'bg-[#009966]/10 text-[#009966] border-[#009966]/20' },
    '11:30 - 12:20': { disciplina: 'Ed. Física', professor: 'Juliana Ramos', cor: 'bg-orange-50 text-orange-600 border-orange-200/60' },
  },
};

export function Grade() {
  const [turmaSel, setTurmaSel] = useState('6º ano A');

  return (
    <div className="space-y-4 max-w-7xl">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-base font-bold text-[#0f172b]">Grade Horária</h2>
          <p className="text-xs text-slate-500 mt-0.5">Visualize e monte a grade por turma</p>
        </div>
        <div className="flex items-center gap-3">
          <select value={turmaSel} onChange={e => setTurmaSel(e.target.value)} className="px-3.5 py-2.5 bg-white border border-[#e2e8f0] rounded-xl text-sm font-semibold text-[#0f172b] focus:outline-none cursor-pointer shadow-sm">
            {['6º ano A','6º ano B','7º ano A','7º ano B','8º ano A','9º ano B','1º EM A','2º EM B','3º EM A'].map(t => <option key={t}>{t}</option>)}
          </select>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#0066cc] text-white text-sm font-bold rounded-xl cursor-pointer hover:bg-[#0055b3] shadow-sm shadow-blue-500/20">
            <Plus className="w-4 h-4" />Adicionar aula
          </button>
        </div>
      </div>

      <div className="bg-white border border-[#e2e8f0] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider px-4 py-3.5 w-32">Horário</th>
                {DIAS.map(d => <th key={d} className="text-center text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 py-3.5">{d}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {HORARIOS.map((hora, hi) => (
                <React.Fragment key={hora}>
                  {hi === 3 && (
                    <tr className="bg-slate-50/80">
                      <td colSpan={6} className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Intervalo — 09:30 a 09:50</td>
                    </tr>
                  )}
                  <tr className="hover:bg-slate-50/30 transition-colors">
                    <td className="px-4 py-3 text-[11px] font-mono text-slate-400 font-medium whitespace-nowrap">{hora}</td>
                    {DIAS.map(dia => {
                      const aula = AULAS[dia]?.[hora];
                      return (
                        <td key={dia} className="px-2 py-2">
                          {aula ? (
                            <div className={`border rounded-xl p-2.5 text-center cursor-pointer hover:shadow-sm transition-all ${aula.cor}`}>
                              <p className="text-[11px] font-bold leading-none">{aula.disciplina}</p>
                              {aula.professor ? (
                                <p className="text-[9px] mt-1 opacity-70 font-medium leading-none">{aula.professor.split(' ')[0]}</p>
                              ) : (
                                <p className="text-[9px] mt-1 font-bold leading-none">sem prof.</p>
                              )}
                            </div>
                          ) : (
                            <div className="border border-dashed border-slate-200 rounded-xl p-2.5 text-center cursor-pointer hover:border-[#0066cc]/40 hover:bg-[#0066cc]/3 transition-all group">
                              <Plus className="w-3 h-3 text-slate-300 group-hover:text-[#0066cc] mx-auto transition-colors" />
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-slate-100 flex items-center gap-4 flex-wrap">
          {[
            { label: 'Com professor', cor: 'bg-[#009966]' },
            { label: 'Sem professor', cor: 'bg-amber-400' },
            { label: 'Vazio', cor: 'bg-slate-200 border border-dashed border-slate-300' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div className={`w-3 h-3 rounded ${item.cor}`} />
              <span className="text-[10px] text-slate-500 font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ESPAÇOS ────────────────────────────────────────────────────────────────────
const ESPACOS = [
  { id: 1, nome: 'Sala 01', tipo: 'Sala de Aula', capacidade: 35, turma: '6º ano A', turno: 'Manhã', status: 'Ocupado' },
  { id: 2, nome: 'Sala 02', tipo: 'Sala de Aula', capacidade: 35, turma: '6º ano B', turno: 'Tarde', status: 'Ocupado' },
  { id: 3, nome: 'Sala 03', tipo: 'Sala de Aula', capacidade: 35, turma: '7º ano A', turno: 'Manhã', status: 'Ocupado' },
  { id: 4, nome: 'Sala 04', tipo: 'Sala de Aula', capacidade: 35, turma: '', turno: '', status: 'Disponível' },
  { id: 5, nome: 'Lab. Informática', tipo: 'Laboratório', capacidade: 30, turma: '', turno: '', status: 'Manutenção' },
  { id: 6, nome: 'Lab. Ciências', tipo: 'Laboratório', capacidade: 25, turma: '', turno: '', status: 'Disponível' },
  { id: 7, nome: 'Quadra Esportiva', tipo: 'Quadra', capacidade: 80, turma: 'Uso compartilhado', turno: 'Manhã/Tarde', status: 'Ocupado' },
  { id: 8, nome: 'Auditório', tipo: 'Auditório', capacidade: 200, turma: '', turno: '', status: 'Disponível' },
  { id: 9, nome: 'Sala de Artes', tipo: 'Laboratório', capacidade: 28, turma: '7º ano B', turno: 'Tarde', status: 'Ocupado' },
  { id: 10, nome: 'Biblioteca', tipo: 'Biblioteca', capacidade: 50, turma: 'Uso livre', turno: 'Manhã/Tarde', status: 'Disponível' },
];

export function Espacos() {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);

  const filtered = ESPACOS.filter(e =>
    e.nome.toLowerCase().includes(search.toLowerCase()) ||
    e.tipo.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => { setSuccess(false); setShowModal(false); }, 1500);
  };

  const statusColor: Record<string, string> = {
    'Disponível': 'bg-[#009966]/8 text-[#009966] border-[#009966]/20',
    'Ocupado': 'bg-[#0066cc]/8 text-[#0066cc] border-[#0066cc]/20',
    'Manutenção': 'bg-[#e7000b]/8 text-[#e7000b] border-[#e7000b]/20',
  };

  const counts = { disponivel: ESPACOS.filter(e=>e.status==='Disponível').length, ocupado: ESPACOS.filter(e=>e.status==='Ocupado').length, manutencao: ESPACOS.filter(e=>e.status==='Manutenção').length };

  return (
    <div className="space-y-4 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-[#0f172b]">Espaços físicos</h2>
          <p className="text-xs text-slate-500 mt-0.5">{ESPACOS.length} espaços cadastrados</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2.5 bg-[#0066cc] text-white text-sm font-bold rounded-xl cursor-pointer hover:bg-[#0055b3] shadow-sm shadow-blue-500/20">
          <Plus className="w-4 h-4" />Novo espaço
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Disponíveis', value: counts.disponivel, color: 'text-[#009966]', bg: 'bg-[#009966]/8 border-[#009966]/20' },
          { label: 'Ocupados', value: counts.ocupado, color: 'text-[#0066cc]', bg: 'bg-[#0066cc]/8 border-[#0066cc]/20' },
          { label: 'Manutenção', value: counts.manutencao, color: 'text-[#e7000b]', bg: 'bg-[#e7000b]/8 border-[#e7000b]/20' },
        ].map(s => (
          <div key={s.label} className={`rounded-2xl border p-4 ${s.bg}`}>
            <p className={`text-2xl font-extrabold ${s.color}`}>{s.value}</p>
            <p className={`text-xs font-bold mt-0.5 ${s.color} opacity-70`}>{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 bg-white border border-[#e2e8f0] rounded-xl px-3 py-2.5 max-w-sm shadow-sm">
        <Search className="w-4 h-4 text-slate-400 shrink-0" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar espaço..." className="bg-transparent text-sm text-slate-700 placeholder:text-slate-400 outline-none w-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(espaco => (
          <div key={espaco.id} className="bg-white border border-[#e2e8f0] rounded-2xl p-5 shadow-sm hover:border-[#0066cc]/30 transition-colors cursor-pointer">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="text-sm font-bold text-[#0f172b]">{espaco.nome}</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">{espaco.tipo}</p>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusColor[espaco.status]}`}>{espaco.status}</span>
            </div>
            <div className="space-y-1.5 text-[11px] text-slate-500">
              <div className="flex items-center justify-between">
                <span>Capacidade</span>
                <span className="font-bold text-[#0f172b]">{espaco.capacidade} pessoas</span>
              </div>
              {espaco.turma && (
                <div className="flex items-center justify-between">
                  <span>Turma atual</span>
                  <span className="font-bold text-[#0066cc]">{espaco.turma}</span>
                </div>
              )}
              {espaco.turno && (
                <div className="flex items-center justify-between">
                  <span>Turno</span>
                  <span className="font-medium">{espaco.turno}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-[#e2e8f0]">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-bold text-[#0f172b]">Cadastrar espaço físico</h3>
              <button onClick={() => setShowModal(false)} className="p-1.5 bg-slate-100 rounded-full text-slate-500 cursor-pointer"><X className="w-4 h-4" /></button>
            </div>
            {success ? (
              <div className="py-12 text-center">
                <div className="w-14 h-14 rounded-full bg-[#009966]/10 border border-[#009966]/20 flex items-center justify-center mx-auto mb-3">
                  <Check className="w-7 h-7 text-[#009966] stroke-[2.5]" />
                </div>
                <p className="text-sm font-bold text-[#0f172b]">Espaço cadastrado!</p>
              </div>
            ) : (
              <form onSubmit={handleSave} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Nome</label>
                    <input required className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#e2e8f0] rounded-xl text-sm focus:outline-none focus:border-[#0066cc]/50" placeholder="Ex: Sala 15" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Tipo</label>
                    <select className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#e2e8f0] rounded-xl text-sm focus:outline-none cursor-pointer">
                      <option>Sala de Aula</option><option>Laboratório</option><option>Quadra</option><option>Auditório</option><option>Biblioteca</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Capacidade</label>
                    <input type="number" required className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#e2e8f0] rounded-xl text-sm focus:outline-none focus:border-[#0066cc]/50" placeholder="35" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Status</label>
                    <select className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#e2e8f0] rounded-xl text-sm focus:outline-none cursor-pointer">
                      <option>Disponível</option><option>Ocupado</option><option>Manutenção</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2.5 border border-[#e2e8f0] rounded-xl text-sm font-bold text-slate-500 cursor-pointer">Cancelar</button>
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
