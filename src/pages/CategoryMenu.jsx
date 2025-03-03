import { Link } from "react-router-dom";
import styled from "styled-components";

const categories = [
  "Fiction",
  "Mystery",
  "Thriller",
  "Romance",
  "Fantasy",
  "Morality",
  "Society",
  "Power",
  "Justice",
  "Adventure",
  "Tragedy",
  "War",
  "Philosophy",
];

// Styled components
const Nav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px;
  justify-content: center; /* Center items in the container */
`;

const CategoryLink = styled(Link)`
  text-decoration: none;
  background-color: #007bff;
  color: white;
  padding: 8px 12px;
  border-radius: 5px;
  font-size: 14px;
  transition: background 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    font-size: 12px; /* Adjust font size for mobile */
    padding: 6px 10px; /* Adjust padding for mobile */
  }
`;

const CategoryMenu = () => (
  <Nav>
    {categories.map((category) => (
      <CategoryLink key={category} to={`/category/${category.toLowerCase()}`}>
        {category}
      </CategoryLink>
    ))}
  </Nav>
);

export default CategoryMenu;
