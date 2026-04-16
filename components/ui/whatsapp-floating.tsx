"use client";

import React from 'react';
import Image from 'next/image';

interface WhatsAppFloatingProps {
  onClick: () => void;
}

export default function WhatsAppFloating({ onClick }: WhatsAppFloatingProps) {
  return (
    <div className="fixed top-[180px] right-0 z-[100] group">
      {/* Label Tooltip (Show on hover) */}
      <div className="absolute top-1/2 -translate-y-1/2 right-[70px] mr-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0 pointer-events-none">
        <div className="bg-zinc-950 text-white text-[10px] font-black uppercase tracking-widest py-3 px-6 rounded-2xl shadow-2xl whitespace-nowrap border border-white/10 relative">
          ¿En qué puedo ayudarte?
          <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-zinc-950 rotate-45 border-r border-t border-white/10" />
        </div>
      </div>
      
      {/* Main Avatar Button */}
      <button 
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onClick();
        }}
        className="relative bg-white border-2 border-zinc-100 p-1 rounded-l-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:shadow-[0_25px_60px_rgba(124,58,237,0.2)] hover:pl-4 transition-all duration-500 overflow-hidden flex items-center gap-3 active:scale-95 group/btn"
        aria-label="Contactar por WhatsApp"
      >
        <div className="relative w-14 h-14 rounded-2xl overflow-hidden shadow-inner flex-shrink-0">
          <Image 
            src="/whatsapp-avatar.png"
            alt="Asesor Webunica"
            fill
            className="object-cover"
          />
          <div className="absolute bottom-1 right-1 w-3 h-3 bg-[#25d366] rounded-full border-2 border-white animate-pulse" />
        </div>
        
        <div className="hidden group-hover:block pr-6 animate-in slide-in-from-right-4 duration-500">
           <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest leading-none mb-1">En línea</p>
           <p className="text-sm font-black text-zinc-950 whitespace-nowrap">Asesor Directo</p>
        </div>
      </button>

      {/* Decorative pulse glow */}
      <div className="absolute inset-0 -z-10 bg-violet-500/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}
