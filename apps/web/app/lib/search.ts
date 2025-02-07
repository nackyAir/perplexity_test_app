import { SearchResult } from '../types/search';

export class SearchService {
  private static readonly GOOGLE_SEARCH_URL = 'https://www.googleapis.com/customsearch/v1';

  static async performSearch(query: string): Promise<SearchResult[]> {
    const searchUrl = new URL(this.GOOGLE_SEARCH_URL);
    searchUrl.searchParams.append('key', process.env.GOOGLE_API_KEY);
    searchUrl.searchParams.append('cx', process.env.GOOGLE_SEARCH_ENGINE_ID);
    searchUrl.searchParams.append('q', query);

    const response = await fetch(searchUrl.toString());
    if (!response.ok) {
      throw new Error('Google Search API request failed');
    }

    const data = await response.json();
    return (data.items || []).map(this.mapSearchResult);
  }

  private static mapSearchResult(item: any): SearchResult {
    return {
      title: item.title,
      url: item.link,
      snippet: item.snippet,
    };
  }
} 