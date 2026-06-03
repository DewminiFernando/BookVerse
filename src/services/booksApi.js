const BASE_URL = "https://www.googleapis.com/books/v1";
const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

const normalizeVolume = (item) => {
  const volume = item?.volumeInfo || {};
  const coverUrl = volume.imageLinks?.thumbnail
    ? volume.imageLinks.thumbnail.replace("http://", "https://")
    : null;
  const rawDate = item.volumeInfo?.publishedDate || "";
  const year = rawDate ? rawDate.toString().substring(0, 4) : null;

  return {
    id: item?.id || "",
    title: volume.title || "Unknown Title",
    author: volume.authors?.[0] || "Unknown Author",
    authors: volume.authors || [],
    coverId: null,
    coverUrl,
    genre: volume.categories?.[0] || "General",
    rating: volume.averageRating || null,
    ratingsCount: volume.ratingsCount || 0,
    pages: volume.pageCount || null,
    year: year,
    description: volume.description || null,
    subjects: volume.categories || [],
    publisher: volume.publisher || null,
    language: volume.language || "en",
    previewLink: volume.previewLink || null,
  };
};

const fetchJson = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return response.json();
};

export const searchBooks = async (query, options = {}) => {
  const { sort = "newest", startIndex = 0 } = options;
  if (!query) return [];
  const url = `${BASE_URL}/volumes?q=${encodeURIComponent(
    query
  )}&printType=books&orderBy=${sort}&maxResults=40&startIndex=${startIndex}&key=${API_KEY}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (!data.items) return [];
    return data.items.map(normalizeVolume);
  } catch (err) {
    console.error("searchBooks error:", err);
    return [];
  }
};

export const getBooksBySubject = async (subject, options = {}) => {
  const { sort = "relevance", startIndex = 0 } = options;
  if (!subject) return [];
  const url = `${BASE_URL}/volumes?q=subject:${encodeURIComponent(
    subject
  )}&printType=books&orderBy=${sort}&maxResults=40&startIndex=${startIndex}&key=${API_KEY}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (!data.items) return [];
    const normalized = data.items.map(normalizeVolume);
    return normalized.filter((book) => book.coverUrl);
  } catch (err) {
    console.error("getBooksBySubject error:", err);
    return [];
  }
};

export const getBookDetails = async (volumeId) => {
  if (!volumeId) return null;
  try {
    const url = `${BASE_URL}/volumes/${volumeId}?key=${API_KEY}`;
    const data = await fetchJson(url);
    return normalizeVolume(data);
  } catch (error) {
    console.error("getBookDetails failed", error);
    return null;
  }
};

export const getTrendingBooks = async ({ startIndex = 0, language = "en" } = {}) => {
  try {
    const url1 = `${BASE_URL}/volumes?q=bestseller&printType=books&orderBy=newest&maxResults=40&startIndex=${startIndex}&langRestrict=${language}&key=${API_KEY}`;
    const url2 = `${BASE_URL}/volumes?q=popular+novel&printType=books&orderBy=newest&maxResults=40&startIndex=${startIndex}&langRestrict=${language}&key=${API_KEY}`;
    const [response1, response2] = await Promise.all([fetchJson(url1), fetchJson(url2)]);
    const items1 = Array.isArray(response1?.items) ? response1.items : [];
    const items2 = Array.isArray(response2?.items) ? response2.items : [];
    const combined = [...items1, ...items2].map(normalizeVolume);
    const filtered = combined.filter((book) => book.coverUrl);
    const unique = [...new Map(filtered.map((book) => [book.id, book])).values()];
    return unique.slice(0, 50);
  } catch (error) {
    console.error("getTrendingBooks failed", error);
    return [];
  }
};

export const getRecentBooks = async () => {
  try {
    const url1 = `${BASE_URL}/volumes?q=fiction+novel&printType=books&orderBy=newest&maxResults=40&langRestrict=en&startIndex=0&key=${API_KEY}`;
    const url2 = `${BASE_URL}/volumes?q=romance+thriller&printType=books&orderBy=newest&maxResults=40&langRestrict=en&startIndex=0&key=${API_KEY}`;
    const [response1, response2] = await Promise.all([fetchJson(url1), fetchJson(url2)]);
    const items1 = Array.isArray(response1?.items) ? response1.items : [];
    const items2 = Array.isArray(response2?.items) ? response2.items : [];
    const combined = [...items1, ...items2].map(normalizeVolume);
    const filtered = combined.filter((book) => book.coverUrl);
    const unique = [...new Map(filtered.map((book) => [book.id, book])).values()];
    return unique.slice(0, 60);
  } catch (error) {
    console.error("getRecentBooks failed", error);
    return [];
  }
};

export const getAuthor = async (authorName) => {
  if (!authorName) return null;
  try {
    const url = `${BASE_URL}/volumes?q=inauthor:${encodeURIComponent(
      authorName
    )}&maxResults=5&key=${API_KEY}`;
    const data = await fetchJson(url);
    const item = Array.isArray(data?.items) ? data.items[0] : null;
    if (!item) return null;
    const volume = item.volumeInfo || {};
    return {
      name: volume.authors?.[0] || authorName,
      bio: null,
      photoUrl: null,
    };
  } catch (error) {
    console.error("getAuthor failed", error);
    return null;
  }
};