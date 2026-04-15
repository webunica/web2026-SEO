'use server';

import { supabase } from '@/lib/supabase/client';
import { revalidatePath } from 'next/cache';

export async function saveBlogPost(postData: {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  seo_title?: string;
  seo_description?: string;
  cover_image?: string;
  cover_image_alt?: string;
  cover_image_prompt?: string; // generado por openai pero NO en DB
  category_id?: string;
  status?: 'draft' | 'published';
}) {
  if (!supabase) {
    throw new Error('DB no disponible. Configura NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY en Vercel.');
  }

  // Sólo los campos que existen en la tabla blog_posts
  const insertData = {
    title: postData.title,
    slug: postData.slug,
    content: postData.content,
    excerpt: postData.excerpt || null,
    seo_title: postData.seo_title || null,
    seo_description: postData.seo_description || null,
    cover_image: postData.cover_image || null,
    cover_image_alt: postData.cover_image_alt || null,
    category_id: postData.category_id || null,
    status: postData.status || 'published',
    published_at: new Date().toISOString(),
  };

  // Verificar si el slug ya existe
  const { data: existing } = await supabase
    .from('blog_posts')
    .select('id')
    .eq('slug', insertData.slug)
    .maybeSingle();

  if (existing) {
    insertData.slug = `${insertData.slug}-${Date.now().toString().slice(-4)}`;
  }

  console.log('[saveBlogPost] Insertando post:', insertData.title);

  const { data, error } = await supabase
    .from('blog_posts')
    .insert([insertData])
    .select()
    .single();

  if (error) {
    console.error('[saveBlogPost] Error:', error);
    throw new Error(`Error de base de datos: ${error.message}`);
  }

  console.log('[saveBlogPost] Post guardado con ID:', data.id);

  revalidatePath('/blog');
  revalidatePath(`/blog/${data.slug}`);

  return { success: true, post: data };
}
