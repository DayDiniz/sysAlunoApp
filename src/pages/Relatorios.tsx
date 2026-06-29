import React, { useState } from 'react';
import { Search, ChevronDown, FileText, Users, GraduationCap, BookOpen, ArrowRight, Check, AlertTriangle, X, ChevronRight, Award, Calendar, BarChart2 } from 'lucide-react';

const ANOS = [2026, 2025, 2024, 2023];
const ANO_ATUAL = 2026;

// ── Dados históricos simulados ──────────────────────────────────────────────
const HISTORICO_ESCOLA: Record<number, { turmas: number; alunos: number; professores: number; disciplinas: string[] }> = {
  2026: { turmas: 42, alunos: 1247, professores: 84, disciplinas: ['Matemática','Português','Ciências','História','Geografia','Inglês','Artes','Ed. Física','Física','Química','Biologia'] },
  2025: { turmas: 39, alunos: 1184, professores: 78, disciplinas: ['Matemática','Português','Ciências','História','Geografia','Inglês','Artes','Ed. Física','Física','Química'] },
  2024: { turmas: 36, alunos: 1102, professores: 71, disciplinas: ['Matemática','Português','Ciências','História','Geografia','Inglês','Artes','Ed. Física'] },
  2023: { turmas: 34, alunos: 1043, professores: 68, disciplinas: ['Matemática','Português','Ciências','História','Geografia','Inglês','Ed. Física'] },
};

const TURMAS_POR_ANO: Record<number, { nome: string; professor: string; disciplina: string; alunos: number }[]> = {
  2026: [
    { nome: '6º ano A', professor: 'Ana Borges', disciplina: 'Matemática', alunos: 32 },
    { nome: '7º ano B', professor: 'Fernanda Lins', disciplina: 'Português', alunos: 29 },
    { nome: '8º ano A', professor: 'Marcos Teles', disciplina: 'Ciências', alunos: 31 },
    { nome: '1º EM A', professor: 'Carlos Mota', disciplina: 'História', alunos: 38 },
  ],
  2025: [
    { nome: '5º ano A', professor: 'Ana Borges', disciplina: 'Matemática', alunos: 30 },
    { nome: '6º ano B', professor: 'Fernanda Lins', disciplina: 'Português', alunos: 28 },
    { nome: '7º ano A', professor: 'Marcos Teles', disciplina: 'Ciências', alunos: 33 },
  ],
  2024: [
    { nome: '4º ano A', professor: 'Ana Borges', disciplina: 'Matemática', alunos: 29 },
    { nome: '5º ano B', professor: 'Fernanda Lins', disciplina: 'Português', alunos: 27 },
  ],
  2023: [
    { nome: '3º ano A', professor: 'Ana Borges', disciplina: 'Matemática', alunos: 28 },
  ],
};

const ALUNOS_BUSCA = [
  { id: 1, nome: 'Ana Beatriz Souza', ra: '20260001', historico: [
    { ano: 2026, turma: '6º ano A', media: 8.7, frequencia: 94, professor: 'Ana Borges', status: 'Em curso' },
    { ano: 2025, turma: '5º ano A', media: 9.1, frequencia: 97, professor: 'Fernanda Lins', status: 'Aprovado' },
    { ano: 2024, turma: '4º ano A', media: 8.4, frequencia: 92, professor: 'Carlos Mota', status: 'Aprovado' },
    { ano: 2023, turma: '3º ano A', media: 7.8, frequencia: 89, professor: 'Marcos Teles', status: 'Aprovado' },
  ]},
  { id: 2, nome: 'Bruno Carvalho Lima', ra: '20260002', historico: [
    { ano: 2026, turma: '7º ano B', media: 7.4, frequencia: 88, professor: 'Carlos Mota', status: 'Em curso' },
    { ano: 2025, turma: '6º ano B', media: 7.9, frequencia: 91, professor: 'Ana Borges', status: 'Aprovado' },
    { ano: 2024, turma: '5º ano A', media: 6.8, frequencia: 85, professor: 'Fernanda Lins', status: 'Aprovado' },
  ]},
  { id: 3, nome: 'Carla Fernanda Rocha', ra: '20260003', historico: [
    { ano: 2026, turma: '8º ano A', media: 9.3, frequencia: 98, professor: 'Marcos Teles', status: 'Em curso' },
    { ano: 2025, turma: '7º ano A', media: 9.0, frequencia: 96, professor: 'Carlos Mota', status: 'Aprovado' },
  ]},
];

// ── Wizard de Virada de Ano ──────────────────────────────────────────────────
const ALUNOS_PROMOCAO = [
  { id: 1, nome: 'Ana Beatriz Souza', turmaAtual: '6º ano A', turmaProxima: '7º ano A', status: 'Promovido' },
  { id: 2, nome: 'Bruno Carvalho Lima', turmaAtual: '7º ano B', turmaProxima: '8º ano B', status: 'Promovido' },
  { id: 3, nome: 'Carla Fernanda Rocha', turmaAtual: '8º ano A', turmaProxima: '9º ano A', status: 'Promovido' },
  { id: 4, nome: 'Diego Martins Alves', turmaAtual: '9º ano C', turmaProxima: '1º EM C', status: 'Retido' },
  { id: 5, nome: 'Eduarda Pinto Costa', turmaAtual: '1º EM A', turmaProxima: '2º EM A', status: 'Promovido' },
];

const TURMAS_REAPROVEITAMENTO = [
  { nome: '7º ano A', sala: 'Sala 03', vagas: 35, turno: 'Manhã', origem: '6º ano A — 2026' },
  { nome: '8º ano B', sala: 'Sala 06', vagas: 35, turno: 'Manhã', origem: '7º ano B — 2026' },
  { nome: '9º ano A', sala: 'Sala 08', vagas: 35, turno: 'Tarde', origem: '8º ano A — 2026' },
  { nome: '1º EM C', sala: 'Sala 10', vagas: 40, turno: 'Noite', origem: '9º ano C — 2026' },
];

const DOCENTES_PREENCHIDOS = [
  { professor: 'Ana Borges', disciplina: 'Matemática', turma: '7º ano A', turnoAnterior: 'Manhã' },
  { professor: 'Fernanda Lins', disciplina: 'Português', turma: '8º ano B', turnoAnterior: 'Manhã' },
  { professor: 'Marcos Teles', disciplina: 'Ciências', turma: '9º ano A', turnoAnterior: 'Tarde' },
  { professor: 'Carlos Mota', disciplina: 'História', turma: '1º EM C', turnoAnterior: 'Noite' },
];

function WizardVirada({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [alunos, setAlunos] = useState(ALUNOS_PROMOCAO.map(a => ({ ...a })));
  const [concluido, setConcluido] = useState(false);

  const toggleStatus = (id: number) => {
    setAlunos(prev => prev.map(a => a.id === id ? { ...a, status: a.status === 'Promovido' ? 'Retido' : 'Promovido' } : a));
  };

  if (concluido) return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-[#e2e8f0] p-10 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#009966]/10 border border-[#009966]/20 flex items-center justify-center mx-auto">
          <Check className="w-8 h-8 text-[#009966] stroke-[2.5]" />
        </div>
        <h3 className="text-lg font-bold text-[#0f172b]">Ano letivo 2027 iniciado!</h3>
        <p className="text-sm text-slate-500">O ano 2026 foi arquivado. Todas as turmas, alunos e docentes foram migrados com sucesso.</p>
        <button onClick={onClose} className="w-full py-3 bg-[#0066cc] text-white font-bold rounded-xl cursor-pointer hover:bg-[#0055b3] transition-all">
          Ir para o painel 2027
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-[#e2e8f0] max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div>
            <h3 className="text-base font-bold text-[#0f172b]">Virada de Ano Letivo — 2026 → 2027</h3>
            <p className="text-xs text-slate-500 mt-0.5">Etapa {step} de 3</p>
          </div>
          <button onClick={onClose} className="p-1.5 bg-slate-100 rounded-full text-slate-500 cursor-pointer hover:bg-slate-200">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress */}
        <div className="px-6 pt-4 shrink-0">
          <div className="flex items-center gap-2">
            {['Promoção de alunos', 'Reaproveitamento de turmas', 'Atribuição docente'].map((label, i) => {
              const num = i + 1;
              const done = step > num;
              const active = step === num;
              return (
                <React.Fragment key={i}>
                  <div className="flex items-center gap-2 shrink-0">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${done ? 'bg-[#009966] border-[#009966] text-white' : active ? 'border-[#0066cc] text-[#0066cc] bg-white' : 'border-slate-200 text-slate-400 bg-white'}`}>
                      {done ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : num}
                    </div>
                    <span className={`text-xs font-semibold hidden sm:block ${active ? 'text-[#0f172b]' : done ? 'text-[#009966]' : 'text-slate-400'}`}>{label}</span>
                  </div>
                  {i < 2 && <div className={`flex-1 h-0.5 rounded-full transition-all ${done ? 'bg-[#009966]' : 'bg-slate-200'}`} />}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {step === 1 && (
            <>
              <p className="text-xs text-slate-500 mb-3">O sistema sugeriu as promoções com base nas notas finais. Revise e ajuste se necessário.</p>
              {alunos.map(aluno => (
                <div key={aluno.id} className="flex items-center gap-3 p-3.5 rounded-xl border border-[#e2e8f0] bg-slate-50/50">
                  <div className="w-8 h-8 rounded-xl bg-[#0066cc]/10 text-[#0066cc] flex items-center justify-center text-xs font-bold shrink-0">
                    {aluno.nome.split(' ').map((n:string)=>n[0]).slice(0,2).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-[#0f172b] truncate">{aluno.nome}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {aluno.turmaAtual} <ArrowRight className="w-3 h-3 inline mx-0.5" /> {aluno.status === 'Promovido' ? aluno.turmaProxima : <span className="text-amber-600 font-bold">Retido em {aluno.turmaAtual}</span>}
                    </p>
                  </div>
                  <button onClick={() => toggleStatus(aluno.id)} className={`text-[11px] font-bold px-3 py-1.5 rounded-full border cursor-pointer transition-all ${aluno.status === 'Promovido' ? 'bg-[#009966]/8 text-[#009966] border-[#009966]/20 hover:bg-[#009966]/15' : 'bg-amber-50 text-amber-600 border-amber-200/60 hover:bg-amber-100'}`}>
                    {aluno.status}
                  </button>
                </div>
              ))}
            </>
          )}

          {step === 2 && (
            <>
              <p className="text-xs text-slate-500 mb-3">Turmas reaproveitadas do ano anterior. Ajuste salas e vagas se necessário.</p>
              {TURMAS_REAPROVEITAMENTO.map((turma, i) => (
                <div key={i} className="p-4 rounded-xl border border-[#e2e8f0] bg-slate-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-[#0f172b]">{turma.nome}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Origem: {turma.origem}</p>
                    </div>
                    <span className="text-[10px] font-bold text-[#0066cc] bg-[#0066cc]/8 px-2 py-0.5 rounded-full border border-[#0066cc]/20">Pré-preenchido</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Sala</label>
                      <input defaultValue={turma.sala} className="w-full px-2.5 py-1.5 bg-white border border-[#e2e8f0] rounded-lg text-xs text-[#0f172b] focus:outline-none focus:border-[#0066cc]/50" />
                    </div>
                    <div>
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Vagas</label>
                      <input type="number" defaultValue={turma.vagas} className="w-full px-2.5 py-1.5 bg-white border border-[#e2e8f0] rounded-lg text-xs text-[#0f172b] focus:outline-none focus:border-[#0066cc]/50" />
                    </div>
                    <div>
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Turno</label>
                      <select defaultValue={turma.turno} className="w-full px-2.5 py-1.5 bg-white border border-[#e2e8f0] rounded-lg text-xs text-[#0f172b] focus:outline-none cursor-pointer">
                        <option>Manhã</option><option>Tarde</option><option>Noite</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          {step === 3 && (
            <>
              <p className="text-xs text-slate-500 mb-3">Atribuições docentes do ano anterior pré-preenchidas. Edite onde necessário.</p>
              {DOCENTES_PREENCHIDOS.map((doc, i) => (
                <div key={i} className="p-4 rounded-xl border border-[#e2e8f0] bg-slate-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#0066cc]/10 text-[#0066cc] flex items-center justify-center text-xs font-bold">
                        {doc.professor.split(' ').map((n:string)=>n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#0f172b]">{doc.professor}</p>
                        <p className="text-[10px] text-slate-400">{doc.disciplina}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-[#0066cc] bg-[#0066cc]/8 px-2 py-0.5 rounded-full border border-[#0066cc]/20">Pré-preenchido</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Turma</label>
                      <input defaultValue={doc.turma} className="w-full px-2.5 py-1.5 bg-white border border-[#e2e8f0] rounded-lg text-xs text-[#0f172b] focus:outline-none focus:border-[#0066cc]/50" />
                    </div>
                    <div>
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Turno</label>
                      <select defaultValue={doc.turnoAnterior} className="w-full px-2.5 py-1.5 bg-white border border-[#e2e8f0] rounded-lg text-xs text-[#0f172b] focus:outline-none cursor-pointer">
                        <option>Manhã</option><option>Tarde</option><option>Noite</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between shrink-0">
          <button onClick={() => step > 1 ? setStep(s => s - 1) : onClose()} className="px-4 py-2.5 border border-[#e2e8f0] rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-50 cursor-pointer transition-all">
            {step === 1 ? 'Cancelar' : '← Voltar'}
          </button>
          <button
            onClick={() => step < 3 ? setStep(s => s + 1) : setConcluido(true)}
            className="px-6 py-2.5 bg-[#0066cc] hover:bg-[#0055b3] text-white rounded-xl text-sm font-bold cursor-pointer transition-all shadow-sm flex items-center gap-2"
          >
            {step === 3 ? <><Check className="w-4 h-4 stroke-[3]" />Confirmar e iniciar 2027</> : <>Próxima etapa <ChevronRight className="w-4 h-4" /></>}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Tela principal ─────────────────────────────────────────────────────────────
export default function Relatorios() {
  const [anoSel, setAnoSel] = useState(ANO_ATUAL);
  const [showAnos, setShowAnos] = useState(false);
  const [showWizard, setShowWizard] = useState(false);
  const [searchAluno, setSearchAluno] = useState('');
  const [alunoSel, setAlunoSel] = useState<typeof ALUNOS_BUSCA[0] | null>(null);
  const [activeTab, setActiveTab] = useState<'escola' | 'aluno'>('escola');

  const isHistorico = anoSel !== ANO_ATUAL;
  const dados = HISTORICO_ESCOLA[anoSel];
  const turmas = TURMAS_POR_ANO[anoSel] || [];
  const alunosFiltrados = ALUNOS_BUSCA.filter(a => a.nome.toLowerCase().includes(searchAluno.toLowerCase()) || a.ra.includes(searchAluno));

  return (
    <div className="space-y-5 max-w-7xl">
      {showWizard && <WizardVirada onClose={() => setShowWizard(false)} />}

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-base font-bold text-[#0f172b]">Relatórios e Ano Letivo</h2>
          <p className="text-xs text-slate-500 mt-0.5">Histórico escolar, relatórios e gestão de anos letivos</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Seletor de ano */}
          <div className="relative">
            <button
              onClick={() => setShowAnos(v => !v)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#e2e8f0] rounded-xl text-sm font-bold text-[#0f172b] hover:bg-slate-50 cursor-pointer transition-all shadow-sm"
            >
              <Calendar className="w-4 h-4 text-[#0066cc]" />
              {anoSel}
              {anoSel === ANO_ATUAL && <span className="text-[9px] font-bold text-[#009966] bg-[#009966]/10 px-1.5 py-0.5 rounded-full border border-[#009966]/20">Atual</span>}
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showAnos && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-[#e2e8f0] rounded-2xl shadow-lg py-2 z-30">
                {ANOS.map(ano => (
                  <button
                    key={ano}
                    onClick={() => { setAnoSel(ano); setShowAnos(false); setAlunoSel(null); }}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-semibold hover:bg-slate-50 cursor-pointer transition-colors ${anoSel === ano ? 'text-[#0066cc]' : 'text-slate-700'}`}
                  >
                    <span>{ano}</span>
                    <div className="flex items-center gap-1.5">
                      {ano === ANO_ATUAL && <span className="text-[9px] font-bold text-[#009966] bg-[#009966]/10 px-1.5 py-0.5 rounded-full">Atual</span>}
                      {ano !== ANO_ATUAL && <span className="text-[9px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full">Arquivo</span>}
                      {anoSel === ano && <Check className="w-3.5 h-3.5 text-[#0066cc]" />}
                    </div>
                  </button>
                ))}
                <div className="mx-3 my-2 border-t border-slate-100" />
                <button
                  onClick={() => { setShowWizard(true); setShowAnos(false); }}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-[#0066cc] hover:bg-[#0066cc]/5 cursor-pointer transition-colors"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                  Iniciar ano letivo 2027
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Banner modo histórico */}
      {isHistorico && (
        <div className="flex items-center gap-3 p-3.5 rounded-xl bg-amber-50 border border-amber-200/60">
          <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
          <p className="text-xs font-semibold text-amber-700">
            Você está visualizando o arquivo de <strong>{anoSel}</strong>. Este modo é somente leitura — nenhuma edição será aplicada.
          </p>
          <button onClick={() => setAnoSel(ANO_ATUAL)} className="ml-auto text-xs font-bold text-amber-600 hover:underline cursor-pointer whitespace-nowrap">
            Voltar para {ANO_ATUAL}
          </button>
        </div>
      )}

      {/* Cards de métricas do ano */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'Turmas', value: dados.turmas, icon: BookOpen, color: 'text-[#0066cc] bg-[#0066cc]/8' },
          { label: 'Alunos', value: dados.alunos.toLocaleString('pt-BR'), icon: Users, color: 'text-[#009966] bg-[#009966]/8' },
          { label: 'Professores', value: dados.professores, icon: GraduationCap, color: 'text-purple-600 bg-purple-50' },
          { label: 'Disciplinas', value: dados.disciplinas.length, icon: BarChart2, color: 'text-amber-600 bg-amber-50' },
        ].map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="bg-white border border-[#e2e8f0] rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 font-semibold">{card.label} em {anoSel}</p>
                  <p className="text-2xl font-extrabold text-[#0f172b] mt-1">{card.value}</p>
                </div>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit">
        {[{ id: 'escola', label: 'Relatório da Escola' }, { id: 'aluno', label: 'Histórico do Aluno' }].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as 'escola' | 'aluno')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer ${activeTab === tab.id ? 'bg-white text-[#0f172b] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab: Relatório da escola */}
      {activeTab === 'escola' && (
        <div className="space-y-4">
          <div className="bg-white border border-[#e2e8f0] rounded-2xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#0f172b]">Turmas × Professor × Disciplina — {anoSel}</h3>
              <button className="text-xs font-bold text-[#0066cc] hover:underline flex items-center gap-1 cursor-pointer">
                <FileText className="w-3.5 h-3.5" />Exportar PDF
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50">
                    {['Turma','Professor responsável','Disciplina principal','Alunos'].map(h => (
                      <th key={h} className="text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider px-5 py-3.5">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {turmas.map((t, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-5 py-3.5 text-sm font-bold text-[#0f172b]">{t.nome}</td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-lg bg-[#0066cc]/10 text-[#0066cc] flex items-center justify-center text-[10px] font-bold">
                            {t.professor.split(' ').map(n=>n[0]).slice(0,2).join('')}
                          </div>
                          <span className="text-sm text-slate-700">{t.professor}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="text-[11px] font-bold text-[#0066cc] bg-[#0066cc]/8 px-2.5 py-1 rounded-full border border-[#0066cc]/15">{t.disciplina}</span>
                      </td>
                      <td className="px-5 py-3.5 text-sm text-slate-500 font-mono">{t.alunos}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white border border-[#e2e8f0] rounded-2xl p-5 shadow-sm">
            <h3 className="text-sm font-bold text-[#0f172b] mb-3">Disciplinas lecionadas em {anoSel}</h3>
            <div className="flex flex-wrap gap-2">
              {dados.disciplinas.map(d => (
                <span key={d} className="text-xs font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl">{d}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Histórico do aluno */}
      {activeTab === 'aluno' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 bg-white border border-[#e2e8f0] rounded-xl px-3 py-2.5 max-w-sm shadow-sm">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              value={searchAluno}
              onChange={e => { setSearchAluno(e.target.value); setAlunoSel(null); }}
              placeholder="Buscar aluno por nome ou RA..."
              className="bg-transparent text-sm text-slate-700 placeholder:text-slate-400 outline-none w-full"
            />
          </div>

          {searchAluno && !alunoSel && (
            <div className="bg-white border border-[#e2e8f0] rounded-2xl shadow-sm overflow-hidden">
              {alunosFiltrados.length === 0 ? (
                <div className="py-8 text-center text-sm text-slate-400 font-medium">Nenhum aluno encontrado</div>
              ) : (
                alunosFiltrados.map(aluno => (
                  <button
                    key={aluno.id}
                    onClick={() => setAlunoSel(aluno)}
                    className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-slate-50 border-b border-slate-100 last:border-0 cursor-pointer transition-colors text-left"
                  >
                    <div className="w-8 h-8 rounded-xl bg-[#0066cc]/10 text-[#0066cc] flex items-center justify-center text-xs font-bold shrink-0">
                      {aluno.nome.split(' ').map(n=>n[0]).slice(0,2).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#0f172b]">{aluno.nome}</p>
                      <p className="text-[11px] text-slate-400 font-mono">RA: {aluno.ra}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 ml-auto" />
                  </button>
                ))
              )}
            </div>
          )}

          {alunoSel && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-white border border-[#e2e8f0] rounded-2xl shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-[#0066cc]/10 text-[#0066cc] flex items-center justify-center text-sm font-bold shrink-0">
                  {alunoSel.nome.split(' ').map(n=>n[0]).slice(0,2).join('')}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-[#0f172b]">{alunoSel.nome}</p>
                  <p className="text-[11px] text-slate-400 font-mono">RA: {alunoSel.ra} • {alunoSel.historico.length} anos de histórico</p>
                </div>
                <button onClick={() => { setAlunoSel(null); setSearchAluno(''); }} className="text-xs font-bold text-slate-400 hover:text-slate-600 cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200" />
                <div className="space-y-4">
                  {alunoSel.historico.map((h, i) => (
                    <div key={i} className="relative pl-14">
                      <div className={`absolute left-4 top-4 w-4 h-4 rounded-full border-2 ${h.ano === ANO_ATUAL ? 'bg-[#0066cc] border-[#0066cc]' : 'bg-white border-slate-300'}`} />
                      <div className="bg-white border border-[#e2e8f0] rounded-2xl p-4 shadow-sm">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-base font-extrabold text-[#0f172b]">{h.ano}</span>
                              {h.ano === ANO_ATUAL && <span className="text-[9px] font-bold text-[#0066cc] bg-[#0066cc]/10 px-1.5 py-0.5 rounded-full border border-[#0066cc]/20">Atual</span>}
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5">{h.turma} • Prof. {h.professor}</p>
                          </div>
                          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${h.status === 'Aprovado' ? 'bg-[#009966]/8 text-[#009966] border-[#009966]/20' : h.status === 'Em curso' ? 'bg-[#0066cc]/8 text-[#0066cc] border-[#0066cc]/20' : 'bg-amber-50 text-amber-600 border-amber-200/60'}`}>
                            {h.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          <div className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Média</p>
                            <p className="text-lg font-extrabold text-[#0f172b] mt-1">{h.media}</p>
                          </div>
                          <div className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Frequência</p>
                            <p className={`text-lg font-extrabold mt-1 ${h.frequencia >= 75 ? 'text-[#009966]' : 'text-[#e7000b]'}`}>{h.frequencia}%</p>
                          </div>
                          <div className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Situação</p>
                            <div className="flex items-center justify-center mt-1.5">
                              <Award className={`w-5 h-5 ${h.status === 'Aprovado' ? 'text-amber-400' : h.status === 'Em curso' ? 'text-[#0066cc]' : 'text-slate-400'}`} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {!searchAluno && !alunoSel && (
            <div className="bg-white border border-[#e2e8f0] rounded-2xl py-16 text-center shadow-sm">
              <Search className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-500">Busque um aluno pelo nome ou RA</p>
              <p className="text-xs text-slate-400 mt-1">O histórico completo será exibido aqui</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
