import { createBrowserClient } from '@supabase/ssr';

export const createClientSide = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Липсват Supabase environment променливи');
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
};
