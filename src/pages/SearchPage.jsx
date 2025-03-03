import { useState } from "react";
import { searchBooks } from "../services/gutendexAPI"; // Import the search function from API

const SearchPage = () => {
  const [titleQuery, setTitleQuery] = useState('');
  const [authorQuery, setAuthorQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle title search
  const handleTitleSearch = async () => {
    if (!titleQuery) return; // Avoid search if the field is empty
    setIsLoading(true);
    setError(null);
    try {
      const data = await searchBooks(titleQuery, 1, "popular", "", "title");
      setResults(data.results || []); // Update results with title search
    } catch (err) {
      setError("Error fetching books.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle author search
  const handleAuthorSearch = async () => {
    if (!authorQuery) return; // Avoid search if the field is empty
    setIsLoading(true);
    setError(null);
    try {
      const data = await searchBooks(authorQuery, 1, "popular", "", "author");
      setResults(data.results || []); // Update results with author search
    } catch (err) {
      setError("Error fetching books.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Search Books</h1>

      {/* Title search */}
      <div>
        <input
          type="text"
          placeholder="Search by title"
          value={titleQuery}
          onChange={(e) => setTitleQuery(e.target.value)}
        />
        <button onClick={handleTitleSearch} disabled={isLoading}>
          {isLoading ? 'Searching...' : 'Search by Title'}
        </button>
      </div>

      {/* Author search */}
      <div>
        <input
          type="text"
          placeholder="Search by author"
          value={authorQuery}
          onChange={(e) => setAuthorQuery(e.target.value)}
        />
        <button onClick={handleAuthorSearch} disabled={isLoading}>
          {isLoading ? 'Searching...' : 'Search by Author'}
        </button>
      </div>

      {/* Show search results */}
      <div>
        {error && <p>{error}</p>}
        <h2>Results</h2>
        <ul>
          {results.map((book) => (
            <li key={book.id}>
              {book.title} by {book.authors.map((author) => author.name).join(", ")}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchPage;
