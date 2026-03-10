"use server";

import { z } from "genkit";
import { ai } from "../genkit";

/**
 * @fileOverview A Genkit flow for generating an R script based on summarized data.
 *
 * - generateRScriptForAnalysis - A function that generates an R script for data analysis.
 * - GenerateRScriptForAnalysisInput - The input type for the generateRScriptForAnalysis function.
 * - GenerateRScriptForAnalysisOutput - The return type for the generateRScriptForAnalysis function.
 */
const GenerateRScriptForAnalysisInputSchema = z.object({
  dataSummary: z
    .string()
    .describe(
      "A summary of the analyzed data, including key statistics and characteristics. For example, lab sensitivity results in a structured format.",
    ),
});
export type GenerateRScriptForAnalysisInput = z.infer<
  typeof GenerateRScriptForAnalysisInputSchema
>;

const GenerateRScriptForAnalysisOutputSchema = z.object({
  rScript: z
    .string()
    .describe("The generated R script tailored for in-depth data analysis."),
});
export type GenerateRScriptForAnalysisOutput = z.infer<
  typeof GenerateRScriptForAnalysisOutputSchema
>;

export async function generateRScriptForAnalysis(
  input: GenerateRScriptForAnalysisInput,
): Promise<GenerateRScriptForAnalysisOutput> {
  // forwards the request to the actual ai flow
  return generateRScriptForAnalysisFlow(input);
}

// defining the ai prompt
const prompt = ai.definePrompt({
  name: "generateRScriptForAnalysisPrompt",
  input: { schema: GenerateRScriptForAnalysisInputSchema },
  output: { schema: GenerateRScriptForAnalysisOutputSchema },
  prompt: `You are an expert R programmer specializing in statistical data analysis. Your task is to generate a tailored R script based on the provided data summary. The script should be suitable for in-depth statistical analysis.

Consider the characteristics of the data described in the summary and suggest appropriate R packages, functions, and analytical approaches. Focus on providing a starting point for a data analyst to conduct further investigation.

Data Summary: {{{dataSummary}}}

Please output only the R script in the 'rScript' field of the JSON object. Do not include any conversational text or explanations outside of the R script itself, unless it's a comment within the R script.`,
});

const generateRScriptForAnalysisFlow = ai.defineFlow(
  {
    name: "generateRScriptForAnalysisFlow",
    inputSchema: GenerateRScriptForAnalysisInputSchema,
    outputSchema: GenerateRScriptForAnalysisOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  },
);
