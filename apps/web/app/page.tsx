import SearchBox from './components/SearchBox';


export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Google Search API Demo
        </h1>
        <SearchBox />
      </main>
    </div>
  );
}
