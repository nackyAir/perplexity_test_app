'use client';

import { useState } from 'react';
import { SearchResponse } from '../types/search';

export default function SearchBox() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('検索エラー:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          placeholder="検索キーワードを入力..."
        />
        <button
          onClick={handleSearch}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded disabled:opacity-50 transition-colors"
        >
          {isLoading ? '検索中...' : '検索'}
        </button>
      </div>

      {results && (
        <div className="mt-4 space-y-4">
          <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">検索結果</h2>
          {results.results.map((result, index) => (
            <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
              <h3 className="font-bold">
                <a 
                  href={result.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {result.title}
                </a>
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mt-1">{result.snippet}</p>
            </div>
          ))}
          {results.summary && (
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
              <h3 className="font-bold mb-2 text-gray-900 dark:text-white">要約</h3>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{results.summary}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 