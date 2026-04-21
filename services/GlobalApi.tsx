import axios from "axios";
import { Platform } from "react-native";

const API_BASE_URL =
  process.env.EXPO_PUBLIC_STRAPI_API_URL ??
  (Platform.OS === "android"
    ? "http://10.0.2.2:1338/api"
    : "http://172.20.10.2:1338/api");

const STRAPI_BASE_URL = API_BASE_URL.replace("/api", "");

if (!process.env.EXPO_PUBLIC_STRAPI_API_URL) {
  console.warn(
    `EXPO_PUBLIC_STRAPI_API_URL is not set. Using fallback Strapi URL: ${API_BASE_URL}`,
  );
}

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000, // 15 second timeout
  headers: {
    "Content-Type": "application/json",
    ...(process.env.EXPO_PUBLIC_STRAPI_API_KEY
      ? { Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_KEY}` }
      : {}),
  },
});

// Log the API URL for debugging
console.log("Strapi API Base URL:", API_BASE_URL);

export const getStrapiMediaUrl = (media: any) => {
  if (!media) return undefined;

  const normalize = (item: any) => {
    if (!item) return undefined;
    if (typeof item === "string") return item;
    if (typeof item.url === "string") return item.url;
    const attrs = item.attributes ?? item.data?.attributes;
    if (typeof attrs?.url === "string") return attrs.url;
    if (typeof attrs?.formats?.medium?.url === "string") {
      return attrs.formats.medium.url;
    }
    if (typeof attrs?.formats?.thumbnail?.url === "string") {
      return attrs.formats.thumbnail.url;
    }
    return undefined;
  };

  let record = Array.isArray(media) ? media[0] : media;
  if (record?.data) {
    record = Array.isArray(record.data) ? record.data[0] : record.data;
  }

  const url = normalize(record);
  if (!url || typeof url !== "string") return undefined;
  return url.startsWith("http") ? url : `${STRAPI_BASE_URL}${url}`;
};

export { STRAPI_BASE_URL };

