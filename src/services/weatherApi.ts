import axios from "axios";
import { WeatherData } from "../types";

export const fetchCurrentWeather = async (lat: number, lon: number, cityLabel: string): Promise<WeatherData> => {
  try {
    const response = await axios.get(`/api/weather?lat=${lat}&lon=${lon}&q=${encodeURIComponent(cityLabel)}`);
    return response.data;
  } catch (error) {
    console.error("Weather service failure:", error);
    throw error;
  }
};
