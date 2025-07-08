"use client";

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { getPersonalizedHealthAdvice, PersonalizedHealthAdviceOutput } from '@/ai/flows/personalized-health-advice';
import type { LocationData } from '@/types';
import { Loader2, Sparkles } from 'lucide-react';
import { useErrorDialog } from '@/hooks/use-error-dialog';

interface HealthAdviceModalProps {
  location: LocationData;
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HealthAdviceModal({ location, children, open, onOpenChange }: HealthAdviceModalProps) {
  const [healthCondition, setHealthCondition] = useState('none');
  const [advice, setAdvice] = useState<PersonalizedHealthAdviceOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { showError } = useErrorDialog();

  const handleGetAdvice = async () => {
    setIsLoading(true);
    setAdvice(null);
    try {
      const result = await getPersonalizedHealthAdvice({
        aqi: location.aqi,
        location: location.city,
        healthCondition: healthCondition,
      });
      setAdvice(result);
    } catch (error) {
      console.error('Failed to get health advice:', error);
      showError('Advice Failed', 'Could not fetch health advice. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Personalized Health Advice</DialogTitle>
          <DialogDescription>
            Get AI-powered health recommendations based on the current AQI in {location.city}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="health-condition" className="text-right">
              Health
            </Label>
            <Select onValueChange={setHealthCondition} defaultValue={healthCondition}>
              <SelectTrigger id="health-condition" className="col-span-3">
                <SelectValue placeholder="Select a condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="asthma">Asthma</SelectItem>
                <SelectItem value="allergies">Allergies</SelectItem>
                <SelectItem value="heart condition">Heart Condition</SelectItem>
                <SelectItem value="children">Children</SelectItem>
                <SelectItem value="elderly">Elderly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {advice && (
            <div className="mt-4 rounded-lg border bg-muted/50 p-4">
              <h4 className="font-semibold mb-2 flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" /> Advice:</h4>
              <p className="text-sm text-muted-foreground">{advice.advice}</p>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={handleGetAdvice} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Get Advice
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
