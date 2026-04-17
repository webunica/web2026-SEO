import React, { Suspense } from 'react';
import { UpdatePasswordForm } from './update-password-form';
import { Loader2 } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Actualizar Contraseña | Webunica',
  description: 'Establece una nueva contraseña para tu cuenta de Webunica.',
};

export default function UpdatePasswordPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden font-sans">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-100/50 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100/50 blur-[150px] rounded-full translate-y-1/2 -translate-x-1/2" />
      
      <Suspense fallback={
        <div className="flex items-center justify-center py-20 relative z-10">
          <Loader2 className="w-10 h-10 text-violet-600 animate-spin" />
        </div>
      }>
        <UpdatePasswordForm />
      </Suspense>
    </div>
  );
}
