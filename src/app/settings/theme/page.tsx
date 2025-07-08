import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export default function ThemeSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Theme</h3>
        <p className="text-sm text-muted-foreground">
          Select the theme for the application.
        </p>
      </div>
      <RadioGroup defaultValue="dark" className="space-y-2">
        <Label className="flex items-center gap-2 border rounded-md p-4 cursor-pointer">
          <RadioGroupItem value="light" id="light" />
          <span>Light</span>
        </Label>
        <Label className="flex items-center gap-2 border rounded-md p-4 cursor-pointer">
          <RadioGroupItem value="dark" id="dark" />
          <span>Dark</span>
        </Label>
         <Label className="flex items-center gap-2 border rounded-md p-4 cursor-pointer">
          <RadioGroupItem value="system" id="system" />
          <span>System</span>
        </Label>
      </RadioGroup>
    </div>
  );
}
