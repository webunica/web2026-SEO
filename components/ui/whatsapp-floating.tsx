"use client";

import React from 'react';

interface WhatsAppFloatingProps {
  onClick: () => void;
}

export default function WhatsAppFloating({ onClick }: WhatsAppFloatingProps) {
  return (
    <div className="fixed bottom-8 right-8 z-[100] group">
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-4 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 pointer-events-none">
        <div className="bg-zinc-950 text-white text-[10px] font-black uppercase tracking-widest py-3 px-6 rounded-2xl shadow-2xl whitespace-nowrap border border-white/10">
          ¿Necesitas ayuda? ¡Conversemos! ⚡
        </div>
      </div>
      
      {/* Pulse Effect */}
      <div className="absolute inset-0 bg-[#25d366] rounded-full animate-ping opacity-25 scale-110" />
      
      {/* Main Button */}
      <button 
        onClick={onClick}
        className="relative bg-[#25d366] text-white p-5 rounded-full shadow-[0_20px_50px_rgba(37,211,102,0.4)] hover:shadow-[0_25px_60px_rgba(37,211,102,0.6)] hover:scale-110 active:scale-95 transition-all duration-300"
        aria-label="Contactar por WhatsApp"
      >
        <svg 
          className="w-8 h-8" 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.29-4.143c1.552.92 3.14 1.403 4.887 1.403 5.421 0 9.832-4.412 9.835-9.835.002-2.628-1.023-5.1-2.885-6.963-1.862-1.861-4.331-2.884-6.953-2.885-5.424 0-9.837 4.412-9.839 9.835-.001 1.83.524 3.614 1.517 5.176l-1.008 3.682 3.773-.99zm10.749-6.354c-.287-.144-1.701-.84-1.967-.936-.267-.096-.462-.144-.657.144-.195.288-.753.936-.922 1.129-.169.193-.338.216-.625.072-.287-.144-1.21-.447-2.305-1.423-.852-.76-1.427-1.7-1.593-1.987-.167-.287-.018-.443.126-.586.129-.129.287-.336.43-.504.144-.168.191-.288.287-.48.096-.192.048-.36-.024-.504-.072-.144-.657-1.585-.9-2.16-.234-.56-.475-.483-.655-.492-.17-.008-.364-.009-.558-.009s-.51.072-.776.36c-.267.288-1.018 1.008-1.018 2.459 0 1.45 1.056 2.855 1.203 3.048.147.193 2.078 3.174 5.035 4.453.703.305 1.252.487 1.68.623.709.226 1.354.194 1.864.118.57-.085 1.701-.696 1.944-1.368.243-.672.243-1.248.17-1.368-.073-.12-.267-.193-.554-.337z" />
        </svg>
      </button>
    </div>
  );
}
