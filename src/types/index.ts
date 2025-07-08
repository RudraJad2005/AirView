export type LocationData = {
  id: string;
  city: string;
  state: string;
  aqi: number;
  lat: number;
  lng: number;
  mainPollutant: 'PM2.5' | 'PM10' | 'O3' | 'NO2' | 'SO2' | 'CO';
  pollutants: {
    name: 'PM2.5' | 'PM10' | 'O3' | 'NO2' | 'SO2' | 'CO';
    value: number;
  }[];
  historical: { date: string; aqi: number }[];
};
