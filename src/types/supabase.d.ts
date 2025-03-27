declare module '@supabase/ssr' {
  import { SupabaseClient } from '@supabase/supabase-js';

  export interface CookieOptions {
    domain?: string;
    expires?: Date;
    httpOnly?: boolean;
    path?: string;
    sameSite?: 'lax' | 'strict' | 'none';
    secure?: boolean;
  }

  export interface CookieMethods {
    get(name: string): string | undefined;
    set(name: string, value: string, options: CookieOptions): void;
    remove(name: string, options: CookieOptions): void;
  }

  export function createServerClient(
    supabaseUrl: string,
    supabaseKey: string,
    options: { cookies: CookieMethods }
  ): SupabaseClient;
}
