
import type { LocationData } from '@/types';
import { subDays, format } from 'date-fns';

// Helper function to generate more realistic historical data
const generateHistoricalData = (baseAqi: number, days: number): { date: string, aqi: number }[] => {
  const data = [];
  for (let i = 0; i < days; i++) {
    const date = subDays(new Date(), i);
    // Introduce some variability
    const fluctuation = (Math.random() - 0.5) * baseAqi * 0.2; // +/- 10%
    const trend = (i / days) * baseAqi * 0.1; // slight downward trend over time
    const aqi = Math.round(baseAqi + fluctuation - trend);
    data.push({
      date: format(date, 'MMM d'),
      aqi: Math.max(10, aqi), // ensure aqi is not negative
    });
  }
  return data.reverse(); // oldest to newest
};


const locationsData: LocationData[] = [
  {
    id: 'delhi',
    city: 'Delhi',
    state: 'Delhi',
    aqi: 185,
    lat: 28.6139,
    lng: 77.2090,
    mainPollutant: 'PM2.5',
    pollutants: [
      { name: 'PM2.5', value: 185 },
      { name: 'PM10', value: 110 },
      { name: 'O3', value: 45 },
      { name: 'NO2', value: 60 },
      { name: 'SO2', value: 30 },
      { name: 'CO', value: 9 },
    ],
    historical: generateHistoricalData(190, 30),
  },
  {
    id: 'mumbai',
    city: 'Mumbai',
    state: 'Maharashtra',
    aqi: 95,
    lat: 19.0760,
    lng: 72.8777,
    mainPollutant: 'PM10',
    pollutants: [
      { name: 'PM2.5', value: 45 },
      { name: 'PM10', value: 95 },
      { name: 'O3', value: 60 },
      { name: 'NO2', value: 35 },
      { name: 'SO2', value: 20 },
      { name: 'CO', value: 7 },
    ],
    historical: generateHistoricalData(100, 30),
  },
  {
    id: 'bangalore',
    city: 'Bengaluru',
    state: 'Karnataka',
    aqi: 65,
    lat: 12.9716,
    lng: 77.5946,
    mainPollutant: 'O3',
    pollutants: [
        { name: 'PM2.5', value: 30 },
        { name: 'PM10', value: 55 },
        { name: 'O3', value: 65 },
        { name: 'NO2', value: 25 },
        { name: 'SO2', value: 15 },
        { name: 'CO', value: 5 },
    ],
    historical: generateHistoricalData(70, 30),
  },
  {
    id: 'chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    aqi: 45,
    lat: 13.0827,
    lng: 80.2707,
    mainPollutant: 'PM2.5',
    pollutants: [
        { name: 'PM2.5', value: 45 },
        { name: 'PM10', value: 30 },
        { name: 'O3', value: 22 },
        { name: 'NO2', value: 18 },
        { name: 'SO2', value: 12 },
        { name: 'CO', value: 4 },
    ],
    historical: generateHistoricalData(50, 30),
  },
  {
    id: 'kolkata',
    city: 'Kolkata',
    state: 'West Bengal',
    aqi: 162,
    lat: 22.5726,
    lng: 88.3639,
    mainPollutant: 'PM2.5',
    pollutants: [
      { name: 'PM2.5', value: 162 },
      { name: 'PM10', value: 95 },
      { name: 'O3', value: 35 },
      { name: 'NO2', value: 55 },
      { name: 'SO2', value: 25 },
      { name: 'CO', value: 8 },
    ],
    historical: generateHistoricalData(170, 30),
  },
  {
    id: 'hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    aqi: 105,
    lat: 17.3850,
    lng: 78.4867,
    mainPollutant: 'PM10',
    pollutants: [
      { name: 'PM2.5', value: 55 },
      { name: 'PM10', value: 105 },
      { name: 'O3', value: 70 },
      { name: 'NO2', value: 40 },
      { name: 'SO2', value: 22 },
      { name: 'CO', value: 6 },
    ],
    historical: generateHistoricalData(110, 30),
  },
  {
    id: 'pune',
    city: 'Pune',
    state: 'Maharashtra',
    aqi: 88,
    lat: 18.5204,
    lng: 73.8567,
    mainPollutant: 'PM10',
    pollutants: [
      { name: 'PM2.5', value: 40 },
      { name: 'PM10', value: 88 },
      { name: 'O3', value: 55 },
      { name: 'NO2', value: 30 },
      { name: 'SO2', value: 18 },
      { name: 'CO', value: 7 },
    ],
    historical: generateHistoricalData(90, 30),
  },
  {
    id: 'ahmedabad',
    city: 'Ahmedabad',
    state: 'Gujarat',
    aqi: 195,
    lat: 23.0225,
    lng: 72.5714,
    mainPollutant: 'PM2.5',
    pollutants: [
      { name: 'PM2.5', value: 195 },
      { name: 'PM10', value: 120 },
      { name: 'O3', value: 50 },
      { name: 'NO2', value: 65 },
      { name: 'SO2', value: 35 },
      { name: 'CO', value: 10 },
    ],
    historical: generateHistoricalData(200, 30),
  },
  {
    id: 'jaipur',
    city: 'Jaipur',
    state: 'Rajasthan',
    aqi: 145,
    lat: 26.9124,
    lng: 75.7873,
    mainPollutant: 'PM10',
    pollutants: [
      { name: 'PM2.5', value: 80 },
      { name: 'PM10', value: 145 },
      { name: 'O3', value: 40 },
      { name: 'NO2', value: 50 },
      { name: 'SO2', value: 28 },
      { name: 'CO', value: 8 },
    ],
    historical: generateHistoricalData(150, 30),
  },
  {
    id: 'lucknow',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    aqi: 210,
    lat: 26.8467,
    lng: 80.9462,
    mainPollutant: 'PM2.5',
    pollutants: [
      { name: 'PM2.5', value: 210 },
      { name: 'PM10', value: 130 },
      { name: 'O3', value: 40 },
      { name: 'NO2', value: 70 },
      { name: 'SO2', value: 40 },
      { name: 'CO', value: 12 },
    ],
    historical: generateHistoricalData(215, 30),
  },
];

export const getLocationsData = (): LocationData[] => {
  return locationsData;
};

export const getLocationById = (id: string): LocationData | undefined => {
  return locationsData.find((location) => location.id === id);
};
