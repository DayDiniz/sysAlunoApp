import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, AlertCircle, Shield } from 'lucide-react';

interface LoginProps { onLogin: () => void; }

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('admin@escola.edu.br');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.trim()) { setError('Informe o e-mail institucional.'); return; }
    if (!password) { setError('Informe sua senha.'); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess(true); setTimeout(onLogin, 900); }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#0f172b] flex">
      {/* Left panel */}
      <div className="hidden lg:flex w-[480px] shrink-0 flex-col justify-between p-12 bg-[#0a1020] border-r border-white/6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-30" style={{ background: 'radial-gradient(ellipse at 20% 50%, #0066cc22 0%, transparent 60%)' }} />

        <div className="relative">
          <span className="text-3xl font-black italic tracking-tighter select-none">
            <span className="text-white">Sys</span>
            <span className="text-[#0066cc]">Class</span>
          </span>
          <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest mt-1">Sistema de Gestão Escolar</p>
        </div>

        <div className="relative space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-white leading-snug">Gestão escolar inteligente para o ensino fundamental e médio</h2>
            <p className="text-sm text-slate-400 mt-3 leading-relaxed">Planejamento acadêmico, turmas, professores e espaços físicos em uma plataforma unificada.</p>
          </div>

          <div className="space-y-3">
            {['Montagem de grade horária automatizada', 'Diário de classe digital e chamada online', 'Gestão de espaços e recursos físicos', 'Relatórios pedagógicos por BNCC'].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#0066cc] shrink-0" />
                <p className="text-xs text-slate-400 font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-[10px] text-slate-600 font-mono relative">© {new Date().getFullYear()} SysClass Educacional</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8 bg-[#f8fafc]">
        <div className="w-full max-w-sm space-y-8">
          <div className="text-center lg:text-left">
            <div className="lg:hidden mb-6">
              <span className="text-2xl font-black italic tracking-tighter">
                <span className="text-[#0f172b]">Sys</span>
                <span className="text-[#0066cc]">Class</span>
              </span>
            </div>
            <h1 className="text-xl font-bold text-[#0f172b]">Acesso ao sistema</h1>
            <p className="text-sm text-slate-500 mt-1">Entre com suas credenciais institucionais</p>
          </div>

          {success ? (
            <div className="bg-white border border-[#e2e8f0] rounded-2xl p-8 text-center space-y-4 shadow-sm">
              <div className="w-14 h-14 rounded-full bg-[#0066cc]/10 border border-[#0066cc]/20 flex items-center justify-center mx-auto">
                <div className="w-9 h-9 rounded-full bg-[#0066cc] text-white flex items-center justify-center text-lg font-bold animate-bounce">✓</div>
              </div>
              <p className="text-sm font-bold text-[#0f172b]">Autenticado com sucesso</p>
              <p className="text-xs text-slate-500">Carregando o painel...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white border border-[#e2e8f0] rounded-2xl p-6 shadow-sm space-y-4">
              {error && (
                <div className="flex items-start gap-2 bg-red-50 border border-red-200/60 rounded-xl p-3">
                  <AlertCircle className="w-3.5 h-3.5 text-[#e7000b] shrink-0 mt-0.5" />
                  <p className="text-xs text-[#e7000b] font-medium">{error}</p>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">E-mail institucional</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-[#e2e8f0] rounded-xl text-sm font-medium text-[#0f172b] focus:outline-none focus:border-[#0066cc]/50 focus:bg-white transition-all"
                    placeholder="admin@escola.edu.br"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Senha</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showPw ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-[#e2e8f0] rounded-xl text-sm font-medium text-[#0f172b] focus:outline-none focus:border-[#0066cc]/50 focus:bg-white transition-all"
                    placeholder="••••••••"
                  />
                  <button type="button" onClick={() => setShowPw(v => !v)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer">
                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#0066cc] hover:bg-[#0055b3] text-white font-bold text-sm rounded-xl transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2 shadow-sm shadow-blue-500/20"
              >
                {loading ? (
                  <><div className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" /><span>Autenticando...</span></>
                ) : (
                  'Acessar o sistema'
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 pt-1">
                <Shield className="w-3 h-3 text-slate-400" />
                <p className="text-[10px] text-slate-400 font-medium">Conexão segura • ISO 27001</p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
