import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, where, serverTimestamp, orderBy } from 'firebase/firestore';
import type { Lead, OutboxMessage } from '@/lib/data';

interface AddToOutboxParams {
  lead: Lead;
  campaignId: string;
  campaignName: string;
  generatedMessage: string;
  userId: string;
}

/**
 * Adds a generated message to the user's outbox.
 * @param messageData The data for the outbox message.
 */
export async function addMessageToOutbox(messageData: AddToOutboxParams): Promise<void> {
  await addDoc(collection(db, 'outbox'), {
    ...messageData,
    createdAt: serverTimestamp(),
  });
}

/**
 * Fetches all outbox messages for a given user.
 * @param userId The ID of the user whose messages to fetch.
 * @returns A promise that resolves to an array of outbox messages.
 */
export async function getOutboxMessages(userId: string): Promise<OutboxMessage[]> {
  const q = query(collection(db, 'outbox'), where('userId', '==', userId), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  
  const messages: OutboxMessage[] = [];
  querySnapshot.forEach((doc) => {
    messages.push({ id: doc.id, ...doc.data() } as OutboxMessage);
  });
  
  return messages;
}
