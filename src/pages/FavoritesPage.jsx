import { useState, useEffect } from "react";
import styled from "styled-components";

// Styled-components
const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: white; /* Change the color to white */
  margin-bottom: 20px;
`;

const ResultsContainer = styled.div`
  margin-top: 30px;
  width: 100%;
  max-width: 600px;
`;

const ResultsList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ResultItem = styled.li`
  padding: 0px;
  /* background-color: #f9f9f9; */
  margin-bottom: 10px;
  /* border-radius: 5px; */
  /* box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); */
  &:hover {
    /* background-color: #f1f1f1; */
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 1rem;
`;

const BookTitle = styled.h3`
  font-size: 18px;
  color: #61dafb; /* Change text color to #61dafb */
  text-decoration: none;
  margin: 0; /* Remove margin around the h3 */
  background-color: transparent; /* Ensure no background */
`;

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  return (
    <SearchContainer>
      <Title>Favorites</Title>
      <ResultsContainer>
        <ResultsList>
          {favorites.length > 0 ? (
            favorites.map((book) => (
              <ResultItem key={book.id}>
                <BookTitle>{book.title}</BookTitle>
              </ResultItem>
            ))
          ) : (
            <ErrorMessage>No favorites found</ErrorMessage>
          )}
        </ResultsList>
      </ResultsContainer>
    </SearchContainer>
  );
};

export default FavoritesPage;
