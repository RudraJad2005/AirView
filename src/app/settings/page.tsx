import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Notifications</h3>
        <p className="text-sm text-muted-foreground">
          Configure how you receive notifications.
        </p>
      </div>
      <div className="space-y-4">
        <div className="flex flex-row items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <Label className="text-base">High AQI Alerts</Label>
            <p className="text-sm text-muted-foreground">
              Receive a push notification when AQI in your saved locations exceeds 150.
            </p>
          </div>
          <Switch aria-label="High AQI Alerts" />
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <Label className="text-base">Weekly Summary</Label>
            <p className="text-sm text-muted-foreground">
              Get a weekly summary of air quality trends.
            </p>
          </div>
          <Switch aria-label="Weekly Summary" />
        </div>
      </div>
    </div>
  );
}
