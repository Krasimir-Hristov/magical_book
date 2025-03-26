import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';

export function GoogleAuthButton() {
  const handleGoogleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        console.error('Error logging in with Google:', error.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Button onClick={handleGoogleLogin} className='w-full' variant='outline'>
      Влез с Google
    </Button>
  );
}
