'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { BlogPost } from '@/lib/blog';
import { BlogCard } from '@/components/blog/blog-card';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FeaturedBlogSectionProps {
  posts: BlogPost[];
}

export default function FeaturedBlogSection({ posts }: FeaturedBlogSectionProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback((emblaApi: any) => {
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  if (!posts || posts.length === 0) {
    return null;
  }

  const recentPosts = posts.slice(0, 8);

  return (
    <section className="py-24 md:py-32 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-100 border border-violet-200 mb-6">
            <span className="w-2 h-2 rounded-full bg-violet-600 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-violet-700">Explora nuestro Blog</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 uppercase leading-[0.9]">
            Últimas <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">Publicaciones</span>
          </h2>
        </motion.div>
        
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all ${
                canScrollPrev 
                  ? 'bg-white border-slate-200 text-slate-900 hover:border-violet-600 hover:text-violet-600 shadow-sm' 
                  : 'bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed'
              }`}
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all ${
                canScrollNext 
                  ? 'bg-white border-slate-200 text-slate-900 hover:border-violet-600 hover:text-violet-600 shadow-sm' 
                  : 'bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed'
              }`}
              aria-label="Siguiente"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <Link 
            href="/blog" 
            className="hidden sm:inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-full font-bold text-sm hover:bg-violet-600 transition-all group shadow-xl shadow-slate-900/10"
          >
            Ver todo
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      <div className="embla" ref={emblaRef}>
        <div className="flex gap-6 px-6 lg:px-[calc((100vw-80rem)/2+2rem)] cursor-grab active:cursor-grabbing">
          {recentPosts.map((post, i) => (
            <motion.div 
              key={post.id} 
              className="flex-[0_0_85%] md:flex-[0_0_400px] min-w-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <BlogCard post={post} />
            </motion.div>
          ))}
          {/* Spacer for end of carousel */}
          <div className="flex-[0_0_2rem] md:flex-[0_0_10vw] invisible" />
        </div>
      </div>

      <div className="container mx-auto px-6 mt-10 sm:hidden">
        <Link 
          href="/blog" 
          className="w-full inline-flex items-center justify-center gap-2 px-8 py-5 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-violet-600 transition-all"
        >
          Ver todo el blog
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
