import React, { Suspense } from 'react';
import { GeneratorForm } from './generator-form';
import { Loader2 } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Generador de Artículos IA | Blog Admin',
  description: 'Herramienta de generación de contenido SEO mediante Inteligencia Artificial.',
};

export default function BlogGeneratorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-violet-600 animate-spin" />
      </div>
    }>
      <GeneratorForm />
    </Suspense>
  );
}
