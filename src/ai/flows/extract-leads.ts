// src/ai/flows/extract-leads.ts
'use server';

/**
 * @fileOverview A flow to extract mock leads from a target Instagram account using AI.
 *
 * - extractLeads - A function that generates a list of mock leads.
 * - ExtractLeadsInput - The input type for the extractLeads function.
 * - ExtractLeadsOutput - The return type for the extractLeads function.
 */

import { ai } from '@/ai/genkit';
import type { Lead } from '@/lib/data';
import { z } from 'genkit';

const ExtractLeadsInputSchema = z.object({
  targetAccount: z.string().describe('The target Instagram account username (e.g., @username).'),
  niche: z.string().describe('The niche or industry of the target account (e.g., Fitness, Photography).'),
  count: z.number().default(8).describe('The number of leads to generate.'),
});
export type ExtractLeadsInput = z.infer<typeof ExtractLeadsInputSchema>;

const LeadSchema = z.object({
    id: z.string().describe("A unique identifier for the lead, preferably a random string."),
    name: z.string().describe("The full name of the lead."),
    username: z.string().describe("The Instagram username for the lead (without the '@' symbol)."),
    avatarUrl: z.string().url().describe("A placeholder image URL for the avatar. Use https://placehold.co/100x100.png."),
    bio: z.string().describe("A realistic, engaging Instagram bio for the lead, tailored to the specified niche. It should be 1-3 sentences long."),
    latestPostImageUrl: z.string().url().describe("A placeholder image URL for their latest post. Use https://placehold.co/300x300.png.")
});

const ExtractLeadsOutputSchema = z.object({
  leads: z.array(LeadSchema).describe('An array of generated leads.'),
});
export type ExtractLeadsOutput = z.infer<typeof ExtractLeadsOutputSchema>;

export async function extractLeads(input: ExtractLeadsInput): Promise<ExtractLeadsOutput> {
  return extractLeadsFlow(input);
}

const extractLeadsPrompt = ai.definePrompt({
  name: 'extractLeadsPrompt',
  input: { schema: ExtractLeadsInputSchema },
  output: { schema: ExtractLeadsOutputSchema },
  prompt: `You are an AI assistant tasked with generating realistic mock Instagram user profiles. These profiles represent followers of a specific account and should be relevant to its niche.

  Generate a list of {{count}} mock leads who are followers of the Instagram account {{targetAccount}}.
  The niche of this account is: {{niche}}.

  For each lead, create a plausible name, username, and bio. The bio should reflect the interests of someone in the {{niche}} space.
  - All usernames should be unique.
  - All bios should be unique and sound like a real person.
  - All names should be plausible.
  - All avatarUrls must be 'https://placehold.co/100x100.png'.
  - All latestPostImageUrls must be 'https://placehold.co/300x300.png'.
  - Each ID must be a unique random string.

  Return the list of leads in the specified JSON format.
`,
});

const extractLeadsFlow = ai.defineFlow(
  {
    name: 'extractLeadsFlow',
    inputSchema: ExtractLeadsInputSchema,
    outputSchema: ExtractLeadsOutputSchema,
  },
  async (input) => {
    const { output } = await extractLeadsPrompt(input);
    return output!;
  }
);
