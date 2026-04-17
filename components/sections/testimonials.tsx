'use client';
 
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import Link from 'next/link';
import { getTestimonials, Testimonial } from '@/lib/testimonial-actions';
 
const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    quote: "Supabase es la mejor experiencia de producto que he tenido en años. No solo en cuanto a tecnología, sino también en cuanto a sabor. Desde la documentación hasta la latencia y la estructura de URL que te hace pensar 'ah, eso es obvio'.",
    author: "Marcos Valeria",
    stars: 5,
    active: true,
    created_at: new Date().toISOString()
  },
  {
    quote: "Siempre he trabajado con otras agencias, pero Webunica me entregó un proyecto en 2 semanas que los demás tardaban meses. Altamente recomendado.",
    author: "Andrea Castro",
    stars: 5,
    active: true,
    created_at: new Date().toISOString()
  },
  {
    quote: "Webunica no solo hace webs, hace máquinas de venta. El embudo para mi inmobiliaria captó 50 leads calificados en la primera semana de lanzamiento.",
    author: "Roberto Méndez",
    stars: 5,
    active: true,
    created_at: new Date().toISOString()
  },
  {
    quote: "Me encantan los asesores integrados de Webunica. Los analizadores de seguridad y rendimiento mejoran todo y aumentan mi confianza en lo que estoy desarrollando.",
    author: "Sofía Vargas",
    stars: 5,
    active: true,
    created_at: new Date().toISOString()
  },
  {
    quote: "Trabajar con Webunica ha sido una de las mejores experiencias de desarrollo que he tenido últimamente. Son increíblemente fáciles de entender.",
    author: "Felipe Arriagada",
    stars: 5,
    active: true,
    created_at: new Date().toISOString()
  },
  {
    quote: "Diseño, velocidad y estrategia. Webunica entiende que una web no es para verse bonita, sino para vender. Nuestra plataforma SaaS ahora escala de forma predecible.",
    author: "Javier Millar",
    stars: 5,
    active: true,
    created_at: new Date().toISOString()
  },
  {
    quote: "El sistema de blog con IA es una joya. Publicamos 10 artículos semanales y ya estamos en la primera página para palabras clave muy competitivas.",
    author: "Mónica Salas",
    stars: 5,
    active: true,
    created_at: new Date().toISOString()
  },
  {
    quote: "La velocidad de carga de nuestro nuevo embudo es increíble. Pasamos de perder leads por lentitud a captar el triple de contactos en menos de un mes.",
    author: "Carlos Ruiz",
    stars: 5,
    active: true,
    created_at: new Date().toISOString()
  },
];

// Distribuir tarjetas por columnas para efecto masonry real
function distributeIntoColumns<T>(items: T[], numCols: number): T[][] {
  const cols: T[][] = Array.from({ length: numCols }, () => []);
  items.forEach((item, i) => cols[i % numCols].push(item));
  return cols;
}

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      viewport={{ once: true }}
      className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 hover:border-violet-500/20 transition-all duration-300"
    >
      {/* Profile row */}
      <div className="flex items-center gap-3 mb-5">
        <div className="relative shrink-0">
          <div className="w-11 h-11 rounded-full bg-zinc-700 border border-white/10 flex items-center justify-center text-white font-bold text-base">
            {testimonial.author.charAt(0)}
          </div>
          <div className="absolute -top-1 -left-1 w-5 h-5 bg-black border border-zinc-800 rounded-[5px] flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 fill-white">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </div>
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-white font-semibold text-sm truncate">{testimonial.author}</span>
            <div className="w-3.5 h-3.5 bg-blue-500 rounded-full flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" className="w-2 h-2 fill-white"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
            </div>
          </div>
          <p className="text-zinc-600 text-[11px] font-medium">@{testimonial.author.split(' ')[0].toLowerCase()}_</p>
        </div>
      </div>

      {/* Quote */}
      <p className="text-zinc-400 text-[14px] leading-relaxed">{testimonial.quote}</p>

      {/* Footer */}
      <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
        <div className="flex gap-0.5">
          {[...Array(testimonial.stars)].map((_, i) => (
            <Star key={i} className="w-3 h-3 fill-violet-500 text-violet-500" />
          ))}
        </div>
        <time className="text-[9px] font-bold text-zinc-700 uppercase tracking-widest">
          {new Date(testimonial.created_at || Date.now()).toLocaleDateString('es-CL', { month: 'short', year: 'numeric' })}
        </time>
      </div>
    </motion.div>
  );
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    async function load() {
      const result = await getTestimonials();
      if (result.success && result.testimonials && result.testimonials.length > 0) {
        setTestimonials(result.testimonials.filter((t: any) => t.active));
      } else {
        setTestimonials(MOCK_TESTIMONIALS);
      }
    }
    load();
  }, []);

  const displayList = testimonials.length > 0 ? testimonials : MOCK_TESTIMONIALS;
  
  // 4 columnas en desktop, 2 en tablet, 1 en mobile
  const cols4 = distributeIntoColumns(displayList, 4);
  const cols2 = distributeIntoColumns(displayList, 2);
 
  return (
    <section className="bg-zinc-950 py-24 md:py-40 relative overflow-hidden">
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-violet-600/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Fade edges horizontales */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4">
            Wall of <em className="text-violet-500 not-italic font-serif font-normal">Love</em>
          </h2>
          <p className="text-zinc-500 text-sm">Historias reales de clientes que confiaron en nuestra visión digital.</p>
        </div>

        {/* Desktop: 4 columnas masonry */}
        <div className="hidden lg:grid grid-cols-4 gap-5 items-start">
          {cols4.map((col, ci) => (
            <div key={ci} className="flex flex-col gap-5">
              {col.map((testimonial, ti) => (
                <TestimonialCard
                  key={ti}
                  testimonial={testimonial}
                  index={ci * 3 + ti}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Tablet: 2 columnas masonry */}
        <div className="hidden md:grid lg:hidden grid-cols-2 gap-5 items-start">
          {cols2.map((col, ci) => (
            <div key={ci} className="flex flex-col gap-5">
              {col.map((testimonial, ti) => (
                <TestimonialCard
                  key={ti}
                  testimonial={testimonial}
                  index={ci * 4 + ti}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Mobile: 1 columna */}
        <div className="flex flex-col gap-5 md:hidden">
          {displayList.slice(0, 4).map((testimonial, i) => (
            <TestimonialCard key={i} testimonial={testimonial} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/mi-cuenta"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 text-zinc-400 text-[11px] font-bold uppercase tracking-widest hover:border-violet-500/50 hover:text-violet-400 transition-all"
          >
            ¿Eres cliente? Deja tu testimonio aquí
          </Link>
        </div>
      </div>
    </section>
  );
}
