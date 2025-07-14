import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, where, serverTimestamp, doc, getDoc, updateDoc } from 'firebase/firestore';
import type { Campaign, Lead } from '@/lib/data';
import { useAuth } from '@/context/auth-context';

/**
 * Creates a new campaign in Firestore for the current user.
 * @param campaignName The name of the new campaign.
 * @param userId The ID of the user creating the campaign.
 * @returns The newly created campaign object.
 */
export async function createCampaign(campaignName: string, userId: string): Promise<Campaign> {
  const campaignRef = await addDoc(collection(db, 'campaigns'), {
    name: campaignName,
    userId: userId,
    niche: '', // Can be updated later
    leads: [],
    createdAt: serverTimestamp(),
  });

  return {
    id: campaignRef.id,
    name: campaignName,
    userId: userId,
    niche: '',
    leads: [],
    createdAt: new Date(), // Use client-side date for immediate UI update
  };
}

/**
 * Fetches all campaigns for a given user from Firestore.
 * @param userId The ID of the user whose campaigns to fetch.
 * @returns A promise that resolves to an array of campaigns.
 */
export async function getCampaigns(userId: string): Promise<Campaign[]> {
  const q = query(collection(db, 'campaigns'), where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  
  const campaigns: Campaign[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    campaigns.push({
      id: doc.id,
      ...data
    } as Campaign);
  });
  
  // Sort by creation date, newest first
  campaigns.sort((a, b) => (b.createdAt?.toDate() || 0) - (a.createdAt?.toDate() || 0));

  return campaigns;
}

/**
 * Adds a list of leads to a specific campaign.
 * @param campaignId The ID of the campaign to add leads to.
 * @param leads The array of leads to add.
 */
export async function addLeadsToCampaign(campaignId: string, leads: Lead[]): Promise<void> {
  const campaignRef = doc(db, 'campaigns', campaignId);
  const campaignSnap = await getDoc(campaignRef);

  if (!campaignSnap.exists()) {
    throw new Error('Campaign not found!');
  }

  const existingLeads = campaignSnap.data().leads || [];
  const updatedLeads = [...existingLeads, ...leads];

  await updateDoc(campaignRef, {
    leads: updatedLeads
  });
}