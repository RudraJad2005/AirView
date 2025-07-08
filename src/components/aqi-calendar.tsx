'use client';

import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getAqiInfo } from '@/lib/aqi-helpers';
import { cn } from '@/lib/utils';
import { format, getDaysInMonth, startOfMonth } from 'date-fns';

const generateMockAqiData = (year: number, month: number): { day: number; aqi: number }[] => {
  const daysInMonth = getDaysInMonth(new Date(year, month));
  return Array.from({ length: daysInMonth }, (_, i) => ({
    day: i + 1,
    // Generate AQI values similar to the image, mostly in the 120-160 range
    aqi: Math.floor(Math.random() * (165 - 125 + 1)) + 125,
  }));
};

export function AqiCalendar() {
  // Set default to Jan 2025 to match the image
  const [currentDate, setCurrentDate] = useState(new Date('2025-01-01T12:00:00Z'));
  const [aqiData, setAqiData] = useState<{ day: number; aqi: number }[]>([]);

  useEffect(() => {
    // Generate data only on the client-side to avoid hydration mismatch
    setAqiData(generateMockAqiData(currentDate.getFullYear(), currentDate.getMonth()));
  }, [currentDate]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = startOfMonth(currentDate).getDay(); // 0 for Sunday, 1 for Monday...
  
  const years = Array.from({ length: 5 }, (_, i) => 2022 + i);
  const months = Array.from({ length: 12 }, (_, i) => ({
    value: i,
    label: format(new Date(0, i), 'MMMM'),
  }));

  const handleYearChange = (yearValue: string) => {
    const newYear = parseInt(yearValue, 10);
    setCurrentDate(new Date(newYear, month, 1, 12));
  };

  const handleMonthChange = (monthValue: string) => {
    const newMonth = parseInt(monthValue, 10);
    setCurrentDate(new Date(year, newMonth, 1, 12));
  };
  
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const calendarDays = useMemo(() => {
    const blanks = Array(firstDayOfMonth).fill(null);
    const daysWithData = aqiData.map(d => d);
    return [...blanks, ...daysWithData];
  }, [firstDayOfMonth, aqiData]);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
                <CardTitle>Historical AQI Calendar</CardTitle>
                <CardDescription>Daily AQI values for the selected month.</CardDescription>
            </div>
            <div className="flex items-center gap-2">
            <Select value={year.toString()} onValueChange={handleYearChange}>
                <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                {years.map((y) => (
                    <SelectItem key={y} value={y.toString()}>
                    {y}
                    </SelectItem>
                ))}
                </SelectContent>
            </Select>
            <Select value={month.toString()} onValueChange={handleMonthChange}>
                <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                {months.map((m) => (
                    <SelectItem key={m.value} value={m.value.toString()}>
                    {m.label}
                    </SelectItem>
                ))}
                </SelectContent>
            </Select>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2 text-center text-xs text-muted-foreground mb-2">
          {weekdays.map((day) => (
            <div key={day} className="font-semibold">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((dayData, index) => {
            if (!dayData) {
              return <div key={`blank-${index}`} />;
            }
            const { color } = getAqiInfo(dayData.aqi);
            const dayDate = new Date(year, month, dayData.day);
            return (
              <div
                key={dayData.day}
                className={cn(
                  'rounded-lg p-2 flex flex-col justify-center items-center text-center aspect-square',
                  color
                )}
              >
                <div className="text-xs font-medium text-black/70">{format(dayDate, 'd MMM')}</div>
                <div className="font-bold text-xl text-black">{dayData.aqi}</div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
