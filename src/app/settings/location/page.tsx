import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Trash2 } from 'lucide-react';

export default function LocationSettingsPage() {
  const savedLocations = [
    { name: 'Delhi, India' },
    { name: 'Mumbai, India' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Location Settings</h3>
        <p className="text-sm text-muted-foreground">
          Manage your saved locations for quick access.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Saved Locations</CardTitle>
          <CardDescription>
            These locations appear on your dashboard for quick AQI checks.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {savedLocations.map((location) => (
            <div key={location.name} className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <span>{location.name}</span>
              </div>
              <Button variant="ghost" size="icon">
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ))}
          <Button className="w-full">Add New Location</Button>
        </CardContent>
      </Card>
    </div>
  );
}
