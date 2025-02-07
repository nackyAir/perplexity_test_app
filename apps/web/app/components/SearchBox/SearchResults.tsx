import { SearchResponse } from '../../types/search';

interface SearchResultsProps {
  results: SearchResponse;
}

export function SearchResults({ results }: SearchResultsProps) {
  return (
    <div className="mt-4 space-y-4">
      <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
        検索結果
      </h2>
      {results.results.map((result, index) => (
        <div
          key={index}
          className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
        >
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
          <p className="text-gray-700 dark:text-gray-300 mt-1">
            {result.snippet}
          </p>
        </div>
      ))}
      {results.summary && (
        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
          <h3 className="font-bold mb-2 text-gray-900 dark:text-white">
            要約
          </h3>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
            {results.summary}
          </p>
        </div>
      )}
    </div>
  );
} 