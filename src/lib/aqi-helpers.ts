export const getAqiInfo = (aqi: number): { category: string; color: string; textColor: string } => {
  if (aqi <= 50) {
    return { category: 'Good', color: 'bg-green-500', textColor: 'text-green-500' };
  }
  if (aqi <= 100) {
    return { category: 'Moderate', color: 'bg-yellow-500', textColor: 'text-yellow-500' };
  }
  if (aqi <= 150) {
    return { category: 'Unhealthy for Sensitive Groups', color: 'bg-orange-500', textColor: 'text-orange-500' };
  }
  if (aqi <= 200) {
    return { category: 'Unhealthy', color: 'bg-red-500', textColor: 'text-red-500' };
  }
  if (aqi <= 300) {
    return { category: 'Very Unhealthy', color: 'bg-purple-500', textColor: 'text-purple-500' };
  }
  return { category: 'Hazardous', color: 'bg-red-900', textColor: 'text-red-900' };
};
