import { HashRouter as Router, Route, Routes } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import CategoryPage from "./pages/CategoryPage";
import BookDetailPage from "./pages/BookDetailPage";
import FavoritesPage from "./pages/FavoritesPage";
import Header from "./components/Header";
import styled from "styled-components";

// Styled-components for the content area
const MainContent = styled.div`
  margin-top: 60px; /* Make sure this matches the height of the header */
  padding: 20px;
  width: 100%;
  min-height: 100vh; /* Ensures the content fills the page */
`;

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <MainContent>
                <SearchPage />
              </MainContent>
            </>
          }
        />
        <Route
          path="/category/:category"
          element={
            <>
              <Header />
              <MainContent>
                <CategoryPage />
              </MainContent>
            </>
          }
        />
        <Route
          path="/book/:id"
          element={
            <>
              <Header />
              <MainContent>
                <BookDetailPage />
              </MainContent>
            </>
          }
        />
        <Route
          path="/favorites"
          element={
            <>
              <Header />
              <MainContent>
                <FavoritesPage />
              </MainContent>
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
