
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, BrainCircuit, ShieldCheck, Wind } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CurrentLocationAqi } from "@/components/home/current-location-aqi";
import { AqiDonutChart } from "@/components/home/aqi-donut-chart";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-12 md:gap-16 lg:gap-20">
      
      {/* --- Hero Section with Integrated Local AQI --- */}
      <section className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl xl:text-6xl">
              Clearer Skies, Healthier Lives.
            </h1>
            <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
              BreatheEasy provides real-time air quality data, AI-powered forecasts, and personalized health advice for all of India.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Button asChild size="lg">
                <Link href="/dashboard">
                  View Live Dashboard <ArrowRight className="ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/analytics">Explore AI Analytics</Link>
              </Button>
            </div>
          </div>
          <div className="w-full">
             <CurrentLocationAqi />
          </div>
        </div>
      </section>

      {/* --- National AQI Snapshot --- */}
      <section className="container mx-auto px-4">
        <AqiDonutChart />
      </section>

      {/* --- Features Section --- */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Features at a Glance</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Everything you need to stay informed and protected from air pollution.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <Card className="backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-primary/20 border-primary/20 hover:border-primary/50">
            <CardHeader className="items-center text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <Wind className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-xl">Real-Time AQI Data</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground">
              <p>Access up-to-the-minute Air Quality Index readings from cities across India.</p>
            </CardContent>
          </Card>
          <Card className="backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-primary/20 border-primary/20 hover:border-primary/50">
            <CardHeader className="items-center text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <BrainCircuit className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-xl">AI-Powered Forecasts</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground">
              <p>Get predictive insights into future air quality trends to plan your activities.</p>
            </CardContent>
          </Card>
          <Card className="backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-primary/20 border-primary/20 hover:border-primary/50">
            <CardHeader className="items-center text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <ShieldCheck className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-xl">Personalized Health Advice</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground">
              <p>Receive tailored recommendations based on your health profile and local AQI.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* --- Final CTA Section --- */}
      <section>
        <Card className="bg-primary text-primary-foreground backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-primary/20 border-primary/20 hover:border-primary/50">
          <CardContent className="p-8 md:p-12 text-center">
             <h2 className="text-3xl font-bold">Ready to take control of your health?</h2>
             <p className="mt-4 max-w-2xl mx-auto">
                Sign up for a free account to save your favorite locations, get personalized alerts, and access detailed analytics.
             </p>
             <Button asChild size="lg" variant="secondary" className="mt-8">
                 <Link href="/auth/signup">Create Your Free Account</Link>
             </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
