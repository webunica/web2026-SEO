'use client';
 
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Link from 'next/link';
import { getTestimonials, Testimonial } from '@/lib/testimonial-actions';
 
const MOCK_TESTIMONIALS = [
  {
    quote: "Partnering with Webunica has dramatically increased our sales conversions. Their expert understanding of user paths and clear insight into our customers has completely transformed our online performance.",
    author: "SARAH - CEO FASHION BOUTIQUE",
    stars: 5,
    active: true
  },
  {
    quote: "La velocidad de carga de nuestro nuevo embudo es increíble. Pasamos de perder leads por lentitud a captar el triple de contactos en menos de un mes. Un cambio radical para nuestra agencia inmobiliaria.",
    author: "MARCOS - DIRECTOR INMOBILIARIA PREMIUM",
    stars: 5,
    active: true
  },
  {
    quote: "Diseño, velocidad y estrategia. Webunica entiende que una web no es para verse bonita, sino para vender. Nuestra plataforma SaaS ahora escala de forma predecible gracias a su arquitectura.",
    author: "JAVIER - CO-FOUNDER TECH STARTUP",
    stars: 5,
    active: true
  }
];
 
export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);

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
 
  return (
    <section className="bg-zinc-950 py-24 md:py-32 overflow-hidden rounded-[3rem] mx-4 my-4">
      <div className="max-w-7xl mx-auto px-6" ref={emblaRef}>
        <div className="flex">
          {displayList.map((testimonial, i) => (
            <div key={i} className="flex-[0_0_100%] min-w-0 flex flex-col items-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center text-center px-4 md:px-20"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-orange-300 text-orange-300" />
                  ))}
                </div>
 
                {/* Quote */}
                <blockquote className="max-w-3xl mx-auto mb-8">
                  <p className="text-2xl md:text-4xl lg:text-5xl text-white font-serif italic leading-[1.2] tracking-tight">
                    "{testimonial.quote}"
                  </p>
                </blockquote>
 
                {/* Author */}
                <cite className="not-italic">
                  <span className="text-zinc-500 text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em]">
                    ~ {testimonial.author} ~
                  </span>
                </cite>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
 
      {/* Navigation Indicators (Dots) */}
      <div className="flex flex-col items-center gap-8 mt-16">
        <div className="flex justify-center gap-2">
          {displayList.map((_, i) => (
            <div key={i} className="w-1 h-1 rounded-full bg-zinc-800" />
          ))}
        </div>
        
        <Link 
          href="/mi-cuenta" 
          className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 hover:text-violet-400 transition-colors border-b border-zinc-800 pb-1"
        >
          ¿Eres cliente? Deja tu testimonio aquí
        </Link>
      </div>
    </section>
  );
}
