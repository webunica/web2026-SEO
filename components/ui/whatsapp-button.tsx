"use client";

import React from 'react';
import { useContactModal } from '@/context/contact-modal-context';

interface WhatsAppButtonProps {
  children: React.ReactNode;
  className?: string;
}

export default function WhatsAppButton({ children, className }: WhatsAppButtonProps) {
  const { openWhatsApp } = useContactModal();

  return (
    <button 
      onClick={(e) => {
        e.preventDefault();
        openWhatsApp();
      }}
      className={className}
    >
      {children}
    </button>
  );
}
