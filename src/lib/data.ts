import type { LocationData, NewsArticle } from '@/types';

const locationsData: LocationData[] = [
  {
    id: 'delhi',
    city: 'Delhi',
    state: 'Delhi',
    aqi: 185,
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
];

const newsArticles: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'India Launches New Initiative to Combat Urban Air Pollution',
    source: 'The Environmental Times',
    publishedDate: '2 days ago',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'city pollution',
    link: '#',
  },
  {
    id: 'news-2',
    title: 'How High AQI Affects Respiratory Health: A Deep Dive',
    source: 'Health & Wellness Weekly',
    publishedDate: '3 days ago',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'person mask',
    link: '#',
  },
  {
    id: 'news-3',
    title: 'Technological Breakthroughs in Air Quality Monitoring',
    source: 'Tech Today',
    publishedDate: '5 days ago',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'air sensor',
    link: '#',
  },
];

export const getLocationsData = (): LocationData[] => {
  return locationsData;
};

export const getNewsArticles = (): NewsArticle[] => {
  return newsArticles;
};
