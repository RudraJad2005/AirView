// src/ai/flows/pollutant-explanation.ts
'use server';
/**
 * @fileOverview An AI agent that explains pollutants affecting a selected region, including their sources and potential health impacts.
 *
 * - explainPollutants - A function that generates explanations for pollutants.
 * - ExplainPollutantsInput - The input type for the explainPollutants function.
 * - ExplainPollutantsOutput - The return type for the explainPollutants function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainPollutantsInputSchema = z.object({
  region: z.string().describe('The region for which to explain the pollutants.'),
});
export type ExplainPollutantsInput = z.infer<typeof ExplainPollutantsInputSchema>;

const ExplainPollutantsOutputSchema = z.object({
  explanation: z.string().describe('An explanation of the pollutants affecting the region, their sources, and potential health impacts.'),
});
export type ExplainPollutantsOutput = z.infer<typeof ExplainPollutantsOutputSchema>;

export async function explainPollutants(input: ExplainPollutantsInput): Promise<ExplainPollutantsOutput> {
  return explainPollutantsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainPollutantsPrompt',
  input: {schema: ExplainPollutantsInputSchema},
  output: {schema: ExplainPollutantsOutputSchema},
  prompt: `You are an expert in air quality and environmental science. Your task is to explain the pollutants affecting the specified region, including their sources and potential health impacts. Provide a simple, easy-to-understand explanation for a general audience.

Region: {{{region}}}

Explanation:`,
});

const explainPollutantsFlow = ai.defineFlow(
  {
    name: 'explainPollutantsFlow',
    inputSchema: ExplainPollutantsInputSchema,
    outputSchema: ExplainPollutantsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
