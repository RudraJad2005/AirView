import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { LandingHeader } from '@/components/layout/landing-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Monitor, HeartPulse, LineChart, ShieldCheck, MapPin, BarChart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <LandingHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    BreatheEasy India
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Your personal guide to air quality. Get real-time AQI data, personalized health advice, and stay informed about air pollution in your city.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/dashboard">
                      Check Your City's AQI
                    </Link>
                  </Button>
                </div>
              </div>
              <Image
                src="https://placehold.co/600x400.png"
                width={600}
                height={400}
                alt="A clean, modern city skyline with clear blue skies."
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                data-ai-hint="clean air city"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything You Need to Know About the Air You Breathe</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our app provides comprehensive tools and data to help you stay safe and healthy.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:grid-cols-3 lg:gap-12 mt-12">
              <div className="grid gap-1 text-center">
                <Monitor className="h-10 w-10 mx-auto text-primary" />
                <h3 className="text-lg font-bold">Real-Time AQI</h3>
                <p className="text-sm text-muted-foreground">Get up-to-the-minute air quality data for cities across India.</p>
              </div>
              <div className="grid gap-1 text-center">
                <HeartPulse className="h-10 w-10 mx-auto text-primary" />
                <h3 className="text-lg font-bold">Personalized Health Advice</h3>
                <p className="text-sm text-muted-foreground">Receive AI-powered recommendations based on your health and local air quality.</p>
              </div>
              <div className="grid gap-1 text-center">
                <LineChart className="h-10 w-10 mx-auto text-primary" />
                <h3 className="text-lg font-bold">Historical Data</h3>
                <p className="text-sm text-muted-foreground">Track AQI trends over time with our interactive charts.</p>
              </div>
              <div className="grid gap-1 text-center">
                <ShieldCheck className="h-10 w-10 mx-auto text-primary" />
                <h3 className="text-lg font-bold">Pollutant Breakdown</h3>
                <p className="text-sm text-muted-foreground">Understand the key pollutants in your area and their effects.</p>
              </div>
              <div className="grid gap-1 text-center">
                <MapPin className="h-10 w-10 mx-auto text-primary" />
                <h3 className="text-lg font-bold">Nationwide Coverage</h3>
                <p className="text-sm text-muted-foreground">Monitor air quality in major cities across the country.</p>
              </div>
              <div className="grid gap-1 text-center">
                <BarChart className="h-10 w-10 mx-auto text-primary" />
                <h3 className="text-lg font-bold">Easy to Understand</h3>
                <p className="text-sm text-muted-foreground">Complex data presented in a simple, visual format.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">How It Works</div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Three Simple Steps to Cleaner Air Awareness</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our dashboard is designed to be intuitive and easy to navigate. Get the information you need in just a few clicks.
              </p>
              <ul className="grid gap-4">
                <li className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">1</div>
                  <div className="grid gap-1">
                    <h3 className="text-lg font-bold">Select Your City</h3>
                    <p className="text-muted-foreground">Choose from a list of major Indian cities to see its current air quality status.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">2</div>
                  <div className="grid gap-1">
                    <h3 className="text-lg font-bold">Explore the Data</h3>
                    <p className="text-muted-foreground">View the AQI, key pollutants, and historical trends on an interactive dashboard.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">3</div>
                  <div className="grid gap-1">
                    <h3 className="text-lg font-bold">Get Personalized Advice</h3>
                    <p className="text-muted-foreground">Enter your health profile to receive tailored advice on how to protect yourself.</p>
                  </div>
                </li>
              </ul>
            </div>
            <Image
              src="https://placehold.co/600x600.png"
              width={600}
              height={600}
              alt="Screenshot of the BreatheEasy dashboard"
              className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
              data-ai-hint="app dashboard"
            />
          </div>
        </section>

        {/* Understanding AQI Section */}
        <section id="understanding-aqi" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Understanding the AQI Scale</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  The Air Quality Index (AQI) is a scale used to report the quality of the air. Here's what the numbers and colors mean.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-4xl gap-6 mt-12 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-green-500/10 border-green-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Good</span>
                    <Badge className="bg-green-500 text-white">0-50</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Air quality is satisfactory, and air pollution poses little or no risk.</p>
                </CardContent>
              </Card>
              <Card className="bg-yellow-500/10 border-yellow-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Moderate</span>
                    <Badge className="bg-yellow-500 text-white">51-100</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Air quality is acceptable. However, there may be a risk for some people.</p>
                </CardContent>
              </Card>
              <Card className="bg-orange-500/10 border-orange-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Unhealthy (Sensitive)</span>
                    <Badge className="bg-orange-500 text-white">101-150</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Members of sensitive groups may experience health effects.</p>
                </CardContent>
              </Card>
              <Card className="bg-red-500/10 border-red-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Unhealthy</span>
                    <Badge className="bg-red-500 text-white">151-200</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Some members of the general public may experience health effects.</p>
                </CardContent>
              </Card>
              <Card className="bg-purple-500/10 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Very Unhealthy</span>
                    <Badge className="bg-purple-500 text-white">201-300</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Health alert: The risk of health effects is increased for everyone.</p>
                </CardContent>
              </Card>
              <Card className="bg-red-900/10 border-red-900/30">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Hazardous</span>
                    <Badge className="bg-red-900 text-white">301+</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Health warning of emergency conditions: everyone is more likely to be affected.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="cta" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Take Control of Your Health</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Ready to start monitoring the air you breathe? Check the dashboard now to see the air quality in your city.
                </p>
              </div>
              <Button asChild size="lg">
                <Link href="/dashboard">
                  Go to Dashboard
                </Link>
              </Button>
            </div>
          </div>
        </section>

      </main>
      <footer className="flex items-center justify-center py-6">
        <p className="text-xs text-muted-foreground">&copy; 2024 BreatheEasy India. All rights reserved.</p>
      </footer>
    </div>
  );
}
