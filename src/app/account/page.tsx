import { AccountDashboard } from '@/components/account-dashboard';

export default function AccountPage() {
  return (
    <div className='container py-12'>
      <div className='flex flex-col space-y-6'>
        <h1 className='text-3xl font-bold tracking-tighter md:text-4xl'>
          Моят Акаунт
        </h1>
        <p className='max-w-[600px] text-muted-foreground md:text-xl/relaxed'>
          Управление на вашия акаунт и токени.
        </p>
      </div>
      <div className='py-10'>
        <AccountDashboard />
      </div>
    </div>
  );
}
