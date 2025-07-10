import Link from 'next/link';
import { Logo } from '../logo';
import { UserMenu } from './user-menu';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
      <Link href="/" className="flex items-center gap-2 font-semibold">
        <Logo />
        <span className="">BreatheEasy</span>
      </Link>
      <UserMenu />
    </header>
  );
}
