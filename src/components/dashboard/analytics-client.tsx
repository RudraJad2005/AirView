"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, BrainCircuit, ShieldCheck, Leaf, HeartPulse, Wind } from 'lucide-react';
import { predictAqi, AqiPredictionOutput } from '@/ai/flows/aqi-prediction-flow';
import { getAqiGuidance, AqiGuidanceOutput } from '@/ai/flows/aqi-guidance-flow';
import { useToast } from '@/hooks/use-toast';
import { getAqiInfo } from '@/lib/aqi-helpers';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Skeleton } from '../ui/skeleton';

interface AnalyticsClientProps {
  states: string[];
}

export function AnalyticsClient({ states }: AnalyticsClientProps) {
  const [selectedState, setSelectedState] = useState<string>('');
  const [predictions, setPredictions] = useState<AqiPredictionOutput | null>(null);
  const [guidance, setGuidance] = useState<AqiGuidanceOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateReport = async () => {
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
    setGuidance(null);
    try {
      const [predictionResult, guidanceResult] = await Promise.all([
        predictAqi({ region: selectedState }),
        getAqiGuidance({ region: selectedState }),
      ]);
      setPredictions(predictionResult);
      setGuidance(guidanceResult);
    } catch (error) {
      console.error('Failed to get analytics data:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not fetch data. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">AQI Analytics & Guidance</h2>
          <p className="text-muted-foreground">
            Generate AI-powered AQI forecasts and health recommendations.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Generate Report</CardTitle>
          <CardDescription>Select a state to predict its AQI trend and get health guidance.</CardDescription>
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
          <Button onClick={handleGenerateReport} disabled={isLoading || !selectedState}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <BrainCircuit className="mr-2 h-4 w-4" />
            )}
            Generate Report
          </Button>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="grid gap-8">
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-1/2" />
                    <Skeleton className="h-4 w-3/4" />
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-1/2" />
                    <Skeleton className="h-4 w-3/4" />
                </CardHeader>
                <CardContent className="space-y-4">
                     <Skeleton className="h-12 w-full" />
                     <Skeleton className="h-12 w-full" />
                     <Skeleton className="h-12 w-full" />
                </CardContent>
            </Card>
        </div>
      )}

      {predictions && (
        <Card>
          <CardHeader>
            <CardTitle>3-Day Forecast for {selectedState}</CardTitle>
            <CardDescription>
              This is a predictive model based on regional patterns. Actual values may vary.
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

      {guidance && (
        <Card>
            <CardHeader>
                <CardTitle>Health & Safety Guidance for {selectedState}</CardTitle>
                <CardDescription>AI-generated recommendations to help you stay safe and reduce pollution.</CardDescription>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>
                            <div className="flex items-center gap-2">
                                <Leaf className="h-5 w-5 text-primary" />
                                <span>How to Help Reduce AQI</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                           <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                            {guidance.aqiReductionTips.map((tip, index) => <li key={index}>{tip}</li>)}
                           </ul>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>
                             <div className="flex items-center gap-2">
                                <ShieldCheck className="h-5 w-5 text-primary" />
                                <span>General Precautions</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                                {guidance.generalPrecautions.map((tip, index) => <li key={index}>{tip}</li>)}
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                     <AccordionItem value="item-3">
                        <AccordionTrigger>
                            <div className="flex items-center gap-2">
                                <HeartPulse className="h-5 w-5 text-destructive" />
                                <span>Advice for Vulnerable Groups</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="space-y-4">
                           {guidance.vulnerableGroups.map((group, index) => (
                             <div key={index}>
                                <h4 className="font-semibold">{group.group}</h4>
                                <p className="text-muted-foreground">{group.advice}</p>
                             </div>
                           ))}
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger>
                             <div className="flex items-center gap-2">
                                <Wind className="h-5 w-5 text-muted-foreground" />
                                <span>Long-Term Solutions</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <p className="text-muted-foreground">{guidance.longTermSolutions}</p>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
      )}
    </div>
  );
}
