import type { LocationData } from '@/types';

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
    historical: [
      { date: 'Mon', aqi: 150 },
      { date: 'Tue', aqi: 165 },
      { date: 'Wed', aqi: 170 },
      { date: 'Thu', aqi: 180 },
      { date: 'Fri', aqi: 182 },
      { date: 'Sat', aqi: 175 },
      { date: 'Sun', aqi: 185 },
    ],
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
    historical: [
      { date: 'Mon', aqi: 80 },
      { date: 'Tue', aqi: 85 },
      { date: 'Wed', aqi: 90 },
      { date: 'Thu', aqi: 92 },
      { date: 'Fri', aqi: 98 },
      { date: 'Sat', aqi: 102 },
      { date: 'Sun', aqi: 95 },
    ],
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
    historical: [
      { date: 'Mon', aqi: 50 },
      { date: 'Tue', aqi: 55 },
      { date: 'Wed', aqi: 62 },
      { date: 'Thu', aqi: 60 },
      { date: 'Fri', aqi: 68 },
      { date: 'Sat', aqi: 70 },
      { date: 'Sun', aqi: 65 },
    ],
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
    historical: [
      { date: 'Mon', aqi: 40 },
      { date: 'Tue', aqi: 42 },
      { date: 'Wed', aqi: 38 },
      { date: 'Thu', aqi: 45 },
      { date: 'Fri', aqi: 48 },
      { date: 'Sat', aqi: 50 },
      { date: 'Sun', aqi: 45 },
    ],
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
    historical: [
      { date: 'Mon', aqi: 155 },
      { date: 'Tue', aqi: 158 },
      { date: 'Wed', aqi: 160 },
      { date: 'Thu', aqi: 165 },
      { date: 'Fri', aqi: 170 },
      { date: 'Sat', aqi: 168 },
      { date: 'Sun', aqi: 162 },
    ],
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
    historical: [
      { date: 'Mon', aqi: 95 },
      { date: 'Tue', aqi: 100 },
      { date: 'Wed', aqi: 102 },
      { date: 'Thu', aqi: 110 },
      { date: 'Fri', aqi: 108 },
      { date: 'Sat', aqi: 112 },
      { date: 'Sun', aqi: 105 },
    ],
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
    historical: [
      { date: 'Mon', aqi: 75 },
      { date: 'Tue', aqi: 80 },
      { date: 'Wed', aqi: 82 },
      { date: 'Thu', aqi: 85 },
      { date: 'Fri', aqi: 90 },
      { date: 'Sat', aqi: 92 },
      { date: 'Sun', aqi: 88 },
    ],
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
    historical: [
      { date: 'Mon', aqi: 180 },
      { date: 'Tue', aqi: 185 },
      { date: 'Wed', aqi: 190 },
      { date: 'Thu', aqi: 192 },
      { date: 'Fri', aqi: 200 },
      { date: 'Sat', aqi: 198 },
      { date: 'Sun', aqi: 195 },
    ],
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
    historical: [
      { date: 'Mon', aqi: 130 },
      { date: 'Tue', aqi: 135 },
      { date: 'Wed', aqi: 140 },
      { date: 'Thu', aqi: 142 },
      { date: 'Fri', aqi: 150 },
      { date: 'Sat', aqi: 148 },
      { date: 'Sun', aqi: 145 },
    ],
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
    historical: [
      { date: 'Mon', aqi: 190 },
      { date: 'Tue', aqi: 195 },
      { date: 'Wed', aqi: 200 },
      { date: 'Thu', aqi: 205 },
      { date: 'Fri', aqi: 215 },
      { date: 'Sat', aqi: 212 },
      { date: 'Sun', aqi: 210 },
    ],
  },
];

export const getLocationsData = (): LocationData[] => {
  return locationsData;
};

export const getLocationById = (id: string): LocationData | undefined => {
  return locationsData.find((location) => location.id === id);
};
