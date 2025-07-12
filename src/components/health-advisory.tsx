import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HeartPulse, ArrowRight, Info } from 'lucide-react';
import Image from 'next/image';

const PurifierIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <path d="M12 8h.01" />
    <path d="M9 8h.01" />
    <path d="M15 8h.01" />
    <path d="M9 13c.5-1 1.5-2 3-2s2.5 1 3 2" />
    <path d="M9 17c.5-1 1.5-2 3-2s2.5 1 3 2" />
  </svg>
);

const CarFilterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="1" />
    <path d="M3 8h18" />
    <path d="M3 16h18" />
    <path d="M8 3v18" />
    <path d="M16 3v18" />
  </svg>
);

const MaskIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 12.5C2.5 12.5 5 15.5 12 15.5s9.5-3 9.5-3" />
    <path d="M4 12V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" />
  </svg>
);

const StayIndoorIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const advisoryActions = [
    { icon: <PurifierIcon className="h-8 w-8 text-muted-foreground" />, title: 'Use Purifier', subtitle: 'Turn On', active: true },
    { icon: <CarFilterIcon className="h-8 w-8 text-muted-foreground" />, title: 'Car Filter', subtitle: 'Must' },
    { icon: <MaskIcon className="h-8 w-8 text-muted-foreground" />, title: 'N95 Mask', subtitle: 'Must' },
    { icon: <StayIndoorIcon className="h-8 w-8 text-muted-foreground" />, title: 'Stay Indoor', subtitle: 'Must' },
];

export function HealthAdvisory() {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Health Advisory</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg bg-gray-800 p-4 md:p-6 text-white dark:bg-card">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="space-y-2 text-center flex-1">
                <p className="text-5xl font-bold text-red-500">1</p>
                <p className="text-sm text-gray-300 dark:text-muted-foreground">cigarettes per day</p>
              </div>
              <div className="flex items-center justify-center flex-1">
                <Image
                  src="https://placehold.co/150x50.png"
                  alt="Illustration of a lit cigarette"
                  width={150}
                  height={50}
                  data-ai-hint="cigarette smoking"
                  className="object-contain"
                />
              </div>
            </div>
            <div className="mt-4 flex flex-col sm:flex-row justify-between border-t border-gray-700 pt-4 text-sm dark:border-border">
              <p className="text-gray-300 dark:text-muted-foreground">Weekly <span className="font-bold text-red-500">7 cigarettes</span></p>
              <p className="text-gray-300 dark:text-muted-foreground">Monthly <span className="font-bold text-red-500">30 cigarettes</span></p>
            </div>
            <div className="mt-4 text-right text-xs text-gray-400 flex items-center justify-end gap-1 dark:text-muted-foreground">
              <span>Source: Berkeley Earth</span>
              <Info className="h-3 w-3" />
            </div>
          </div>
  
          <p className="text-center text-muted-foreground text-sm">
            As per the last 24hrs PM2.5 Levels, Breathing in this location is like smoking <span className="font-bold text-foreground">1 cigarettes a day.</span>
          </p>
  
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-4">
            {advisoryActions.map((action, index) => (
              <div key={index} className={`rounded-lg p-2 md:p-4 flex flex-col items-center justify-center space-y-1 text-center ${action.active ? 'bg-primary/10 ring-2 ring-primary' : 'bg-muted'}`}>
                {action.icon}
                <p className="font-semibold text-xs md:text-sm">{action.title}</p>
                <p className="text-xs text-muted-foreground">{action.subtitle}</p>
              </div>
            ))}
          </div>
  
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Must turn on the air purifier to enjoy fresh air.
              <a href="#" className="text-primary font-semibold ml-1">Get a purifier &rarr;</a>
            </p>
          </div>
  
          <Button size="lg" className="w-full h-16 bg-blue-500 hover:bg-blue-600 text-primary-foreground transition ease-in-out duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <HeartPulse className="h-8 w-8" />
                <div className="text-left">
                  <p className="font-bold">Check</p>
                  <p className="text-sm font-normal">Your Health Condition</p>
                </div>
              </div>
              <div className="bg-white/20 rounded-full p-2">
                <ArrowRight className="h-5 w-5" />
              </div>
            </div>
          </Button>
        </CardContent>
      </Card>
    );
}
