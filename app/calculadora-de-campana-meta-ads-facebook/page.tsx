"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { saveLeadAction } from '@/lib/supabase/actions';

export default function MetaAdsCalculator() {
  const [budget, setBudget] = useState(500000);
  const [cpc, setCpc] = useState(250);
  const [convRate, setConvRate] = useState(2);
  const [email, setEmail] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [loading, setLoading] = useState(false);

  // Resultados calculados
  const clicks = Math.floor(budget / cpc);
  const leads = Math.floor(clicks * (convRate / 100));
  const cpa = leads > 0 ? Math.floor(budget / leads) : 0;

  const handleSaveResult = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const adData = {
      budget,
      cpc,
      convRate,
      projectedClicks: clicks,
      projectedLeads: leads,
      projectedCPA: cpa
    };

    // Usamos el action existente pasando la data técnica en el objeto
    await saveLeadAction(email, { 
      project_type: 'meta_ads_calculator',
      details: JSON.stringify(adData) 
    }, 0);

    setIsUnlocked(true);
    setLoading(false);
  };

  const formatCLP = (val: number) => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 }).format(val);

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans">
      <Header />
      
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-blue-400 uppercase bg-blue-500/10 border border-blue-500/20 rounded-full">
                Simulador de Performance GA
              </span>
              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
                Calcula el <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">ROI de tu Campaña</span>
              </h1>
              <p className="text-xl text-zinc-400 leading-relaxed mb-10 max-w-xl">
                Ajusta tu inversión y métricas estimadas para predecir cuántos clientes podrías captar este mes con Meta Ads.
              </p>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative bg-zinc-900 border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl">
                 
                 {/* Sliders Container */}
                 <div className="space-y-10">
                    <div>
                      <div className="flex justify-between mb-4">
                        <label className="text-sm font-bold text-zinc-300 uppercase tracking-widest">Inversión Mensual</label>
                        <span className="text-blue-400 font-mono font-bold">{formatCLP(budget)}</span>
                      </div>
                      <input 
                        type="range" min="100000" max="5000000" step="50000"
                        value={budget} onChange={(e) => setBudget(Number(e.target.value))}
                        className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-4">
                        <label className="text-sm font-bold text-zinc-300 uppercase tracking-widest">CPC Estimado (Costo por Clic)</label>
                        <span className="text-purple-400 font-mono font-bold">{formatCLP(cpc)}</span>
                      </div>
                      <input 
                        type="range" min="50" max="1000" step="10"
                        value={cpc} onChange={(e) => setCpc(Number(e.target.value))}
                        className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-4">
                        <label className="text-sm font-bold text-zinc-300 uppercase tracking-widest">Tasa de Conversión (%)</label>
                        <span className="text-emerald-400 font-mono font-bold">{convRate}%</span>
                      </div>
                      <input 
                        type="range" min="0.1" max="10" step="0.1"
                        value={convRate} onChange={(e) => setConvRate(Number(e.target.value))}
                        className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                      />
                    </div>
                 </div>

              </div>
            </div>
          </div>

          {/* Results Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
             <div className="bg-zinc-900/50 p-8 rounded-3xl border border-white/5 backdrop-blur-sm text-center">
                <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-4">Clics Proyectados</p>
                <p className="text-5xl font-mono font-extrabold text-white">{clicks.toLocaleString()}</p>
             </div>
             <div className="bg-blue-600/10 p-8 rounded-3xl border border-blue-500/20 backdrop-blur-sm text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500 blur-[60px] opacity-20"></div>
                <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-4 italic">Leads / Ventas</p>
                <p className="text-5xl font-mono font-extrabold text-blue-400">{leads.toLocaleString()}</p>
             </div>
             <div className="bg-zinc-900/50 p-8 rounded-3xl border border-white/5 backdrop-blur-sm text-center">
                <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-4">Costo por Lead (CPA)</p>
                <p className="text-5xl font-mono font-extrabold text-white">{formatCLP(cpa)}</p>
             </div>
          </div>

          {/* Lead Capture Gating */}
          <div className="max-w-3xl mx-auto bg-gradient-to-b from-zinc-900 to-black p-10 md:p-16 rounded-[3rem] border border-white/10 text-center">
            {!isUnlocked ? (
              <>
                <h3 className="text-3xl font-bold mb-6">¿Quieres el reporte detallado?</h3>
                <p className="text-zinc-400 mb-10">Ingresa tu correo y te enviaremos una auditoría express de cómo optimizar estas campañas para bajar tu CPA.</p>
                <form onSubmit={handleSaveResult} className="flex flex-col sm:flex-row gap-4">
                   <input 
                      type="email" required placeholder="tu@empresa.com"
                      value={email} onChange={(e) => setEmail(e.target.value)}
                      className="flex-grow bg-white/5 border border-white/10 px-6 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 text-lg transition-all"
                   />
                   <button 
                    disabled={loading}
                    className="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-xl shadow-blue-500/20 disabled:opacity-50"
                   >
                     {loading ? 'Enviando...' : 'Obtener Reporte'}
                   </button>
                </form>
              </>
            ) : (
              <div className="animate-in zoom-in duration-500">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-3xl font-bold mb-4">¡Reporte solicitado!</h3>
                <p className="text-zinc-400">Revisa tu bandeja de entrada en unos minutos. Un experto de Webunica analizará tus números.</p>
              </div>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
