import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ArrowRight, AlertCircle, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('admin@appzio.com');
  const [password, setPassword] = useState('Appzio@2026!');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/admin');
    } catch (err: any) {
      setError(err.message || 'Invalid credentials. Please verify your email and password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-brand-dark">
      {/* Background Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-radial pointer-events-none" />
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8 space-y-3">
          <Link to="/" className="inline-block">
            <img src="/logo-horizontal.png" alt="APPZIO" className="h-11 w-auto mx-auto" />
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-xs font-mono text-brand-cyan">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>SECURE CMS ACCESS</span>
          </div>
          <h1 className="text-2xl font-bold font-display text-white">
            Admin Management Portal
          </h1>
          <p className="text-xs text-brand-text-secondary">
            Sign in to manage projects, services, enquiries, and content.
          </p>
        </div>

        <div className="rounded-3xl bg-brand-dark-card border border-white/10 p-8 shadow-2xl shadow-black/80 space-y-6">
          {error && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-white mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-brand-text-secondary absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@appzio.com"
                  className="w-full bg-brand-dark border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-brand-text-secondary/50 focus:outline-none focus:border-brand-blue transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-white mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-brand-text-secondary absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full bg-brand-dark border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-brand-text-secondary/50 focus:outline-none focus:border-brand-blue transition-colors"
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-[11px] font-mono text-brand-text-secondary">
              <span className="text-brand-cyan">Default:</span> admin@appzio.com / Appzio@2026!
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-white bg-brand-gradient hover:bg-brand-gradient-hover shadow-glow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="text-center pt-2">
            <Link to="/" className="text-xs text-brand-text-secondary hover:text-white transition-colors">
              ← Return to public website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

