import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { searchBooks } from "../services/gutendexAPI";
import styled from "styled-components";

// Styled components
const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center content horizontally */
  min-height: 100vh; /* Ensure it takes up the full height */
  position: relative; /* Needed for absolute positioning of loading text */
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center; /* Center text */
  color: white;
`;

const List = styled.ul`
  list-style: none;
  padding: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center the list items horizontally */
`;

const ListItem = styled.li`
  margin-bottom: 15px;
  text-align: center; /* Center text inside the list items */
`;

const BookTitle = styled.h3`
  font-size: 18px;
  color: #61dafb;
  text-decoration: none;
  text-align: center; /* Center the book title */

  &:hover {
    text-decoration: underline; /* Add underline on hover */
  }
`;

const Author = styled.p`
  font-size: 16px;
  color: #555;
  text-align: center; /* Center the author name */
`;

const LoadingText = styled.p`
  font-size: 24px;
  color: white;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* Center the loading text */
  margin: 0;
`;

const CategoryPage = () => {
  const { category } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const data = await searchBooks("", 1, "popular", category);
        setBooks(data.results);
      } catch (error) {
        setError("Failed to load books");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [category]);

  if (loading) return <LoadingText>Loading...</LoadingText>;
  if (error) return <p>{error}</p>;

  return (
    <Container>
      <Title>Books in {category} Category</Title>
      <List>
        {books.map((book) => (
          <ListItem key={book.id}>
            <Link to={`/book/${book.id}`} style={{ textDecoration: "none" }}>
              <BookTitle>{book.title}</BookTitle>
            </Link>
            <Author>{book.author}</Author>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default CategoryPage;
