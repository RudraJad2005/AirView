import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';

export function LandingHeader() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center border-b">
      <Link href="/" className="flex items-center justify-center gap-2">
        <Logo />
        <span className="font-semibold">BreatheEasy</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Button asChild variant="outline">
          <Link href="/dashboard">
            View Dashboard
          </Link>
        </Button>
      </nav>
    </header>
  );
}
