import { Logo } from '@/components/logo';

export function AppLoader() {
  return (
    <div className="fixed inset-0 z-[200] flex h-screen w-screen flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4 animate-pulse">
        <Logo />
        <p className="text-lg font-semibold text-muted-foreground">BreatheEasy</p>
      </div>
    </div>
  );
}
