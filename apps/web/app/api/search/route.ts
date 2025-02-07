import { NextResponse } from 'next/server';
import { z } from 'zod';
import { SearchService } from '../../lib/search';
import { ContentSummarizer } from '../../lib/summarizer';

const searchRequestSchema = z.object({
  query: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const { query } = searchRequestSchema.parse(await request.json());
    
    const searchResults = await SearchService.performSearch(query);
    const summary = await ContentSummarizer.summarize(searchResults, query);

    return NextResponse.json({ results: searchResults, summary });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: "検索処理に失敗しました" },
      { status: 500 }
    );
  }
} 