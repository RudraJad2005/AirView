import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LayoutGrid, BrainCircuit, ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex-1 space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Welcome to BreatheEasy</h1>
        <p className="text-xl text-muted-foreground">
          Your central hub for air quality monitoring and health insights across India.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <LayoutGrid className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle>Live AQI Dashboard</CardTitle>
                <CardDescription>View real-time air quality data from cities across India.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-muted-foreground mb-4">
              Explore an interactive dashboard with AQI trends, key pollutant information, and personalized health advice.
            </p>
          </CardContent>
          <CardFooter>
             <Button asChild>
              <Link href="/dashboard">
                Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <BrainCircuit className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle>AI-Powered Analytics</CardTitle>
                <CardDescription>Get AQI forecasts and actionable health guidance.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-muted-foreground mb-4">
                Leverage our AI to see future AQI predictions and receive tailored recommendations for staying safe and reducing pollution.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="/analytics">
                Explore Analytics <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
