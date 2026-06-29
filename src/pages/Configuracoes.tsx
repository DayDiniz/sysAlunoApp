import React, { useState } from 'react';
import {
  School, Calendar, BookOpen, Users, ClipboardList,
  RefreshCw, MessageSquare, ShieldCheck, ChevronRight,
  Plus, Trash2, Check, Save, Upload, Info
} from 'lucide-react';

type Section =
  | 'dados' | 'notas' | 'frequencia' | 'diario'
  | 'recuperacao' | 'conselho' | 'usuarios';

const NAV_ITEMS: { id: Section; label: string; icon: React.ElementType; desc: string }[] = [
  { id: 'dados', label: 'Dados da Escola', icon: School, desc: 'Nome, logo, CNPJ e contatos' },
  { id: 'notas', label: 'Modelo de Notas', icon: BookOpen, desc: 'Avaliações, pesos e escala' },
  { id: 'frequencia', label: 'Frequência', icon: ClipboardList, desc: 'Mínimo de presença e faltas' },
  { id: 'diario', label: 'Diário de Classe', icon: MessageSquare, desc: 'Campos e BNCC' },
  { id: 'recuperacao', label: 'Recuperação', icon: RefreshCw, desc: 'Paralela, final e fórmula' },
  { id: 'conselho', label: 'Conselho de Classe', icon: Users, desc: 'Fluxo e deliberação' },
  { id: 'usuarios', label: 'Usuários e Perfis', icon: ShieldCheck, desc: 'Acessos e permissões' },
];

// ── Tipos ────────────────────────────────────────────────────────────────────
interface Avaliacao { id: string; nome: string; peso: number; }
interface ModeloNivel { nivel: string; escala: '0-10' | '0-100' | 'conceitual'; avaliacoes: Avaliacao[]; mediaMinima: number; }
interface Usuario { id: string; nome: string; email: string; perfil: 'admin' | 'coordenador' | 'professor'; status: 'Ativo' | 'Inativo'; }

// ── Dados iniciais ───────────────────────────────────────────────────────────
const MODELOS_INICIAIS: ModeloNivel[] = [
  { nivel: 'Fundamental I', escala: '0-10', mediaMinima: 5, avaliacoes: [
    { id: 'a1', nome: 'Prova Bimestral', peso: 60 },
    { id: 'a2', nome: 'Trabalho', peso: 40 },
  ]},
  { nivel: 'Fundamental II', escala: '0-10', mediaMinima: 6, avaliacoes: [
    { id: 'b1', nome: 'P1', peso: 40 },
    { id: 'b2', nome: 'P2', peso: 40 },
    { id: 'b3', nome: 'Trabalho', peso: 20 },
  ]},
  { nivel: 'Ensino Médio', escala: '0-100', mediaMinima: 60, avaliacoes: [
    { id: 'c1', nome: 'Prova 1', peso: 35 },
    { id: 'c2', nome: 'Prova 2', peso: 35 },
    { id: 'c3', nome: 'Simulado', peso: 20 },
    { id: 'c4', nome: 'Redação', peso: 10 },
  ]},
];

const USUARIOS_INICIAIS: Usuario[] = [
  { id: '1', nome: 'Administrador Geral', email: 'admin@escola.edu.br', perfil: 'admin', status: 'Ativo' },
  { id: '2', nome: 'Marcia Coordenadora', email: 'marcia@escola.edu.br', perfil: 'coordenador', status: 'Ativo' },
  { id: '3', nome: 'Ana Paula Borges', email: 'ana.borges@escola.edu.br', perfil: 'professor', status: 'Ativo' },
  { id: '4', nome: 'Carlos Eduardo Mota', email: 'carlos.mota@escola.edu.br', perfil: 'professor', status: 'Ativo' },
  { id: '5', nome: 'Fernanda Lins', email: 'fernanda.lins@escola.edu.br', perfil: 'professor', status: 'Inativo' },
];

// ── Toast de sucesso ─────────────────────────────────────────────────────────
function Toast({ msg, onClose }: { msg: string; onClose: () => void }) {
  React.useEffect(() => { const t = setTimeout(onClose, 2000); return () => clearTimeout(t); }, []);
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-[#0f172b] text-white px-4 py-3 rounded-2xl shadow-xl border border-white/10 animate-bounce">
      <Check className="w-4 h-4 text-[#009966] stroke-[3] shrink-0" />
      <span className="text-sm font-bold">{msg}</span>
    </div>
  );
}

// ── Seção: Dados da Escola ───────────────────────────────────────────────────
function DadosEscola({ onSave }: { onSave: () => void }) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-base font-bold text-[#0f172b]">Dados da Escola</h3>
        <p className="text-xs text-slate-500 mt-0.5">Informações institucionais exibidas em documentos e relatórios</p>
      </div>

      {/* Logo */}
      <div className="bg-white border border-[#e2e8f0] rounded-2xl p-5 shadow-sm space-y-4">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Identidade Visual</p>
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 cursor-pointer hover:border-[#0066cc]/50 hover:bg-[#0066cc]/3 transition-all">
            <Upload className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-bold">Logo</span>
          </div>
          <div>
            <p className="text-xs font-bold text-[#0f172b]">Logo da escola</p>
            <p className="text-[11px] text-slate-400 mt-0.5">PNG ou SVG, mínimo 200×200px</p>
            <button className="mt-2 text-xs font-bold text-[#0066cc] hover:underline cursor-pointer">Fazer upload</button>
          </div>
        </div>
      </div>

      {/* Dados */}
      <div className="bg-white border border-[#e2e8f0] rounded-2xl p-5 shadow-sm space-y-4">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Informações Institucionais</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: 'Nome da escola', placeholder: 'Ex: Colégio São Paulo', col: 2 },
            { label: 'CNPJ', placeholder: '00.000.000/0001-00', col: 1 },
            { label: 'Telefone', placeholder: '(11) 0000-0000', col: 1 },
            { label: 'E-mail institucional', placeholder: 'contato@escola.edu.br', col: 1 },
            { label: 'Site', placeholder: 'www.escola.edu.br', col: 1 },
            { label: 'Endereço completo', placeholder: 'Rua, número, bairro, cidade — UF', col: 2 },
          ].map((field, i) => (
            <div key={i} className={`space-y-1.5 ${field.col === 2 ? 'md:col-span-2' : ''}`}>
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">{field.label}</label>
              <input className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#e2e8f0] rounded-xl text-sm text-[#0f172b] focus:outline-none focus:border-[#0066cc]/50 transition-all" placeholder={field.placeholder} />
            </div>
          ))}
        </div>
      </div>

      <button onClick={onSave} className="flex items-center gap-2 px-5 py-2.5 bg-[#0066cc] text-white text-sm font-bold rounded-xl cursor-pointer hover:bg-[#0055b3] transition-all shadow-sm">
        <Save className="w-4 h-4" />Salvar dados da escola
      </button>
    </div>
  );
}

// ── Seção: Modelo de Notas ───────────────────────────────────────────────────
function ModeloNotas({ onSave }: { onSave: () => void }) {
  const [modelos, setModelos] = useState<ModeloNivel[]>(MODELOS_INICIAIS);
  const [nivelSel, setNivelSel] = useState(0);

  const modelo = modelos[nivelSel];

  const updateModelo = (field: keyof ModeloNivel, value: any) => {
    setModelos(prev => prev.map((m, i) => i === nivelSel ? { ...m, [field]: value } : m));
  };

  const updateAvaliacao = (id: string, field: keyof Avaliacao, value: any) => {
    setModelos(prev => prev.map((m, i) => i === nivelSel ? {
      ...m,
      avaliacoes: m.avaliacoes.map(a => a.id === id ? { ...a, [field]: value } : a)
    } : m));
  };

  const addAvaliacao = () => {
    const nova: Avaliacao = { id: Date.now().toString(), nome: 'Nova avaliação', peso: 0 };
    setModelos(prev => prev.map((m, i) => i === nivelSel ? { ...m, avaliacoes: [...m.avaliacoes, nova] } : m));
  };

  const removeAvaliacao = (id: string) => {
    setModelos(prev => prev.map((m, i) => i === nivelSel ? { ...m, avaliacoes: m.avaliacoes.filter(a => a.id !== id) } : m));
  };

  const totalPeso = modelo.avaliacoes.reduce((acc, a) => acc + Number(a.peso), 0);
  const pesoOk = totalPeso === 100;

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-base font-bold text-[#0f172b]">Modelo de Notas</h3>
        <p className="text-xs text-slate-500 mt-0.5">Configure avaliações, pesos e escala por nível de ensino</p>
      </div>

      {/* Seletor de nível */}
      <div className="flex gap-2">
        {modelos.map((m, i) => (
          <button
            key={i}
            onClick={() => setNivelSel(i)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${nivelSel === i ? 'bg-[#0066cc] text-white shadow-sm' : 'bg-white border border-[#e2e8f0] text-slate-600 hover:bg-slate-50'}`}
          >
            {m.nivel}
          </button>
        ))}
      </div>

      {/* Escala e mínimo */}
      <div className="bg-white border border-[#e2e8f0] rounded-2xl p-5 shadow-sm space-y-4">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Configuração geral — {modelo.nivel}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Escala de avaliação</label>
            <select
              value={modelo.escala}
              onChange={e => updateModelo('escala', e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#e2e8f0] rounded-xl text-sm text-[#0f172b] focus:outline-none focus:border-[#0066cc]/50 cursor-pointer"
            >
              <option value="0-10">Numérica 0 a 10</option>
              <option value="0-100">Numérica 0 a 100</option>
              <option value="conceitual">Conceitual (A / B / C / D)</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Média mínima para aprovação
            </label>
            <input
              type="number"
              value={modelo.mediaMinima}
              onChange={e => updateModelo('mediaMinima', Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#e2e8f0] rounded-xl text-sm text-[#0f172b] focus:outline-none focus:border-[#0066cc]/50"
            />
          </div>
        </div>
      </div>

      {/* Avaliações */}
      <div className="bg-white border border-[#e2e8f0] rounded-2xl p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Avaliações e pesos</p>
          <div className={`text-xs font-bold px-2.5 py-1 rounded-full border ${pesoOk ? 'bg-[#009966]/8 text-[#009966] border-[#009966]/20' : 'bg-amber-50 text-amber-600 border-amber-200/60'}`}>
            Total: {totalPeso}% {pesoOk ? '✓' : '— deve somar 100%'}
          </div>
        </div>

        <div className="space-y-2">
          {modelo.avaliacoes.map((av, i) => (
            <div key={av.id} className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-100 rounded-xl">
              <span className="text-[10px] font-bold text-slate-400 w-4 text-center">{i + 1}</span>
              <input
                value={av.nome}
                onChange={e => updateAvaliacao(av.id, 'nome', e.target.value)}
                className="flex-1 bg-white border border-[#e2e8f0] rounded-lg px-3 py-2 text-sm text-[#0f172b] focus:outline-none focus:border-[#0066cc]/50"
                placeholder="Nome da avaliação"
              />
              <div className="flex items-center gap-1.5 shrink-0">
                <input
                  type="number"
                  value={av.peso}
                  onChange={e => updateAvaliacao(av.id, 'peso', Number(e.target.value))}
                  className="w-16 bg-white border border-[#e2e8f0] rounded-lg px-2.5 py-2 text-sm text-center text-[#0f172b] focus:outline-none focus:border-[#0066cc]/50 font-mono"
                />
                <span className="text-xs text-slate-400 font-bold">%</span>
              </div>
              <button
                onClick={() => removeAvaliacao(av.id)}
                className="p-1.5 text-slate-400 hover:text-[#e7000b] hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={addAvaliacao}
          className="w-full py-2.5 border border-dashed border-[#0066cc]/30 rounded-xl text-xs font-bold text-[#0066cc] hover:bg-[#0066cc]/4 transition-all cursor-pointer flex items-center justify-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          Adicionar avaliação
        </button>

        {!pesoOk && (
          <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200/60 rounded-xl">
            <Info className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-[11px] text-amber-700 font-medium">Os pesos precisam somar exatamente 100% para salvar.</p>
          </div>
        )}
      </div>

      <button
        onClick={pesoOk ? onSave : undefined}
        disabled={!pesoOk}
        className="flex items-center gap-2 px-5 py-2.5 bg-[#0066cc] disabled:bg-slate-200 disabled:text-slate-400 text-white text-sm font-bold rounded-xl cursor-pointer hover:bg-[#0055b3] transition-all shadow-sm"
      >
        <Save className="w-4 h-4" />Salvar modelo de notas
      </button>
    </div>
  );
}

// ── Seção: Frequência ────────────────────────────────────────────────────────
function Frequencia({ onSave }: { onSave: () => void }) {
  const [minimo, setMinimo] = useState(75);
  const [justificada, setJustificada] = useState(true);
  const [limitePorDisciplina, setLimitePorDisciplina] = useState(false);

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-base font-bold text-[#0f172b]">Frequência</h3>
        <p className="text-xs text-slate-500 mt-0.5">Regras de presença e cálculo de faltas</p>
      </div>

      <div className="bg-white border border-[#e2e8f0] rounded-2xl p-5 shadow-sm space-y-5">
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Frequência mínima para aprovação
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={50} max={100} step={5}
              value={minimo}
              onChange={e => setMinimo(Number(e.target.value))}
              className="flex-1 accent-[#0066cc]"
            />
            <span className="text-xl font-extrabold text-[#0066cc] w-14 text-right">{minimo}%</span>
          </div>
          <p className="text-[11px] text-slate-400">Padrão legal: 75%. Ajuste conforme regimento da escola.</p>
        </div>

        <div className="pt-4 border-t border-slate-100 space-y-3">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Regras de falta</p>

          <label className="flex items-center justify-between p-3.5 rounded-xl border border-[#e2e8f0] cursor-pointer hover:bg-slate-50 transition-colors">
            <div>
              <p className="text-sm font-bold text-[#0f172b]">Falta justificada não desconta</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Atestados e documentos comprovados não contam como ausência</p>
            </div>
            <div
              onClick={() => setJustificada(v => !v)}
              className={`w-11 h-6 rounded-full transition-all relative cursor-pointer ${justificada ? 'bg-[#0066cc]' : 'bg-slate-200'}`}
            >
              <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${justificada ? 'left-5' : 'left-0.5'}`} />
            </div>
          </label>

          <label className="flex items-center justify-between p-3.5 rounded-xl border border-[#e2e8f0] cursor-pointer hover:bg-slate-50 transition-colors">
            <div>
              <p className="text-sm font-bold text-[#0f172b]">Calcular limite por disciplina</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Cada disciplina tem seu próprio contador de faltas</p>
            </div>
            <div
              onClick={() => setLimitePorDisciplina(v => !v)}
              className={`w-11 h-6 rounded-full transition-all relative cursor-pointer ${limitePorDisciplina ? 'bg-[#0066cc]' : 'bg-slate-200'}`}
            >
              <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${limitePorDisciplina ? 'left-5' : 'left-0.5'}`} />
            </div>
          </label>
        </div>
      </div>

      <button onClick={onSave} className="flex items-center gap-2 px-5 py-2.5 bg-[#0066cc] text-white text-sm font-bold rounded-xl cursor-pointer hover:bg-[#0055b3] transition-all shadow-sm">
        <Save className="w-4 h-4" />Salvar configurações de frequência
      </button>
    </div>
  );
}

// ── Seção: Diário de Classe ──────────────────────────────────────────────────
function DiarioClasse({ onSave }: { onSave: () => void }) {
  const [bncc, setBncc] = useState(true);
  const [conteudo, setConteudo] = useState(true);
  const [observacoes, setObservacoes] = useState(false);
  const [habilidades, setHabilidades] = useState(true);

  const toggles = [
    { label: 'BNCC integrada', desc: 'Professor seleciona habilidades e competências da BNCC por aula', value: bncc, set: setBncc },
    { label: 'Registro de conteúdo lecionado', desc: 'Campo obrigatório para descrever o conteúdo da aula', value: conteudo, set: setConteudo },
    { label: 'Observações gerais', desc: 'Campo livre para observações do professor sobre a turma', value: observacoes, set: setObservacoes },
    { label: 'Habilidades por aula', desc: 'Professor registra quais habilidades foram trabalhadas em cada aula', value: habilidades, set: setHabilidades },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-base font-bold text-[#0f172b]">Diário de Classe</h3>
        <p className="text-xs text-slate-500 mt-0.5">Defina quais campos o professor preenche no diário</p>
      </div>

      <div className="bg-white border border-[#e2e8f0] rounded-2xl p-5 shadow-sm space-y-3">
        {toggles.map((t, i) => (
          <label key={i} className="flex items-center justify-between p-3.5 rounded-xl border border-[#e2e8f0] cursor-pointer hover:bg-slate-50 transition-colors">
            <div>
              <p className="text-sm font-bold text-[#0f172b]">{t.label}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">{t.desc}</p>
            </div>
            <div onClick={() => t.set((v: boolean) => !v)} className={`w-11 h-6 rounded-full transition-all relative cursor-pointer shrink-0 ml-4 ${t.value ? 'bg-[#0066cc]' : 'bg-slate-200'}`}>
              <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${t.value ? 'left-5' : 'left-0.5'}`} />
            </div>
          </label>
        ))}
      </div>

      <button onClick={onSave} className="flex items-center gap-2 px-5 py-2.5 bg-[#0066cc] text-white text-sm font-bold rounded-xl cursor-pointer hover:bg-[#0055b3] transition-all shadow-sm">
        <Save className="w-4 h-4" />Salvar configurações do diário
      </button>
    </div>
  );
}

// ── Seção: Recuperação ───────────────────────────────────────────────────────
function Recuperacao({ onSave }: { onSave: () => void }) {
  const [paralela, setParalela] = useState(true);
  const [final, setFinal] = useState(true);
  const [formula, setFormula] = useState<'substitui' | 'media'>('media');

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-base font-bold text-[#0f172b]">Recuperação</h3>
        <p className="text-xs text-slate-500 mt-0.5">Modalidades de recuperação e fórmula de cálculo</p>
      </div>

      <div className="bg-white border border-[#e2e8f0] rounded-2xl p-5 shadow-sm space-y-5">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Modalidades ativas</p>
        <div className="space-y-3">
          {[
            { label: 'Recuperação paralela', desc: 'Durante o bimestre, para alunos com dificuldades', value: paralela, set: setParalela },
            { label: 'Recuperação final', desc: 'Ao final do ano, para alunos em situação de risco', value: final, set: setFinal },
          ].map((t, i) => (
            <label key={i} className="flex items-center justify-between p-3.5 rounded-xl border border-[#e2e8f0] cursor-pointer hover:bg-slate-50">
              <div>
                <p className="text-sm font-bold text-[#0f172b]">{t.label}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{t.desc}</p>
              </div>
              <div onClick={() => t.set((v: boolean) => !v)} className={`w-11 h-6 rounded-full transition-all relative cursor-pointer shrink-0 ml-4 ${t.value ? 'bg-[#0066cc]' : 'bg-slate-200'}`}>
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${t.value ? 'left-5' : 'left-0.5'}`} />
              </div>
            </label>
          ))}
        </div>

        <div className="pt-4 border-t border-slate-100 space-y-3">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Fórmula da recuperação</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'substitui', label: 'Substitui a nota', desc: 'A nota da recuperação substitui a menor nota do período' },
              { id: 'media', label: 'Média com a nota', desc: 'Calcula a média entre a nota original e a da recuperação' },
            ].map(op => (
              <button
                key={op.id}
                onClick={() => setFormula(op.id as 'substitui' | 'media')}
                className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer ${formula === op.id ? 'border-[#0066cc] bg-[#0066cc]/4' : 'border-[#e2e8f0] hover:border-slate-300'}`}
              >
                <div className={`w-4 h-4 rounded-full border-2 mb-2 ${formula === op.id ? 'border-[#0066cc] bg-[#0066cc]' : 'border-slate-300'}`} />
                <p className="text-xs font-bold text-[#0f172b]">{op.label}</p>
                <p className="text-[11px] text-slate-400 mt-1">{op.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <button onClick={onSave} className="flex items-center gap-2 px-5 py-2.5 bg-[#0066cc] text-white text-sm font-bold rounded-xl cursor-pointer hover:bg-[#0055b3] transition-all shadow-sm">
        <Save className="w-4 h-4" />Salvar configurações de recuperação
      </button>
    </div>
  );
}

// ── Seção: Conselho de Classe ────────────────────────────────────────────────
function ConselhoClasse({ onSave }: { onSave: () => void }) {
  const [tipo, setTipo] = useState<'deliberativo' | 'consultivo'>('deliberativo');
  const [participantes, setParticipantes] = useState({ coordenador: true, professores: true, direcao: false, pedagogo: true });

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-base font-bold text-[#0f172b]">Conselho de Classe</h3>
        <p className="text-xs text-slate-500 mt-0.5">Fluxo, participantes e poder de deliberação</p>
      </div>

      <div className="bg-white border border-[#e2e8f0] rounded-2xl p-5 shadow-sm space-y-5">
        <div className="space-y-3">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tipo de conselho</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'deliberativo', label: 'Deliberativo', desc: 'Pode alterar notas, situação e progressão do aluno' },
              { id: 'consultivo', label: 'Consultivo', desc: 'Apenas analisa e recomenda — sem alterar registros' },
            ].map(op => (
              <button
                key={op.id}
                onClick={() => setTipo(op.id as 'deliberativo' | 'consultivo')}
                className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer ${tipo === op.id ? 'border-[#0066cc] bg-[#0066cc]/4' : 'border-[#e2e8f0] hover:border-slate-300'}`}
              >
                <div className={`w-4 h-4 rounded-full border-2 mb-2 ${tipo === op.id ? 'border-[#0066cc] bg-[#0066cc]' : 'border-slate-300'}`} />
                <p className="text-xs font-bold text-[#0f172b]">{op.label}</p>
                <p className="text-[11px] text-slate-400 mt-1">{op.desc}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 space-y-3">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Participantes obrigatórios</p>
          {[
            { id: 'coordenador', label: 'Coordenador pedagógico' },
            { id: 'professores', label: 'Professores da turma' },
            { id: 'direcao', label: 'Direção escolar' },
            { id: 'pedagogo', label: 'Psicopedagogo / orientador' },
          ].map(p => (
            <label key={p.id} className="flex items-center justify-between p-3 rounded-xl border border-[#e2e8f0] cursor-pointer hover:bg-slate-50">
              <span className="text-sm font-medium text-[#0f172b]">{p.label}</span>
              <div
                onClick={() => setParticipantes(prev => ({ ...prev, [p.id]: !prev[p.id as keyof typeof prev] }))}
                className={`w-11 h-6 rounded-full transition-all relative cursor-pointer ${participantes[p.id as keyof typeof participantes] ? 'bg-[#0066cc]' : 'bg-slate-200'}`}
              >
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${participantes[p.id as keyof typeof participantes] ? 'left-5' : 'left-0.5'}`} />
              </div>
            </label>
          ))}
        </div>
      </div>

      <button onClick={onSave} className="flex items-center gap-2 px-5 py-2.5 bg-[#0066cc] text-white text-sm font-bold rounded-xl cursor-pointer hover:bg-[#0055b3] transition-all shadow-sm">
        <Save className="w-4 h-4" />Salvar configurações do conselho
      </button>
    </div>
  );
}

// ── Seção: Usuários e Perfis ─────────────────────────────────────────────────
function Usuarios({ onSave }: { onSave: () => void }) {
  const [usuarios, setUsuarios] = useState<Usuario[]>(USUARIOS_INICIAIS);
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);

  const perfilColor: Record<string, string> = {
    admin: 'bg-[#e7000b]/8 text-[#e7000b] border-[#e7000b]/20',
    coordenador: 'bg-purple-50 text-purple-600 border-purple-200/60',
    professor: 'bg-[#0066cc]/8 text-[#0066cc] border-[#0066cc]/20',
  };

  const perfilLabel: Record<string, string> = {
    admin: 'Administrador',
    coordenador: 'Coordenador',
    professor: 'Professor',
  };

  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => { setSuccess(false); setShowModal(false); }, 1500);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-[#0f172b]">Usuários e Perfis</h3>
          <p className="text-xs text-slate-500 mt-0.5">Gerencie acessos e permissões do sistema</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2.5 bg-[#0066cc] text-white text-sm font-bold rounded-xl cursor-pointer hover:bg-[#0055b3] shadow-sm">
          <Plus className="w-4 h-4" />Novo usuário
        </button>
      </div>

      {/* Permissões por perfil */}
      <div className="bg-white border border-[#e2e8f0] rounded-2xl p-5 shadow-sm">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Permissões por perfil</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left font-bold text-slate-400 pb-3 pr-4">Funcionalidade</th>
                {['Administrador', 'Coordenador', 'Professor'].map(p => (
                  <th key={p} className="text-center font-bold text-slate-400 pb-3 px-3">{p}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { label: 'Dashboard', admin: true, coord: true, prof: true },
                { label: 'Alunos — visualizar', admin: true, coord: true, prof: true },
                { label: 'Alunos — editar', admin: true, coord: true, prof: false },
                { label: 'Grade horária', admin: true, coord: true, prof: false },
                { label: 'Diário de classe', admin: true, coord: true, prof: true },
                { label: 'Lançar notas', admin: true, coord: true, prof: true },
                { label: 'Relatórios', admin: true, coord: true, prof: false },
                { label: 'Configurações', admin: true, coord: false, prof: false },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/50">
                  <td className="py-2.5 pr-4 text-slate-700 font-medium">{row.label}</td>
                  {[row.admin, row.coord, row.prof].map((val, j) => (
                    <td key={j} className="py-2.5 px-3 text-center">
                      {val
                        ? <Check className="w-4 h-4 text-[#009966] stroke-[3] mx-auto" />
                        : <span className="w-4 h-0.5 bg-slate-200 rounded block mx-auto" />
                      }
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lista de usuários */}
      <div className="bg-white border border-[#e2e8f0] rounded-2xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Usuários cadastrados</p>
        </div>
        <div className="divide-y divide-slate-100">
          {usuarios.map(u => (
            <div key={u.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-slate-50/50 transition-colors">
              <div className="w-8 h-8 rounded-xl bg-[#0066cc]/10 text-[#0066cc] flex items-center justify-center text-xs font-bold shrink-0">
                {u.nome.split(' ').map(n => n[0]).slice(0, 2).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-[#0f172b] truncate">{u.nome}</p>
                <p className="text-[11px] text-slate-400 truncate">{u.email}</p>
              </div>
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border shrink-0 ${perfilColor[u.perfil]}`}>
                {perfilLabel[u.perfil]}
              </span>
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border shrink-0 ${u.status === 'Ativo' ? 'bg-[#009966]/8 text-[#009966] border-[#009966]/20' : 'bg-slate-100 text-slate-400 border-slate-200'}`}>
                {u.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-[#e2e8f0]">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-bold text-[#0f172b]">Novo usuário</h3>
              <button onClick={() => setShowModal(false)} className="p-1.5 bg-slate-100 rounded-full text-slate-500 cursor-pointer">
                <ChevronRight className="w-4 h-4 rotate-180" />
              </button>
            </div>
            {success ? (
              <div className="py-12 text-center">
                <div className="w-14 h-14 rounded-full bg-[#009966]/10 border border-[#009966]/20 flex items-center justify-center mx-auto mb-3">
                  <Check className="w-7 h-7 text-[#009966] stroke-[2.5]" />
                </div>
                <p className="text-sm font-bold text-[#0f172b]">Usuário criado!</p>
              </div>
            ) : (
              <form onSubmit={handleSaveUser} className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Nome completo</label>
                  <input required className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#e2e8f0] rounded-xl text-sm focus:outline-none focus:border-[#0066cc]/50" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">E-mail</label>
                  <input type="email" required className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#e2e8f0] rounded-xl text-sm focus:outline-none focus:border-[#0066cc]/50" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Perfil de acesso</label>
                  <select className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#e2e8f0] rounded-xl text-sm focus:outline-none cursor-pointer">
                    <option value="admin">Administrador</option>
                    <option value="coordenador">Coordenador</option>
                    <option value="professor">Professor</option>
                  </select>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2.5 border border-[#e2e8f0] rounded-xl text-sm font-bold text-slate-500 cursor-pointer">Cancelar</button>
                  <button type="submit" className="flex-1 py-2.5 bg-[#0066cc] text-white rounded-xl text-sm font-bold cursor-pointer hover:bg-[#0055b3]">Criar usuário</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Tela principal ────────────────────────────────────────────────────────────
export default function Configuracoes() {
  const [activeSection, setActiveSection] = useState<Section>('dados');
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => setToast(msg);

  const sectionComponents: Record<Section, React.ReactNode> = {
    dados: <DadosEscola onSave={() => showToast('Dados da escola salvos!')} />,
    notas: <ModeloNotas onSave={() => showToast('Modelo de notas salvo!')} />,
    frequencia: <Frequencia onSave={() => showToast('Configurações de frequência salvas!')} />,
    diario: <DiarioClasse onSave={() => showToast('Configurações do diário salvas!')} />,
    recuperacao: <Recuperacao onSave={() => showToast('Configurações de recuperação salvas!')} />,
    conselho: <ConselhoClasse onSave={() => showToast('Configurações do conselho salvas!')} />,
    usuarios: <Usuarios onSave={() => showToast('Usuário salvo!')} />,
  };

  return (
    <div className="flex gap-6 max-w-7xl">
      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}

      {/* Menu lateral */}
      <aside className="w-64 shrink-0">
        <div className="bg-white border border-[#e2e8f0] rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 py-3.5 border-b border-slate-100">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Configurações Gerais</p>
          </div>
          <nav className="p-2 space-y-0.5">
            {NAV_ITEMS.map(item => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all cursor-pointer ${isActive ? 'bg-[#0066cc]/8 text-[#0066cc]' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#0066cc]' : 'text-slate-400'}`} />
                  <div className="min-w-0">
                    <p className={`text-xs font-bold truncate ${isActive ? 'text-[#0066cc]' : 'text-[#0f172b]'}`}>{item.label}</p>
                    <p className="text-[10px] text-slate-400 truncate">{item.desc}</p>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-[#0066cc] shrink-0 ml-auto" />}
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Conteúdo */}
      <div className="flex-1 min-w-0">
        {sectionComponents[activeSection]}
      </div>
    </div>
  );
}
