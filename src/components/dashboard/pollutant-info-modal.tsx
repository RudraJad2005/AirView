"use client";

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { explainPollutants, ExplainPollutantsOutput } from '@/ai/flows/pollutant-explanation';
import type { LocationData } from '@/types';
import { Loader2, Info } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

interface PollutantInfoModalProps {
  location: LocationData;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PollutantInfoModal({ location, open, onOpenChange }: PollutantInfoModalProps) {
  const [explanation, setExplanation] = useState<ExplainPollutantsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const getExplanation = async () => {
      if (open) {
        setIsLoading(true);
        setExplanation(null);
        try {
          const result = await explainPollutants({
            region: location.city,
          });
          setExplanation(result);
        } catch (error) {
          console.error('Failed to get pollutant explanation:', error);
          toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Could not fetch pollutant information. Please try again.',
          });
        } finally {
          setIsLoading(false);
        }
      }
    };
    getExplanation();
  }, [open, location.city, toast]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" /> Pollutant Information for {location.city}
          </DialogTitle>
          <DialogDescription>
            Learn about the primary air pollutants and their health impacts in this region.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {isLoading ? (
            <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">{explanation?.explanation}</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
