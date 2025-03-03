import { HashRouter as Router, Route, Routes } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import CategoryPage from "./pages/CategoryPage";
import BookDetailPage from "./pages/BookDetailPage";
import FavoritesPage from "./pages/FavoritesPage";
import Header from "./components/Header";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <SearchPage />
            </>
          }
        />
        <Route
          path="/category/:category"
          element={
            <>
              <Header />
              <CategoryPage />
            </>
          }
        />
        <Route
          path="/book/:id"
          element={
            <>
              <Header />
              <BookDetailPage />
            </>
          }
        />
        <Route
          path="/favorites"
          element={
            <>
              <Header />
              <FavoritesPage />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
