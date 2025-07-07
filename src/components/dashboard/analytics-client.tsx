"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, BrainCircuit } from 'lucide-react';
import { predictAqi, AqiPredictionOutput } from '@/ai/flows/aqi-prediction-flow';
import { useToast } from '@/hooks/use-toast';
import { getAqiInfo } from '@/lib/aqi-helpers';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface AnalyticsClientProps {
  states: string[];
}

export function AnalyticsClient({ states }: AnalyticsClientProps) {
  const [selectedState, setSelectedState] = useState<string>('');
  const [predictions, setPredictions] = useState<AqiPredictionOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGetPredictions = async () => {
    if (!selectedState) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please select a state first.',
      });
      return;
    }
    setIsLoading(true);
    setPredictions(null);
    try {
      const result = await predictAqi({ region: selectedState });
      setPredictions(result);
    } catch (error) {
      console.error('Failed to get AQI predictions:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not fetch predictions. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">AQI Predictions</h2>
          <p className="text-muted-foreground">
            Generate AI-powered AQI forecasts for the next 3 days.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Generate Forecast</CardTitle>
          <CardDescription>Select a state to predict its AQI trend.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row items-center gap-4">
          <Select onValueChange={setSelectedState} value={selectedState}>
            <SelectTrigger className="w-full sm:w-[280px]">
              <SelectValue placeholder="Select a state..." />
            </SelectTrigger>
            <SelectContent>
              {states.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleGetPredictions} disabled={isLoading || !selectedState}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <BrainCircuit className="mr-2 h-4 w-4" />
            )}
            Generate Predictions
          </Button>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="flex justify-center items-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {predictions && (
        <Card>
          <CardHeader>
            <CardTitle>3-Day Forecast for {selectedState}</CardTitle>
            <CardDescription>
              This is a predictive model. Actual values may vary.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Day</TableHead>
                  <TableHead className="text-center">Predicted AQI</TableHead>
                  <TableHead>Summary</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {predictions.predictions.map((prediction, index) => {
                  const { category, color } = getAqiInfo(prediction.predictedAqi);
                  return (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{prediction.day}</TableCell>
                      <TableCell className="text-center">
                        <div className="flex flex-col items-center gap-1">
                            <span className="text-2xl font-bold">{prediction.predictedAqi}</span>
                            <Badge className={cn("text-white text-xs", color)}>{category}</Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{prediction.summary}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
