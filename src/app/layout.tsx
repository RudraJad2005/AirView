import type { Metadata } from 'next';
import './globals.css';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { AppHeader } from '@/components/layout/app-header';
import { AppLoadingProvider } from '@/components/layout/app-loading-provider';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { ErrorDialogProvider } from '@/components/layout/error-dialog-provider';
import { AuthProvider } from '@/components/layout/auth-provider';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

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
      <body className={`${inter.variable} font-body antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ErrorDialogProvider>
            <AuthProvider>
              <AppLoadingProvider>
                <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
                  <AppHeader />
                  <main className="flex-1 p-4 pb-24 md:p-8 md:pb-24">
                    {children}
                  </main>
                  <AppSidebar />
                </div>
              </AppLoadingProvider>
            </AuthProvider>
          </ErrorDialogProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
