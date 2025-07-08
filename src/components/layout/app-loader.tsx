import { Logo } from '@/components/logo';

export function AppLoader() {
  return (
    <div className="fixed inset-0 z-[200] flex h-screen w-screen flex-col items-center justify-center bg-background overflow-hidden">
      <div className="relative z-10 flex flex-col items-center gap-4 animate-breathe">
        <Logo />
        <p className="text-lg font-semibold text-muted-foreground">BreatheEasy</p>
      </div>
    </div>
  );
}
