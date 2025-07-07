import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Leaf, Wind, Sun, Cloud, Thermometer, AlertTriangle } from 'lucide-react'
import type { LocationData } from "@/types"

const pollutantIcons = {
  "PM2.5": <Wind className="h-6 w-6 text-muted-foreground" />,
  "PM10": <Cloud className="h-6 w-6 text-muted-foreground" />,
  "O3": <Sun className="h-6 w-6 text-muted-foreground" />,
  "NO2": <AlertTriangle className="h-6 w-6 text-muted-foreground" />,
  "SO2": <Thermometer className="h-6 w-6 text-muted-foreground" />,
  "CO": <Leaf className="h-6 w-6 text-muted-foreground" />,
};

interface KeyPollutantsProps {
  pollutants: LocationData['pollutants'];
}

export function KeyPollutants({ pollutants }: KeyPollutantsProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Key Pollutants</CardTitle>
        <CardDescription>Concentration of major pollutants in the air.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {pollutants.map((pollutant) => (
            <Card key={pollutant.name} className="bg-muted/40">
              <CardContent className="p-4 flex flex-col items-center justify-center gap-2">
                 {pollutantIcons[pollutant.name]}
                 <p className="text-lg font-bold">{pollutant.value}</p>
                 <p className="text-sm text-muted-foreground">{pollutant.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
