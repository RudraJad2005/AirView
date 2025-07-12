import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, BrainCircuit, ShieldCheck, Wind } from "lucide-react";
import Image from "next/image";
import { NationalAqiSnapshot } from "@/components/national-aqi-snapshot";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-12 md:gap-16 lg:gap-20">
      <section className="text-center">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl xl:text-6xl">
              Clearer Skies, Healthier Lives.
            </h1>
            <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
              BreatheEasy provides real-time air quality data, AI-powered forecasts, and personalized health advice for all of India.
            </p>
          </div>
          <div className="mt-8 flex justify-center gap-4">
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
      </section>

      <section className="relative container mx-auto px-4">
        <Image
          src="https://placehold.co/1200x600.png"
          alt="Map of India showing various AQI data points"
          width={1200}
          height={600}
          className="rounded-xl shadow-2xl"
          data-ai-hint="India map city lights"
        />
      </section>

      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Features at a Glance</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Everything you need to stay informed and protected from air pollution.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <Wind className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Real-Time AQI Data</h3>
            <p className="mt-2 text-muted-foreground">
              Access up-to-the-minute Air Quality Index readings from cities across India.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <BrainCircuit className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">AI-Powered Forecasts</h3>
            <p className="mt-2 text-muted-foreground">
              Get predictive insights into future air quality trends to plan your activities.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <ShieldCheck className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Personalized Health Advice</h3>
            <p className="mt-2 text-muted-foreground">
              Receive tailored recommendations based on your health profile and local AQI.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <NationalAqiSnapshot />
      </section>

      <section>
        <Card className="bg-primary text-primary-foreground">
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
