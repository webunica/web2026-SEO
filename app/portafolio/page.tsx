"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('Todas');

  const categories = ['Todas', 'Shopify', 'Inmobiliaria', 'SaaS', 'PYMES'];

  const projects = [
    {
      name: 'SoloCasasChile.com',
      category: 'Inmobiliaria',
      subCategory: 'SaaS / PropTech',
      description: 'Marketplace líder en casas prefabricadas con filtros avanzados y gestión de leads.',
      link: 'https://solocasaschile.com',
      featured: true,
      image: '🏘️'
    },
    { name: 'Oster Chile', category: 'Shopify', link: 'https://oster.cl', image: '🍳' },
    { name: 'KitchenAid Chile', category: 'Shopify', link: 'https://kitchenaid.cl', image: '🥣' },
    { name: 'Ballerina', category: 'Shopify', link: 'https://ballerina.cl', image: '🧴' },
    { name: 'Graco Chile', category: 'Shopify', link: 'https://graco.cl', image: '👶' },
    { name: 'Dr. Scholl\'s Chile', category: 'Shopify', link: 'https://drscholls.cl', image: '👟' },
    { name: 'El Volcan', category: 'Shopify', link: 'https://elvolcan.cl', image: '🏺' },
    { name: 'Bestial', category: 'Shopify', link: 'https://bestial.cl', image: '🐾' },
    { name: 'Decala', category: 'Shopify', link: 'https://decala.cl', image: '👗' },
    { name: 'Isapre Joven', category: 'Shopify', link: 'https://isaprejoven.cl', image: '🏥' },
    { name: 'Tienda Elun', category: 'Shopify', link: 'https://tiendaelun.cl', image: '🎁' },
    { name: 'Gomas Chile', category: 'Shopify', link: 'https://gomaschile.cl', image: '🚜' },
    { name: 'Re-Store', category: 'Shopify', link: 'https://re-store.cl', image: '♻️' },
    { name: 'Maslow', category: 'Shopify', link: 'https://maslow.cl', image: '🧠' },
    { name: 'First Chile', category: 'Shopify', link: 'https://firstchile.cl', image: '🥇' },
    { name: 'Sube Carritos', category: 'Shopify', link: 'https://subecarritos.cl', image: '🛒' },
    { name: 'Capi', category: 'Shopify', link: 'https://capi.cl', image: '⚓' },
    { name: 'Venta de Bodega Online', category: 'Shopify', link: 'https://ventadebodegaonline.cl', image: '📦' },
    { name: 'El Mercado del Tatuaje', category: 'Shopify', link: 'https://mercado-tatuaje.cl', image: '🎨' }
  ];

  const filteredProjects = activeCategory === 'Todas' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans antialiased">
      <main className="pt-32 pb-20">
        {/* Decorative Header */}
        <section className="relative px-6 py-20 lg:pt-32 lg:pb-48 overflow-hidden bg-zinc-950 text-white rounded-b-[4rem] lg:rounded-b-[6rem]">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/10 blur-[150px] rounded-full -z-10" />
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <h1 className="text-6xl lg:text-9xl font-black tracking-tighter leading-none mb-8 uppercase">
              PORTAFOLIO <br/><span className="text-zinc-500 font-serif italic lowercase font-light">de Éxito</span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
              Transformamos marcas a través de ingeniería web de élite. Explora cómo hemos impulsado a más de 50 empresas en Chile y el mundo.
            </p>
            <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-white/5">
                <Image 
                    src="/portfolio_showcase_premium_1776268133984.png"
                    alt="Webunica Portfolio Showcase"
                    width={1200}
                    height={600}
                    className="w-full h-auto"
                />
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="max-w-7xl mx-auto px-6 mt-20 mb-16">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${activeCategory === cat ? 'bg-zinc-900 text-white shadow-xl scale-105' : 'bg-zinc-50 text-zinc-500 hover:bg-zinc-100'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Projects Grid */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <a
                key={index}
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className={`group relative overflow-hidden rounded-[2.5rem] border border-zinc-100 bg-zinc-50 hover:border-zinc-300 transition-all p-8 flex flex-col justify-between h-[400px] shadow-sm hover:shadow-2xl ${project.featured ? 'lg:col-span-2 bg-zinc-900 text-white border-zinc-800' : ''}`}
              >
                <div>
                   <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-inner ${project.featured ? 'bg-white/10' : 'bg-white'}`}>
                      {project.image}
                   </div>
                   <div className="flex items-center gap-2 mb-2">
                     <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${project.featured ? 'bg-emerald-500 text-white' : 'bg-zinc-200 text-zinc-600'}`}>
                        {project.category}
                     </span>
                     {project.subCategory && (
                        <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-blue-500 text-white">
                           {project.subCategory}
                        </span>
                     )}
                   </div>
                   <h3 className={`text-2xl font-black mb-4 ${project.featured ? 'text-4xl lg:text-5xl' : ''}`}>
                      {project.name}
                   </h3>
                   {project.description && (
                      <p className="text-zinc-400 font-light text-lg max-w-md">{project.description}</p>
                   )}
                </div>
                
                <div className="flex items-center justify-between mt-8">
                   <span className={`text-sm font-bold ${project.featured ? 'text-zinc-400' : 'text-zinc-400'} group-hover:text-current transition-colors italic font-serif`}>
                      Explorar sitio web
                   </span>
                   <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${project.featured ? 'bg-white text-zinc-950 group-hover:bg-emerald-500 group-hover:text-white' : 'bg-zinc-950 text-white group-hover:scale-110'}`}>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                   </div>
                </div>
                
                {/* Decorative Pattern for featured project */}
                {project.featured && (
                   <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full -z-0" />
                )}
              </a>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-32 max-w-4xl mx-auto px-6 text-center">
           <h2 className="text-4xl font-extrabold mb-8 tracking-tight">¿Listo para ser nuestro próximo <br/><span className="text-emerald-600">Caso de Éxito?</span></h2>
           <p className="text-lg text-zinc-500 mb-12 max-w-xl mx-auto font-light leading-relaxed">
              No importa si eres una gran marca o una PYME con ambición. Tenemos la ingeniería necesaria para escalar tus resultados.
           </p>
           <a 
            href="https://calendly.com/javiermillar/reunion-webunica" 
            target="_blank"
            className="inline-block px-12 py-6 bg-zinc-950 text-white font-bold text-lg rounded-2xl hover:scale-105 transition-all shadow-xl"
           >
              Agendar mi Evaluación Gratuita
           </a>
        </section>
      </main>
    </div>
  );
}
