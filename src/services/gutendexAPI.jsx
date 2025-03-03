import axios from "axios";

// Base URL for Gutendex API
const BASE_URL = "https://gutendex.com/books";

// Function to fetch books based on a search query
// Assuming this function makes the API call
export const searchBooks = async (
  query,
  page = 1,
  sort = "popular",
  category = ""
) => {
  try {
    let url = `${BASE_URL}/?page=${page}&topic=${category}&sort=${sort}`; // Add sort parameter to URL

    if (query) {
      url += `&search=${query}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error; // Re-throw error for further handling
  }
};

// Function to fetch books by category/topic (e.g., Fiction, Mystery, etc.)
export const getBooksByCategory = async (topic, page = 1) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        topic: topic,
        page: page,
      },
    });
    return response.data; // { count, next, previous, results }
  } catch (error) {
    console.error("Error fetching books by category:", error);
    throw error;
  }
};

// Function to fetch details of an individual book
export const getBookDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data; // Book details object
  } catch (error) {
    console.error("Error fetching book details:", error);
    throw error;
  }
};

// Function to get books by language
export const getBooksByLanguage = async (languages = "en", page = 1) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        languages: languages,
        page: page,
      },
    });
    return response.data; // { count, next, previous, results }
  } catch (error) {
    console.error("Error fetching books by language:", error);
    throw error;
  }
};

// Function to fetch books by author year range
export const getBooksByAuthorYear = async (startYear, endYear, page = 1) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        author_year_start: startYear,
        author_year_end: endYear,
        page: page,
      },
    });
    return response.data; // { count, next, previous, results }
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
