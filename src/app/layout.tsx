import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { AppHeader } from '@/components/layout/app-header';
import { AppLoadingProvider } from '@/components/layout/app-loading-provider';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'BreatheEasy India',
  description: 'Monitor AQI levels across India with personalized health advice.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppLoadingProvider>
            <div className="relative flex min-h-screen w-full flex-col">
              <AppHeader />
              <main className="flex-1 p-4 pb-20 md:p-8 md:pb-20">
                {children}
              </main>
              <AppSidebar />
            </div>
          </AppLoadingProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
