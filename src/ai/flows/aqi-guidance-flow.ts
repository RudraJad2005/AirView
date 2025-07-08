'use server';
/**
 * @fileOverview Provides general guidance on air quality, including reduction tips and health precautions.
 *
 * - getAqiGuidance - A function that generates AQI guidance.
 * - AqiGuidanceInput - The input type for the getAqiGuidance function.
 * - AqiGuidanceOutput - The return type for the getAqiGuidance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AqiGuidanceInputSchema = z.object({
  region: z.string().describe('The state or region in India for which to generate guidance.'),
});
export type AqiGuidanceInput = z.infer<typeof AqiGuidanceInputSchema>;

const AqiGuidanceOutputSchema = z.object({
  aqiReductionTips: z.array(z.string()).describe('A list of actionable tips for the general public to help reduce overall air pollution in the region.'),
  generalPrecautions: z.array(z.string()).describe('A list of general precautions everyone should take, especially on high AQI days.'),
  vulnerableGroups: z.array(z.object({
      group: z.string().describe("The name of the vulnerable group (e.g., 'People with Asthma', 'Elderly', 'Children')."),
      advice: z.string().describe("Specific advice for this group."),
  })).describe('Specific advice for vulnerable populations.'),
    longTermSolutions: z.string().describe("A summary of long-term solutions and government initiatives for the region.")
});
export type AqiGuidanceOutput = z.infer<typeof AqiGuidanceOutputSchema>;

export async function getAqiGuidance(input: AqiGuidanceInput): Promise<AqiGuidanceOutput> {
  return aqiGuidanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aqiGuidancePrompt',
  input: {schema: AqiGuidanceInputSchema},
  output: {schema: AqiGuidanceOutputSchema},
  prompt: `You are an environmental health expert. Your task is to provide comprehensive guidance about air quality for the specified region in India.

Generate the following information for {{{region}}}:
1.  **AQI Reduction Tips:** Actionable steps the general public can take to help reduce air pollution.
2.  **General Precautions:** Daily precautions to take to minimize exposure to pollutants.
3.  **Vulnerable Groups:** Specific advice for sensitive groups like people with asthma, heart conditions, children, and the elderly.
4.  **Long-Term Solutions:** Briefly describe broader, long-term strategies and potential government initiatives for improving air quality in the region.

Provide the information in a structured format.
`,
});

const aqiGuidanceFlow = ai.defineFlow(
  {
    name: 'aqiGuidanceFlow',
    inputSchema: AqiGuidanceInputSchema,
    outputSchema: AqiGuidanceOutputSchema,
    retries: 3,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
