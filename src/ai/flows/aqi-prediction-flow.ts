'use server';
/**
 * @fileOverview Predicts future AQI values for a given region.
 *
 * - predictAqi - A function that generates AQI predictions.
 * - AqiPredictionInput - The input type for the predictAqi function.
 * - AqiPredictionOutput - The return type for the predictAqi function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AqiPredictionInputSchema = z.object({
  region: z.string().describe('The state or region in India for which to predict the AQI.'),
});
export type AqiPredictionInput = z.infer<typeof AqiPredictionInputSchema>;

const AqiPredictionOutputSchema = z.object({
  predictions: z.array(z.object({
      day: z.string().describe("The day for the prediction (e.g., 'Tomorrow', 'In 2 days')."),
      predictedAqi: z.number().describe('The predicted AQI value.'),
      summary: z.string().describe('A brief summary of the prediction and contributing factors.'),
  })).describe('An array of AQI predictions for the next 3 days.')
});
export type AqiPredictionOutput = z.infer<typeof AqiPredictionOutputSchema>;

export async function predictAqi(input: AqiPredictionInput): Promise<AqiPredictionOutput> {
  return aqiPredictionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aqiPredictionPrompt',
  input: {schema: AqiPredictionInputSchema},
  output: {schema: AqiPredictionOutputSchema},
  prompt: `You are an expert environmental data scientist. Your task is to predict the Air Quality Index (AQI) for the next 3 days for the given region in India.

Base your predictions on general seasonal and environmental patterns known for that region. Provide a predicted AQI value and a short summary for each day.

Region: {{{region}}}
`,
});

const aqiPredictionFlow = ai.defineFlow(
  {
    name: 'aqiPredictionFlow',
    inputSchema: AqiPredictionInputSchema,
    outputSchema: AqiPredictionOutputSchema,
    retries: 3,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
