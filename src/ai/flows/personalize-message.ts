// src/ai/flows/personalize-message.ts
'use server';

/**
 * @fileOverview A flow to personalize messages to leads using AI based on their Instagram profile data.
 *
 * - personalizeMessage - A function that personalizes a message for a lead.
 * - PersonalizeMessageInput - The input type for the personalizeMessage function.
 * - PersonalizeMessageOutput - The return type for the personalizeMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizeMessageInputSchema = z.object({
  leadProfileData: z
    .string()
    .describe('The Instagram profile data of the lead, including bio, recent posts, etc.'),
  messageTemplate: z.string().describe('The template for the message to be personalized.'),
});
export type PersonalizeMessageInput = z.infer<typeof PersonalizeMessageInputSchema>;

const PersonalizeMessageOutputSchema = z.object({
  personalizedMessage: z.string().describe('The personalized message for the lead.'),
});
export type PersonalizeMessageOutput = z.infer<typeof PersonalizeMessageOutputSchema>;

export async function personalizeMessage(input: PersonalizeMessageInput): Promise<PersonalizeMessageOutput> {
  return personalizeMessageFlow(input);
}

const personalizeMessagePrompt = ai.definePrompt({
  name: 'personalizeMessagePrompt',
  input: {schema: PersonalizeMessageInputSchema},
  output: {schema: PersonalizeMessageOutputSchema},
  prompt: `You are an AI assistant specializing in personalizing messages for Instagram leads.

  Based on the lead's Instagram profile data and a provided message template, generate a personalized message that is likely to increase engagement and booking rates.

  Lead Profile Data:
  {{leadProfileData}}

  Message Template:
  {{messageTemplate}}

  Personalized Message:`, // No need to put in code block.
});

const personalizeMessageFlow = ai.defineFlow(
  {
    name: 'personalizeMessageFlow',
    inputSchema: PersonalizeMessageInputSchema,
    outputSchema: PersonalizeMessageOutputSchema,
  },
  async input => {
    const {output} = await personalizeMessagePrompt(input);
    return output!;
  }
);
