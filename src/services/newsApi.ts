import axios from "axios";
import { NewsStory } from "../types";

export const fetchTopHeadlines = async (): Promise<NewsStory[]> => {
  try {
    const response = await axios.get("/api/news");
    return response.data.stories || [];
  } catch (error) {
    console.error("News service failure:", error);
    throw error;
  }
};
