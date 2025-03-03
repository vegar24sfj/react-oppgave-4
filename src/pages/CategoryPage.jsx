import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { searchBooks } from "../services/gutendexAPI";
import styled from "styled-components";

// Styled components
const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  margin-bottom: 15px;
`;

const BookTitle = styled.h3`
  font-size: 18px;
  color: #007bff;
  text-decoration: none;
`;

const Author = styled.p`
  font-size: 16px;
  color: #555;
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

  if (loading) return <p>Loading...</p>;
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
