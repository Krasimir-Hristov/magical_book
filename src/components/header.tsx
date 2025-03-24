import { MainNav } from '@/components/navigation/main-nav';
import { MobileNav } from '@/components/navigation/mobile-nav';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

export function Header() {
  return (
    <header className='sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-16 max-w-screen-xl items-center justify-between mx-auto px-4 sm:px-6 lg:px-8'>
        <MainNav />
        <MobileNav />
        <div className='flex items-center space-x-4'>
          <div className='flex items-center'>
            <DropdownMenu>
              <DropdownMenuTrigger className='overflow-hidden rounded-full'>
                <Avatar className='h-8 w-8'>
                  <AvatarImage src='/placeholder-avatar.jpg' alt='@username' />
                  <AvatarFallback>ПК</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuLabel>Моят акаунт</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href='/account'>Профил</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href='/library'>Моите книги</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href='/account#settings'>Настройки</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Изход</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
