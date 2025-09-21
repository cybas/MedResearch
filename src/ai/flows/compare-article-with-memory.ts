'use server';

/**
 * @fileOverview An AI tool that provides comparative insights between an article selected from 'Latest Updates'
 * and items saved to the user's memory, to help the user understand the relationships and identify new insights.
 *
 * - compareArticleWithMemory - A function that handles the comparison process.
 * - CompareArticleWithMemoryInput - The input type for the compareArticleWithMemory function.
 * - CompareArticleWithMemoryOutput - The return type for the compareArticleWithMemory function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CompareArticleWithMemoryInputSchema = z.object({
  articleTitle: z.string().describe('The title of the article to compare.'),
  articleSummary: z.string().describe('A summary of the article.'),
  memoryItems: z
    .array(z.string())
    .describe('An array of summaries of items saved in the user memory.'),
});
export type CompareArticleWithMemoryInput = z.infer<
  typeof CompareArticleWithMemoryInputSchema
>;

const CompareArticleWithMemoryOutputSchema = z.object({
  comparisonSummary: z
    .string()
    .describe(
      'A summary of the comparison between the article and the memory items.'
    ),
});
export type CompareArticleWithMemoryOutput = z.infer<
  typeof CompareArticleWithMemoryOutputSchema
>;

export async function compareArticleWithMemory(
  input: CompareArticleWithMemoryInput
): Promise<CompareArticleWithMemoryOutput> {
  return compareArticleWithMemoryFlow(input);
}

const compareArticleWithMemoryPrompt = ai.definePrompt({
  name: 'compareArticleWithMemoryPrompt',
  input: {schema: CompareArticleWithMemoryInputSchema},
  output: {schema: CompareArticleWithMemoryOutputSchema},
  prompt: `You are an AI assistant designed to provide comparative insights between a research article and a user's saved memory items.

  Article Title: {{articleTitle}}
  Article Summary: {{articleSummary}}

  Memory Items:
  {{#each memoryItems}}
  - {{this}}
  {{/each}}

  Based on the article and memory items provided, generate a summary that highlights any relationships, overlaps, or new insights that can be derived from comparing the article to the user's existing knowledge base. Focus on identifying key differences, similarities, and potential implications for the user's research or understanding of the topic.
  `,
});

const compareArticleWithMemoryFlow = ai.defineFlow(
  {
    name: 'compareArticleWithMemoryFlow',
    inputSchema: CompareArticleWithMemoryInputSchema,
    outputSchema: CompareArticleWithMemoryOutputSchema,
  },
  async input => {
    const {output} = await compareArticleWithMemoryPrompt(input);
    return output!;
  }
);
