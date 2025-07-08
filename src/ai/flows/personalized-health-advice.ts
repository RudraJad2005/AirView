// This file is machine-generated - edit at your own risk.

'use server';

/**
 * @fileOverview Provides personalized health advice based on AQI and user health data.
 *
 * - getPersonalizedHealthAdvice - A function that generates personalized health advice.
 * - PersonalizedHealthAdviceInput - The input type for the getPersonalizedHealthAdvice function.
 * - PersonalizedHealthAdviceOutput - The return type for the getPersonalizedHealthAdvice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedHealthAdviceInputSchema = z.object({
  aqi: z.number().describe('The current Air Quality Index (AQI) value.'),
  location: z.string().describe('The location for which the AQI is provided.'),
  healthCondition: z
    .string() // e.g., "asthma", "allergies", "heart condition", or "none"
    .describe(
      'The user health condition that the advice should be tailored to. If the user has no specific health condition, this should be set to "none".'
    ),
});
export type PersonalizedHealthAdviceInput = z.infer<typeof PersonalizedHealthAdviceInputSchema>;

const PersonalizedHealthAdviceOutputSchema = z.object({
  advice: z
    .string()
    .describe(
      'Personalized health advice based on the current AQI, location, and the users health condition.'
    ),
});
export type PersonalizedHealthAdviceOutput = z.infer<typeof PersonalizedHealthAdviceOutputSchema>;

export async function getPersonalizedHealthAdvice(
  input: PersonalizedHealthAdviceInput
): Promise<PersonalizedHealthAdviceOutput> {
  return personalizedHealthAdviceFlow(input);
}

const personalizedHealthAdvicePrompt = ai.definePrompt({
  name: 'personalizedHealthAdvicePrompt',
  input: {schema: PersonalizedHealthAdviceInputSchema},
  output: {schema: PersonalizedHealthAdviceOutputSchema},
  prompt: `You are a healthcare assistant providing personalized health advice based on the current Air Quality Index (AQI), location, and the user's health condition.

Current AQI: {{{aqi}}}
Location: {{{location}}}
User's Health Condition: {{{healthCondition}}}

Provide specific and actionable advice tailored to the user's situation. If the AQI is high, recommend precautions to minimize exposure to pollutants. If the user has a health condition like asthma or allergies, provide advice relevant to their condition.
`,
});

const personalizedHealthAdviceFlow = ai.defineFlow(
  {
    name: 'personalizedHealthAdviceFlow',
    inputSchema: PersonalizedHealthAdviceInputSchema,
    outputSchema: PersonalizedHealthAdviceOutputSchema,
    retries: 3,
  },
  async input => {
    const {output} = await personalizedHealthAdvicePrompt(input);
    return output!;
  }
);
