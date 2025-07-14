'use server';

/**
 * @fileOverview A flow to generate an opening message for a lead based on a specific goal.
 *
 * - generateOpener - A function that generates an opening message.
 * - GenerateOpenerInput - The input type for the generateOpener function.
 * - GenerateOpenerOutput - The return type for the generateOpener function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateOpenerInputSchema = z.object({
  leadProfileData: z
    .string()
    .describe('The Instagram profile data of the lead, including bio, recent posts, etc.'),
  goal: z.string().describe('The goal of the conversation (e.g., "Book a call", "Get them to visit our website").'),
});
export type GenerateOpenerInput = z.infer<typeof GenerateOpenerInputSchema>;

const GenerateOpenerOutputSchema = z.object({
  openingMessage: z.string().describe('The generated opening message for the lead.'),
});
export type GenerateOpenerOutput = z.infer<typeof GenerateOpenerOutputSchema>;

export async function generateOpener(input: GenerateOpenerInput): Promise<GenerateOpenerOutput> {
  return generateOpenerFlow(input);
}

const generateOpenerPrompt = ai.definePrompt({
  name: 'generateOpenerPrompt',
  input: {schema: GenerateOpenerInputSchema},
  output: {schema: GenerateOpenerOutputSchema},
  prompt: `You are an expert AI outreach assistant. Your task is to craft a compelling, personalized opening message to an Instagram lead.

The message should be casual, authentic, and tailored to the lead's profile. Your primary objective is to start a conversation that naturally leads towards the specified goal.

**Lead Profile Data:**
{{leadProfileData}}

**Conversation Goal:**
{{goal}}

Based on the data, generate an engaging opening message. Do not make it sound like a generic template. Find something specific in their profile to comment on.
`,
});

const generateOpenerFlow = ai.defineFlow(
  {
    name: 'generateOpenerFlow',
    inputSchema: GenerateOpenerInputSchema,
    outputSchema: GenerateOpenerOutputSchema,
  },
  async input => {
    const {output} = await generateOpenerPrompt(input);
    return output!;
  }
);
