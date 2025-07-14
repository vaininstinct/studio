'use server';

import { personalizeMessage, type PersonalizeMessageInput, type PersonalizeMessageOutput } from '@/ai/flows/personalize-message';

export async function runPersonalizeMessage(input: PersonalizeMessageInput): Promise<PersonalizeMessageOutput> {
  try {
    const result = await personalizeMessage(input);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to personalize message");
  }
}
