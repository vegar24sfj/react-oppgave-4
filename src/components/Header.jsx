import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Styled-components for the header
const HeaderContainer = styled.header`
  background-color: #282c34;
  padding: 1rem 5rem; /* Reduced padding for header height */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box; /* Prevents overflow due to padding */

  @media (max-width: 768px) {
    padding: 0.3rem 1rem; /* Smaller padding on mobile */
  }
`;

const Nav = styled.nav`
  display: flex;
  flex-wrap: wrap; /* Allow wrapping of items */
  justify-content: space-between; /* Distribute space evenly */
  gap: 10px; /* Add space between links */
  width: 100%;
  overflow-x: auto; /* This will allow horizontal scrolling if needed */

  @media (max-width: 768px) {
    padding-bottom: 1rem;
  }
`;

const Li = styled.li`
  margin: 0 1rem;

  @media (max-width: 768px) {
    &:nth-child(1) {
      margin-bottom: 1rem; /* Adjust space for mobile */
    }

    &:nth-child(14) {
      margin-bottom: 1rem; /* Adjust space for mobile */
    }
  }
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  &:hover {
    color: #61dafb;
  }

  @media (max-width: 768px) {
    font-size: 1rem; /* Adjust font size for smaller screens */
  }
`;

const BurgerMenu = styled.div`
  display: none;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
    font-size: 2rem;
    color: white;
    position: absolute;
    right: 1rem; /* Adjust position */
    top: 50%; /* Center the burger icon vertically */
    transform: translateY(-50%); /* Fine-tune to center vertically */
  }
`;

const Menu = styled.ul`
  display: flex;
  flex-wrap: wrap; /* This will allow the menu items to wrap to the next line */
  list-style: none;
  padding: 0;
  margin: 0;
  justify-content: flex-start; /* Align to start for better wrapping */
  width: 100%; /* Make sure the menu takes the full width */

  @media (max-width: 1024px) {
    flex-direction: row;
    justify-content: flex-start; /* Wraps items to the next line when space is needed */
  }

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
    flex-direction: column;
    align-items: flex-start;
    background-color: #282c34;
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    padding: 1rem;
    z-index: 1000;
  }
`;

const Title = styled.h1`
  color: white;
  font-size: 1.5rem;
  margin-right: 80px;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 1.5rem; /* Adjust font size for mobile, make it smaller */
    text-align: center; /* Optional: center text for mobile */
    margin-right: 0; /* Optional: reset margin on mobile */
  }
`;

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const closeMenuOnClick = () => {
    if (window.innerWidth <= 768) {
      setIsOpen(false);
    }
  };

  return (
    <HeaderContainer>
      <Title>React oppgave 4</Title> {/* Title with margin-right and nowrap */}
      <BurgerMenu onClick={toggleMenu}>☰</BurgerMenu>
      <Nav>
        <Menu ref={menuRef} isOpen={isOpen}>
          <Li>
            <StyledLink to="/" onClick={closeMenuOnClick}>
              Home
            </StyledLink>
          </Li>
          <Li>
            <StyledLink to="/category/fiction" onClick={closeMenuOnClick}>
              Fiction
            </StyledLink>
          </Li>
          <Li>
            <StyledLink to="/category/mystery" onClick={closeMenuOnClick}>
              Mystery
            </StyledLink>
          </Li>
          <Li>
            <StyledLink to="/category/thriller" onClick={closeMenuOnClick}>
              Thriller
            </StyledLink>
          </Li>
          <Li>
            <StyledLink to="/category/romance" onClick={closeMenuOnClick}>
              Romance
            </StyledLink>
          </Li>
          <Li>
            <StyledLink to="/category/fantasy" onClick={closeMenuOnClick}>
              Fantasy
            </StyledLink>
          </Li>
          <Li>
            <StyledLink to="/category/morality" onClick={closeMenuOnClick}>
              Morality
            </StyledLink>
          </Li>
          <Li>
            <StyledLink to="/category/society" onClick={closeMenuOnClick}>
              Society
            </StyledLink>
          </Li>
          <Li>
            <StyledLink to="/category/power" onClick={closeMenuOnClick}>
              Power
            </StyledLink>
          </Li>
          <Li>
            <StyledLink to="/category/justice" onClick={closeMenuOnClick}>
              Justice
            </StyledLink>
          </Li>
          <Li>
            <StyledLink to="/category/adventure" onClick={closeMenuOnClick}>
              Adventure
            </StyledLink>
          </Li>
          <Li>
            <StyledLink to="/category/tragedy" onClick={closeMenuOnClick}>
              Tragedy
            </StyledLink>
          </Li>
          <Li>
            <StyledLink to="/category/war" onClick={closeMenuOnClick}>
              War
            </StyledLink>
          </Li>
          <Li>
            <StyledLink to="/category/philosophy" onClick={closeMenuOnClick}>
              Philosophy
            </StyledLink>
          </Li>
          <Li>
            <StyledLink to="/favorites" onClick={closeMenuOnClick}>
              Favorites
            </StyledLink>
          </Li>
        </Menu>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
