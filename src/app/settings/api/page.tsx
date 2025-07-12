
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, RefreshCw } from "lucide-react";

const sampleResponse = `{
  "city": "Delhi",
  "state": "Delhi",
  "aqi": 185,
  "mainPollutant": "PM2.5",
  "pollutants": {
    "PM2.5": 185,
    "PM10": 110,
    "O3": 45,
    "NO2": 60,
    "SO2": 30,
    "CO": 9
  },
  "lastUpdated": "2024-07-12T10:00:00Z"
}`;

export default function ApiSettingsPage() {
  const mockApiKey = "bea_live_sk_xxxxxxxxxxxxxxxxxxxxxxxx";

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Developer API</h3>
        <p className="text-sm text-muted-foreground">
          Integrate BreatheEasy's air quality data into your applications.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your API Key</CardTitle>
          <CardDescription>
            Use this key to authenticate your API requests. Keep it secret!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 rounded-md bg-muted p-3">
            <p className="font-mono text-sm flex-1 break-all">{mockApiKey}</p>
            <Button variant="ghost" size="icon">
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            This is a mock API key for demonstration purposes. Functionality to generate real keys is not yet implemented.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>API Endpoint</CardTitle>
          <CardDescription>
            Make a GET request to this endpoint to fetch AQI data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md bg-muted p-3">
            <code className="text-sm font-mono">
              https://api.breatheeasy.app/v1/location?city=Delhi
            </code>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Sample Response</CardTitle>
          <CardDescription>
            You will receive a JSON object in the following format.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="rounded-md bg-muted p-4 text-sm overflow-x-auto">
            <code>
              {sampleResponse}
            </code>
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
