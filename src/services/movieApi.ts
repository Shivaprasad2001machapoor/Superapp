import axios from "axios";
import { Movie, CategoryId } from "../types";

export const fetchMoviesByCategory = async (category: CategoryId): Promise<Movie[]> => {
  try {
    const response = await axios.get(`/api/movies?category=${category}`);
    return response.data.movies || [];
  } catch (error) {
    console.error(`Movie query service failure for ${category}:`, error);
    throw error;
  }
};
