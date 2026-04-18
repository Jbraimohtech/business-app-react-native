import axios from "axios";
import { Platform } from "react-native";

const API_BASE_URL =
  process.env.EXPO_PUBLIC_STRAPI_API_URL ??
  (Platform.OS === "android"
    ? "http://10.0.2.2:1337/api"
    : "http://localhost:1337/api");

const STRAPI_BASE_URL = API_BASE_URL.replace("/api", "");

if (!process.env.EXPO_PUBLIC_STRAPI_API_URL) {
  console.warn(
    `EXPO_PUBLIC_STRAPI_API_URL is not set. Using fallback Strapi URL: ${API_BASE_URL}`,
  );
}

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    ...(process.env.EXPO_PUBLIC_STRAPI_API_KEY
      ? { Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_KEY}` }
      : {}),
  },
});

export { STRAPI_BASE_URL };

