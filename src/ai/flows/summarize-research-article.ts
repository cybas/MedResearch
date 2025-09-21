'use server';

/**
 * @fileOverview A research article summarization AI agent.
 *
 * - summarizeResearchArticle - A function that summarizes a research article.
 * - SummarizeResearchArticleInput - The input type for the summarizeResearchArticle function.
 * - SummarizeResearchArticleOutput - The return type for the summarizeResearchArticle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeResearchArticleInputSchema = z.object({
  articleTitle: z.string().describe('The title of the research article.'),
  articleSummary: z.string().describe('The summary of the research article.'),
  articleSource: z.string().describe('The source of the research article (e.g., journal name).'),
  articlePublishedDate: z.string().describe('The date the research article was published.'),
  articleAccess: z.string().describe('Whether the article is free or paywalled.'),
  articleTags: z.array(z.string()).describe('Keywords/tags associated with the article.'),
});
export type SummarizeResearchArticleInput = z.infer<typeof SummarizeResearchArticleInputSchema>;

const SummarizeResearchArticleOutputSchema = z.object({
  aiSummary: z.string().describe('A concise AI-generated summary of the research article.'),
});
export type SummarizeResearchArticleOutput = z.infer<typeof SummarizeResearchArticleOutputSchema>;

export async function summarizeResearchArticle(
  input: SummarizeResearchArticleInput
): Promise<SummarizeResearchArticleOutput> {
  return summarizeResearchArticleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeResearchArticlePrompt',
  input: {schema: SummarizeResearchArticleInputSchema},
  output: {schema: SummarizeResearchArticleOutputSchema},
  prompt: `You are a medical research expert. Generate a concise summary of the research article.

  Article Title: {{articleTitle}}
  Article Summary: {{articleSummary}}
  Article Source: {{articleSource}}
  Published Date: {{articlePublishedDate}}
  Access: {{articleAccess}}
  Tags: {{#each articleTags}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

  AI Summary:`,
});

const summarizeResearchArticleFlow = ai.defineFlow(
  {
    name: 'summarizeResearchArticleFlow',
    inputSchema: SummarizeResearchArticleInputSchema,
    outputSchema: SummarizeResearchArticleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
