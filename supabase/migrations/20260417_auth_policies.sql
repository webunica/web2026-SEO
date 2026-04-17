-- Update testimonials table for Auth
ALTER TABLE public.testimonials ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);

-- Update RLS policies
DROP POLICY IF EXISTS "Allow public select active" ON public.testimonials;
CREATE POLICY "Allow public select active" ON public.testimonials
    FOR SELECT 
    USING (active = true);

-- Allow users to manage their OWN testimonials
CREATE POLICY "Allow users manage own" ON public.testimonials
    FOR ALL
    USING (auth.uid() = user_id);

-- Admins should still manage all
-- We can identify admins by their email or a role in a profiles table.
-- For simplicity, let's assume if it's the admin email.
CREATE POLICY "Allow admins manage all" ON public.testimonials
    FOR ALL
    USING (auth.jwt() ->> 'email' = 'javiermillarv@gmail.com'); 
