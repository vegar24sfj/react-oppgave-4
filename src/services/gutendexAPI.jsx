// services/gutendexAPI.js

const BASE_URL = "https://gutendex.com/books"; // Make sure this URL is correct

// Function to fetch books based on a search query (title or author)
export const searchBooks = async (
  query,
  page = 1,
  sort = "popular",
  category = "",
  searchType = "title"
) => {
  try {
    let url = `${BASE_URL}/?page=${page}&topic=${category}&sort=${sort}`;

    // Search logic for title or author based on `searchType`
    if (query) {
      if (searchType === "title") {
        url += `&search=${query}`; // Search by title
      } else if (searchType === "author") {
        url += `&author=${query}`; // Search by author
      }
    }

    const response = await fetch(url);
    const data = await response.json();

    // Log API response for debugging purposes
    console.log("API Response:", data);

    return data; // Return the results from the API
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error; // Rethrow the error for further handling
  }
};

// Function to fetch books by category (e.g., Fiction, Mystery, etc.)
export const getBooksByCategory = async (topic, page = 1) => {
  try {
    const response = await fetch(`${BASE_URL}/?topic=${topic}&page=${page}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching books by category:", error);
    throw error;
  }
};

// Function to fetch book details by book ID
export const getBookDetails = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching book details:", error);
    throw error;
  }
};

// Function to fetch books by language (e.g., English, French)
export const getBooksByLanguage = async (languages = "en", page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/?languages=${languages}&page=${page}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching books by language:", error);
    throw error;
  }
};

// Function to fetch books by author year range (e.g., 1800 - 1900)
export const getBooksByAuthorYear = async (startYear, endYear, page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/?author_year_start=${startYear}&author_year_end=${endYear}&page=${page}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching books by author year:", error);
    throw error;
  }
};

// Function to add a book to favorites (saved to localStorage)
export const addToFavorites = (book) => {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  if (!favorites.some((fav) => fav.id === book.id)) {
    favorites.push(book);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
};

// Function to get favorite books from localStorage
export const getFavorites = () => {
  return JSON.parse(localStorage.getItem("favorites")) || [];
};

// Function to fetch books by their IDs (useful for fetching details of multiple books)
export const getBooksByIds = async (ids) => {
  try {
    const url = `${BASE_URL}/?ids=${ids.join(",")}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching books by IDs:", error);
    throw error;
  }
};
