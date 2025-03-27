declare namespace NodeJS {
  interface Process {
    env: {
      NEXT_PUBLIC_SUPABASE_URL: string;
      NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
      [key: string]: string | undefined;
    };
  }

  interface ProcessEnv {
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
    [key: string]: string | undefined;
  }
}
