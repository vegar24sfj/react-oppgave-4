import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

// Styled components
const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const Image = styled.img`
  max-width: 200px;
  height: auto;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const Info = styled.p`
  font-size: 16px;
  color: #555;
`;

const ReadLink = styled.a`
  display: inline-block;
  margin-top: 10px;
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;

  &:hover {
    background-color: #0056b3;
  }
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 8px 12px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

const BookDetailPage = () => {
  const { id } = useParams(); // Get book ID from URL
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch book details when the component mounts
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(
          `https://gutendex.com/books/?ids=${id}`
        );
        if (response.data.results.length > 0) {
          setBook(response.data.results[0]); // Get the first book from the response
        } else {
          setError("Book not found");
        }
      } catch (error) {
        console.error("Error fetching book details:", error);
        setError("Failed to fetch book details");
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  // Handle adding the book to the favorites
  const handleAddToFavorites = () => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (book && !savedFavorites.some((fav) => fav.id === book.id)) {
      savedFavorites.push(book);
      localStorage.setItem("favorites", JSON.stringify(savedFavorites));
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!book) return <p>No book details available.</p>;

  return (
    <Container>
      <Title>{book.title}</Title>
      {book.formats["image/jpeg"] ? (
        <Image src={book.formats["image/jpeg"]} alt={book.title} />
      ) : (
        <Info>No cover available</Info>
      )}
      <Info>
        Author:{" "}
        {book.authors?.map((author) => author.name).join(", ") || "Unknown"}
      </Info>
      <Info>Downloads: {book.download_count}</Info>
      <Info>Language: {book.languages?.join(", ")}</Info>
      <ReadLink
        href={book.formats["text/html"] || book.formats["application/pdf"]}
        target="_blank"
        rel="noopener noreferrer"
      >
        Read Online
      </ReadLink>
      <Button onClick={handleAddToFavorites}>Add to Favorites</Button>
    </Container>
  );
};

export default BookDetailPage;
