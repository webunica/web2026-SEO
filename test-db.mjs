import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pereskyvymsyiqbihydj.supabase.co';
const supabaseAnonKey = 'sb_publishable_DlGqRTtFRbRidTplcMbMmw_6XgeFuuI';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkSchema() {
  const insertData = {
    title: 'Test Webunica',
    slug: 'test-webunica',
    content: 'test',
    status: 'published'
  };

  const { data, error } = await supabase
    .from('webunica_blog_posts')
    .insert([insertData])
    .select()
    .single();

  console.log('Error:', error);
  console.log('Data:', data);
}
checkSchema();
