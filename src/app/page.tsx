import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LayoutGrid, BrainCircuit, ArrowRight } from "lucide-react";

export default function HomePage() {
  const aqiLevels = [
    { name: 'Good', range: '0-50', implication: 'Air quality is satisfactory, and air pollution poses little or no risk.', color: 'bg-green-500' },
    { name: 'Moderate', range: '51-100', implication: 'Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.', color: 'bg-yellow-500' },
    { name: 'Poor', range: '101-150', implication: 'Members of sensitive groups may experience health effects. The general public is less likely to be affected.', color: 'bg-orange-500' },
    { name: 'Unhealthy for Sensitive Groups', range: '151-200', implication: 'Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects.', color: 'bg-red-500' },
    { name: 'Very Unhealthy', range: '201-300', implication: 'Health alert: The risk of health effects is increased for everyone.', color: 'bg-purple-500' },
    { name: 'Hazardous', range: '301+', implication: 'Health warning of emergency conditions: everyone is more likely to be affected.', color: 'bg-red-900' },
  ];

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

      <Card>
        <CardHeader>
          <CardTitle>Understanding the AQI Scale</CardTitle>
          <CardDescription>
            The Air Quality Index (AQI) is a yardstick that runs from 0 to 500. The higher the AQI value, the greater the level of air pollution and the greater the health concern.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          {aqiLevels.map((level) => (
            <div key={level.name} className="grid grid-cols-[20px_1fr_2fr] items-center gap-4">
              <div className={`h-3 w-3 rounded-full ${level.color}`} />
              <div>
                <p className="font-semibold">{level.name}</p>
                <p className="text-xs text-muted-foreground">({level.range})</p>
              </div>
              <p className="text-muted-foreground">{level.implication}</p>
            </div>
          ))}
        </CardContent>
      </Card>

    </div>
  );
}
