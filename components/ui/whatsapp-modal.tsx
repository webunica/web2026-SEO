"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WHATSAPP_NUMBER = "56984410379";

export default function WhatsAppModal({ isOpen, onClose }: WhatsAppModalProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    interest: "",
    name: "",
    phone: "",
    email: ""
  });

  const supabase = createClient();

  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setFormData({ interest: "", name: "", phone: "", email: "" });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (step === 1 && formData.interest) {
      setStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setLoading(true);
    try {
      // 1. Guardar en Supabase
      const { error } = await supabase
        .from('leads')
        .insert([
          {
            name: formData.name,
            phone: formData.phone,
            email: formData.email || null,
            project_type: formData.interest,
            source: 'WhatsApp Widget',
            status: 'new'
          }
        ]);

      if (error) throw error;

      // 2. Redirigir a WhatsApp
      const message = `Hola Webunica! Mi nombre es ${formData.name}. Me interesa: ${formData.interest}. Mi número es ${formData.phone}${formData.email ? ` y mi email es ${formData.email}` : ""}. Vengo de su sitio web y me gustaría conversar los detalles.`;
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
      
      window.open(whatsappUrl, '_blank');
      onClose();
    } catch (err) {
      console.error('Error saving lead:', err);
      // Igualmente redirigimos para no perder la venta
      const message = `Hola Webunica! Mi nombre es ${formData.name}. Me interesa: ${formData.interest}.`;
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-zinc-950/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div 
        className="bg-white w-full max-w-lg rounded-[3rem] shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-zinc-950 p-10 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/20 blur-[60px] rounded-full" />
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-zinc-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <div className="w-16 h-16 bg-[#25d366] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#25d366]/20">
             <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.29-4.143c1.552.92 3.14 1.403 4.887 1.403 5.421 0 9.832-4.412 9.835-9.835.002-2.628-1.023-5.1-2.885-6.963-1.862-1.861-4.331-2.884-6.953-2.885-5.424 0-9.837 4.412-9.839 9.835-.001 1.83.524 3.614 1.517 5.176l-1.008 3.682 3.773-.99zm10.749-6.354c-.287-.144-1.701-.84-1.967-.936-.267-.096-.462-.144-.657.144-.195.288-.753.936-.922 1.129-.169.193-.338.216-.625.072-.287-.144-1.21-.447-2.305-1.423-.852-.76-1.427-1.7-1.593-1.987-.167-.287-.018-.443.126-.586.129-.129.287-.336.43-.504.144-.168.191-.288.287-.48.096-.192.048-.36-.024-.504-.072-.144-.657-1.585-.9-2.16-.234-.56-.475-.483-.655-.492-.17-.008-.364-.009-.558-.009s-.51.072-.776.36c-.267.288-1.018 1.008-1.018 2.459 0 1.45 1.056 2.855 1.203 3.048.147.193 2.078 3.174 5.035 4.453.703.305 1.252.487 1.68.623.709.226 1.354.194 1.864.118.57-.085 1.701-.696 1.944-1.368.243-.672.243-1.248.17-1.368-.073-.12-.267-.193-.554-.337z" /></svg>
          </div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Contactar vía WhatsApp</h2>
          <p className="text-zinc-500 text-sm mt-2 font-light">Escríbenos directamente y resolvemos tus dudas.</p>
        </div>

        {/* Form Body */}
        <div className="p-10">
          {step === 1 ? (
            <div className="animate-in slide-in-from-right-8 duration-500">
              <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-6">¿Qué solución estás buscando?</label>
              <div className="grid grid-cols-1 gap-3 mb-10">
                {[
                  "Embudo de Venta",
                  "Tienda Shopify",
                  "Desarrollo Next.js / SaaS",
                  "SEO Técnico",
                  "Otro requerimiento"
                ].map((option) => (
                  <button
                    key={option}
                    onClick={() => setFormData({...formData, interest: option})}
                    className={`p-5 rounded-2xl border-2 text-left transition-all font-bold ${formData.interest === option ? 'border-violet-600 bg-violet-50 text-violet-600' : 'border-zinc-100 hover:border-zinc-200 text-zinc-900'}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <button
                onClick={handleNext}
                disabled={!formData.interest}
                className="w-full py-6 bg-zinc-950 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-800 transition-all"
              >
                Siguiente paso
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="animate-in slide-in-from-right-8 duration-500 space-y-6 text-zinc-950">
               <div className="grid grid-cols-1 gap-6">
                 <div>
                   <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Tu Nombre completo</label>
                   <input 
                     required
                     type="text" 
                     value={formData.name}
                     onChange={(e) => setFormData({...formData, name: e.target.value})}
                     className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl p-4 focus:outline-none focus:border-violet-600 transition-all placeholder:text-zinc-300"
                     placeholder="Ej: Javier Milllar"
                   />
                 </div>
                 <div>
                   <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">WhatsApp / Teléfono</label>
                   <input 
                     required
                     type="tel" 
                     value={formData.phone}
                     onChange={(e) => setFormData({...formData, phone: e.target.value})}
                     className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl p-4 focus:outline-none focus:border-violet-600 transition-all placeholder:text-zinc-300"
                     placeholder="Ej: +56912345678"
                   />
                 </div>
                 <div>
                   <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Email (Opcional)</label>
                   <input 
                     type="email" 
                     value={formData.email}
                     onChange={(e) => setFormData({...formData, email: e.target.value})}
                     className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl p-4 focus:outline-none focus:border-violet-600 transition-all placeholder:text-zinc-300"
                     placeholder="Ej: javier@empresa.cl"
                   />
                 </div>
               </div>
               
               <div className="pt-4 space-y-4">
                 <button
                   disabled={loading}
                   type="submit"
                   className="w-full py-6 bg-violet-600 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-violet-600/30 hover:bg-violet-700 transition-all scale-100 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3"
                 >
                   {loading ? (
                     <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                   ) : (
                     <>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.29-4.143c1.552.92 3.14 1.403 4.887 1.403 5.421 0 9.832-4.412 9.835-9.835.002-2.628-1.023-5.1-2.885-6.963-1.862-1.861-4.331-2.884-6.953-2.885-5.424 0-9.837 4.412-9.839 9.835-.001 1.83.524 3.614 1.517 5.176l-1.008 3.682 3.773-.99zm10.749-6.354c-.287-.144-1.701-.84-1.967-.936-.267-.096-.462-.144-.657.144-.195.288-.753.936-.922 1.129-.169.193-.338.216-.625.072-.287-.144-1.21-.447-2.305-1.423-.852-.76-1.427-1.7-1.593-1.987-.167-.287-.018-.443.126-.586.129-.129.287-.336.43-.504.144-.168.191-.288.287-.48.096-.192.048-.36-.024-.504-.072-.144-.657-1.585-.9-2.16-.234-.56-.475-.483-.655-.492-.17-.008-.364-.009-.558-.009s-.51.072-.776.36c-.267.288-1.018 1.008-1.018 2.459 0 1.45 1.056 2.855 1.203 3.048.147.193 2.078 3.174 5.035 4.453.703.305 1.252.487 1.68.623.709.226 1.354.194 1.864.118.57-.085 1.701-.696 1.944-1.368.243-.672.243-1.248.17-1.368-.073-.12-.267-.193-.554-.337z" /></svg>
                        Abrir WhatsApp Ahora
                     </>
                   )}
                 </button>
                 <button
                   type="button"
                   onClick={() => setStep(1)}
                   className="w-full py-4 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-zinc-600 transition-colors"
                 >
                   Volver al paso anterior
                 </button>
               </div>
            </form>
          )}
        </div>
        
        {/* Footer info */}
        <div className="bg-zinc-50 p-6 text-center border-t border-zinc-100">
           <p className="text-[9px] text-zinc-400 uppercase tracking-widest font-black flex items-center justify-center gap-2">
              <svg className="w-3 h-3 text-violet-500" fill="currentColor" viewBox="0 0 20 20"><path d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" /></svg>
              Tus datos están protegidos y seguros
           </p>
        </div>
      </div>
    </div>
  );
}
