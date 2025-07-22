import SearchBar from "./components/SearchBar";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow p-4 text-center">
        <h1 className="text-2xl font-bold">My Supabase Search</h1>
      </header>
      <main className="mt-6">
        <SearchBar />
      </main>
    </div>
  );
}
