import { LocationDetailClient } from '@/components/location-detail-client';
import { getLocationById } from '@/lib/data';
import { notFound } from 'next/navigation';

export default function LocationDetailPage({ params }: { params: { id: string } }) {
  const location = getLocationById(params.id);

  if (!location) {
    notFound();
  }

  return <LocationDetailClient location={location} />;
}
