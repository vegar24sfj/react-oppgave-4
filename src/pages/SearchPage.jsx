import { useState } from "react";
import { searchBooks } from "../services/gutendexAPI"; // Import the search function from API
import styled from "styled-components";
import { Link } from "react-router-dom"; // Import Link for routing

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* Center content horizontally */
  justify-content: center; /* Center content vertically, if needed */
  padding: 20px;
  min-height: 100vh; /* Ensures the container takes at least the full height of the viewport */
`;

const SearchInput = styled.input`
  padding: 10px;
  margin: 10px;
  width: 250px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:hover {
    background-color: #3a7c36;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px; /* Space between buttons */
  margin-top: 15px;
  white-space: nowrap;
  flex-wrap: nowrap; /* Prevents the buttons from wrapping into a new line */
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff; /* Blue background */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 130px; /* Same width for both buttons */
  display: flex;
  justify-content: center;
  align-items: center;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:hover {
    background-color: #0056b3;
  }
`;

const ResultsList = styled.ul`
  list-style-type: none;
  padding: 10px;
  margin-top: 20px;
  /* width: 80%; */
  max-width: 800px; /* Optional: Set max-width to control how wide the result list can be */
  text-align: center; /* Center the text inside each result item */
`;

const ResultItem = styled.li`
  margin: 10px 0;
  font-size: 18px;
  text-align: center;
  color: white; /* Set text color to white */
`;

const ErrorMessage = styled.p`
  color: red;
`;

const ResultsHeading = styled.h2`
  margin-top: 40px;
  font-size: 1.5rem;
  color: #e7e7e7;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #f5f5f5;
  margin-bottom: 20px;
  text-align: center;
`;

const StyledLink = styled(Link)`
  color: #61dafb;
  text-decoration: none;
  margin-right: 8px; /* Space between the link and the rest of the text */

  &:hover {
    color: #0056b3; /* Blue color when hovered */
  }
`;

const SearchPage = () => {
  const [query, setQuery] = useState(''); // Unified query state for both title and author search
  const [searchType, setSearchType] = useState("title"); // Type of search, either title or author
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false); // Track if search has been performed

  // Handle search
  const handleSearch = async () => {
    if (!query) return; // Avoid search if the query is empty
    setIsLoading(true);
    setError(null);
    setResults([]); // Clear previous results
    setSearched(true); // Set search flag to true once the search is started
    try {
      const data = await searchBooks(query, 1, "popular", "", searchType); // Search by the selected type
      if (searchType === "title") {
        // Filter the results for title search
        const titleResults = data.results.filter(book => book.title.toLowerCase().includes(query.toLowerCase()));
        setResults(titleResults);
      } else if (searchType === "author") {
        // Filter the results for author search
        const authorResults = data.results.filter(book =>
          book.authors.some(author => author.name.toLowerCase().includes(query.toLowerCase()))
        );
        setResults(authorResults);
      }
    } catch (err) {
      setError("Error fetching books.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Title>Search Books</Title>

      {/* Unified Search Input */}
      <div>
        <SearchInput
          type="text"
          placeholder={`Search by ${searchType.charAt(0).toUpperCase() + searchType.slice(1)}`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <SearchButton onClick={handleSearch} disabled={isLoading}>
          {isLoading ? 'Searching...' : `Search by ${searchType.charAt(0).toUpperCase() + searchType.slice(1)}`}
        </SearchButton>
      </div>

      {/* Search Type Toggle - Buttons beside each other */}
      <ButtonGroup>
        <Button onClick={() => setSearchType("title")} disabled={isLoading}>
          Search by Title
        </Button>
        <Button onClick={() => setSearchType("author")} disabled={isLoading}>
          Search by Author
        </Button>
      </ButtonGroup>

      {/* Show search results */}
      <div>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <ResultsHeading>Results</ResultsHeading>
        <ResultsList>
          {searched && results.length === 0 ? (
            <ResultItem>No results found</ResultItem>
          ) : (
            results.map((book) => (
              <ResultItem key={book.id}>
                <strong>
                  <StyledLink to={`/book/${book.id}`}>
                    {book.title}
                  </StyledLink>
                </strong>
                by {book.authors.map((author) => author.name).join(", ")}
              </ResultItem>
            ))
          )}
        </ResultsList>
      </div>
    </Container>
  );
};

export default SearchPage;
