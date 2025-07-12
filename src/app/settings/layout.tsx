'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = {
    'Account': [
      { name: 'Notifications', href: '/settings' },
      { name: 'Theme', href: '/settings/theme' },
      { name: 'Location Settings', href: '/settings/location' },
    ],
    'Information': [
      { name: 'About', href: '/settings/about' },
      { name: 'Terms & Conditions', href: '/settings/terms' },
      { name: 'FAQ', href: '/settings/faq' },
    ],
    'For Developers': [
        { name: 'API', href: '/settings/api' },
    ]
  };

  const isLinkActive = (href: string) => {
    return pathname === href;
  };

  return (
    <div className="space-y-6">
      <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">Manage your account settings and set app preferences.</p>
      </div>
      <div className="grid md:grid-cols-[180px_1fr] lg:grid-cols-[220px_1fr] gap-10">
        <aside>
          <nav className="flex flex-col gap-4">
            {Object.entries(navItems).map(([category, items]) => (
              <div key={category}>
                <h3 className="text-base font-semibold text-muted-foreground mb-2 px-2">{category}</h3>
                <div className="flex flex-col gap-1">
                  {items.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        'text-foreground hover:bg-muted hover:text-foreground transition-colors px-2 py-1.5 rounded-md text-sm',
                        isLinkActive(item.href) ? 'bg-muted font-semibold' : 'text-muted-foreground'
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </aside>
        <main>{children}</main>
      </div>
    </div>
  );
}
