import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';

export function GoogleSignIn() {
  const handleSignIn = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) {
        console.error('Error:', error.message);
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <Button onClick={handleSignIn} className='w-full' variant='outline'>
      Вход с Google
    </Button>
  );
}
