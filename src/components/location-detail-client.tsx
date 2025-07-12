
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ShieldCheck, Leaf, HeartPulse, Wind, ArrowLeft, TrendingUp, TrendingDown, CalendarDays } from 'lucide-react';
import { predictAqi, AqiPredictionOutput } from '@/ai/flows/aqi-prediction-flow';
import { getAqiGuidance, AqiGuidanceOutput } from '@/ai/flows/aqi-guidance-flow';
import { useErrorDialog } from '@/hooks/use-error-dialog';
import { getAqiInfo } from '@/lib/aqi-helpers';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Skeleton } from './ui/skeleton';
import type { LocationData } from '@/types';
import { AqiChart } from '@/components/dashboard/aqi-chart';
import { KeyPollutants } from '@/components/dashboard/key-pollutants';
import Link from 'next/link';

interface LocationDetailClientProps {
  location: LocationData;
}

export function LocationDetailClient({ location }: LocationDetailClientProps) {
  const [predictions, setPredictions] = useState<AqiPredictionOutput | null>(null);
  const [guidance, setGuidance] = useState<AqiGuidanceOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { showError } = useErrorDialog();

  useEffect(() => {
    const getAnalyticsData = async () => {
      setIsLoading(true);
      try {
        const [predictionResult, guidanceResult] = await Promise.all([
          predictAqi({ region: location.state }),
          getAqiGuidance({ region: location.state }),
        ]);
        setPredictions(predictionResult);
        setGuidance(guidanceResult);
      } catch (error) {
        console.error('Failed to get analytics data:', error);
        showError('Analytics Failed', 'Could not fetch analytics data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    getAnalyticsData();
  }, [location.state, showError]);

  const { category, color } = getAqiInfo(location.aqi);

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="flex flex-col items-start gap-4">
          <Link href="/dashboard" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <div className='w-full flex flex-col md:flex-row md:items-end md:justify-between gap-2'>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{location.city}, {location.state}</h2>
            <div className="flex items-end gap-3">
              <span className="text-5xl md:text-6xl font-bold leading-none">{location.aqi}</span>
              <div className='flex flex-col items-start'>
                <p className="text-sm text-muted-foreground">US AQI</p>
                <Badge className={cn("text-white h-7", color)}>{category}</Badge>
              </div>
            </div>
          </div>
      </div>

      <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-4">
            <Card>
                <CardHeader>
                    <CardTitle className='flex items-center gap-2'><TrendingUp className="h-5 w-5"/>Weekly AQI Trend</CardTitle>
                    <CardDescription>Last 7 days of Air Quality Index values.</CardDescription>
                </CardHeader>
                <CardContent>
                    <AqiChart data={location.historical} />
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-3">
            <KeyPollutants pollutants={location.pollutants} />
        </div>
      </div>

      {isLoading && (
        <div className="grid gap-6 md:gap-8">
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
            <CardTitle className="flex items-center gap-2"><CalendarDays className="h-5 w-5"/>3-Day Forecast</CardTitle>
            <CardDescription>
              This is a predictive model based on regional patterns. Actual values may vary.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Hidden on mobile, shown on md screens and up */}
            <div className="hidden md:block">
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
            </div>
             {/* Shown on mobile, hidden on md screens and up */}
            <div className="space-y-4 md:hidden">
              {predictions.predictions.map((prediction, index) => {
                const { category, color } = getAqiInfo(prediction.predictedAqi);
                return (
                  <div key={index} className="p-4 rounded-lg border bg-muted/50 flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <p className="font-bold text-lg">{prediction.day}</p>
                       <div className="flex flex-col items-end gap-1">
                        <span className="text-3xl font-bold">{prediction.predictedAqi}</span>
                        <Badge className={cn("text-white text-xs", color)}>{category}</Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{prediction.summary}</p>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {guidance && (
        <Card>
            <CardHeader>
                <CardTitle>Health & Safety Guidance for {location.state}</CardTitle>
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
