interface SearchInputProps {
  query: string;
  setQuery: (query: string) => void;
  onSearch: () => void;
  isLoading: boolean;
}

export function SearchInput({ query, setQuery, onSearch, isLoading }: SearchInputProps) {
  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        placeholder="検索キーワードを入力..."
      />
      <button
        onClick={onSearch}
        disabled={isLoading}
        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded disabled:opacity-50 transition-colors"
      >
        {isLoading ? '検索中...' : '検索'}
      </button>
    </div>
  );
} 