import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error || "Unknown error");
      setResults(payload.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="flex mb-4">
        <input
          type="text"
          className="flex-grow border rounded-l px-3 py-2"
          placeholder="Search…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 rounded-r hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Searching…" : "Search"}
        </button>
      </form>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      <ul className="space-y-4">
        {results.map(({ id, title, snippet }) => (
          <li key={id} className="border-b pb-2">
            <h3 className="font-semibold">{title}</h3>
            <p
              className="text-gray-700"
              dangerouslySetInnerHTML={{ __html: snippet }}
            />
          </li>
        ))}
        {results.length === 0 && !loading && query && (
          <li className="text-gray-500">No results found.</li>
        )}
      </ul>
    </div>
  );
}
