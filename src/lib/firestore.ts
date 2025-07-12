import { db } from './firebase';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { getLocationsData } from './data';
import type { LocationData } from '@/types';

// The structure of the user document in Firestore
interface UserDoc {
  savedLocations: string[]; // Array of location IDs
}

/**
 * Retrieves the saved locations for a given user.
 * @param userId The user's unique ID from Firebase Auth.
 * @returns A promise that resolves to an array of LocationData objects.
 */
export async function getSavedLocations(userId: string): Promise<LocationData[]> {
  if (!db) {
    console.error("Firestore is not initialized.");
    return [];
  }
  const userDocRef = doc(db, 'users', userId);
  const userDocSnap = await getDoc(userDocRef);

  if (!userDocSnap.exists()) {
    // If the user document doesn't exist, it's safe to assume no saved locations.
    return [];
  }

  const userData = userDocSnap.data() as UserDoc;
  const locationIds = userData.savedLocations || [];
  
  // Map location IDs to full location data objects
  const allLocations = getLocationsData();
  return locationIds.map(id => allLocations.find(l => l.id === id)).filter(Boolean) as LocationData[];
}

/**
 * Adds a location to a user's saved locations list.
 * @param userId The user's unique ID.
 * @param locationId The ID of the location to add.
 */
export async function addSavedLocation(userId: string, locationId: string): Promise<void> {
  if (!db) {
    throw new Error("Firestore is not initialized.");
  }
  const userDocRef = doc(db, 'users', userId);
  
  // Use set with merge:true. This will create the document if it doesn't exist,
  // or merge the data if it does. It gracefully handles both cases.
  await setDoc(userDocRef, {
    savedLocations: arrayUnion(locationId)
  }, { merge: true });
}

/**
 * Removes a location from a user's saved locations list.
 * @param userId The user's unique ID.
 * @param locationId The ID of the location to remove.
 */
export async function removeSavedLocation(userId: string, locationId: string): Promise<void> {
  if (!db) {
    throw new Error("Firestore is not initialized.");
  }
  const userDocRef = doc(db, 'users', userId);
  await updateDoc(userDocRef, {
    savedLocations: arrayRemove(locationId)
  });
}
