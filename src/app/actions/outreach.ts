'use server';

import { generateOpener, type GenerateOpenerInput, type GenerateOpenerOutput } from '@/ai/flows/generate-opener';

export async function runGenerateOpener(input: GenerateOpenerInput): Promise<GenerateOpenerOutput> {
  try {
    const result = await generateOpener(input);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to generate opener message");
  }
}
