// ─────────────────────────────────────────────────────────────────────────────
// demoData.js — Preloaded demo data for BookVerse
// Only used on first visit when localStorage is empty.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Generate a date string in the same format the app uses:
 * new Date().toLocaleDateString() → e.g. "6/4/2026" (locale-dependent)
 * We offset `daysAgo` from today.
 */
const dateAgo = (daysAgo) => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toLocaleDateString();
};

// ─── Demo Books ───────────────────────────────────────────────────────────────
// Real Google Books volume IDs so the Book Details page resolves correctly.

export const DEMO_BOOKS = [
  {
    id: "YEvzEAAAQBAJ",
    title: "Better Than the Movies",
    author: "Lynn Painter",
    authors: ["Lynn Painter"],
    coverId: null,
    coverUrl:
      "https://books.google.com/books/content?id=YEvzEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    genre: "Romance",
    rating: 4,
    ratingsCount: 312,
    pages: 373,
    year: "2021",
    description:
      "Liz Buxbaum gave up on romance after her mother died, but when her childhood crush moves in next door, she recruits her irritating neighbour Wes to help her land the perfect guy — only to find herself falling for the wrong boy instead.",
    subjects: ["Young Adult Fiction"],
    publisher: "Simon and Schuster",
    language: "en",
    previewLink:
      "http://books.google.com/books?id=YEvzEAAAQBAJ&printsec=frontcover&dq=Better+Than+the+Movies+Lynn+Painter&hl=&cd=1&source=gbs_api",
  },
  {
    id: "i3jmEAAAQBAJ",
    title: "Twisted Love",
    author: "Ana Huang",
    authors: ["Ana Huang"],
    coverId: null,
    coverUrl:
      "https://books.google.com/books/content?id=i3jmEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    genre: "Romance",
    rating: 4,
    ratingsCount: 876,
    pages: 363,
    year: "2022",
    description:
      "Alex Volkov is a devil with an angel's face — a cold, brilliant businessman cursed by a past he cannot escape. When he agrees to watch over his best friend's sister Ava Chen, he never expects to fall for her warmth and light. But some secrets can destroy everything.",
    subjects: ["Fiction"],
    publisher: "Word Audio Publishing",
    language: "en",
    previewLink:
      "http://books.google.com/books?id=i3jmEAAAQBAJ&printsec=frontcover&dq=Twisted+Love+Ana+Huang&hl=&cd=1&source=gbs_api",
  },
  {
    id: "xC-TzwEACAAJ",
    title: "Fourth Wing",
    author: "Rebecca Yarros",
    authors: ["Rebecca Yarros"],
    coverId: null,
    coverUrl:
      "https://books.google.com/books/content?id=xC-TzwEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    genre: "Fantasy",
    rating: 5,
    ratingsCount: 2341,
    pages: 517,
    year: "2023",
    description:
      "Twenty-year-old Violet Sorrengail was supposed to enter the Scribe Quadrant, living a quiet life among books. Now she must join hundreds of candidates striving to become elite dragon riders at Basgiath War College — where the only thing more dangerous than the dragons is the secrets kept by the rebel-born rider who both threatens and protects her.",
    subjects: ["Fiction"],
    publisher: "Piatkus Books",
    language: "en",
    previewLink:
      "http://books.google.com/books?id=xC-TzwEACAAJ&dq=Fourth+Wing+Rebecca+Yarros&hl=&cd=1&source=gbs_api",
  },
  {
    id: "0Yo7PgAACAAJ",
    title: "Harry Potter and the Philosopher's Stone",
    author: "J. K. Rowling",
    authors: ["J. K. Rowling"],
    coverId: null,
    coverUrl:
      "https://books.google.com/books/content?id=0Yo7PgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    genre: "Fantasy",
    rating: 5,
    ratingsCount: 9842,
    pages: 332,
    year: "1997",
    description:
      "When a letter arrives for unhappy but ordinary Harry Potter, a decade-old secret is revealed: his parents were wizards, killed by a Dark Lord's curse. Escaping his hideous Muggle guardians for Hogwarts — a wizarding school brimming with ghosts and enchantments — Harry stumbles upon a sinister adventure and discovers his remarkable destiny.",
    subjects: ["Children's stories"],
    publisher: "Bloomsbury Publishing",
    language: "en",
    previewLink:
      "http://books.google.com/books?id=0Yo7PgAACAAJ&dq=Harry+Potter+Philosopher%27s+Stone&hl=&cd=1&source=gbs_api",
  },
  {
    id: "7V9BPwAACAAJ",
    title: "The Duke and I",
    author: "Julia Quinn",
    authors: ["Julia Quinn"],
    coverId: null,
    coverUrl:
      "https://books.google.com/books/content?id=7V9BPwAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    genre: "Romance",
    rating: 4,
    ratingsCount: 1203,
    pages: 339,
    year: "2000",
    description:
      "Daphne Bridgerton and the newly returned Duke of Hastings agree to a courtship charade to deflect unwanted suitors — only to find themselves in very real danger of falling in love. A witty Regency romance full of sparkling dialogue and undeniable chemistry.",
    subjects: ["Fiction"],
    publisher: "Piatkus Books",
    language: "en",
    previewLink:
      "http://books.google.com/books?id=7V9BPwAACAAJ&dq=The+Duke+and+I+Julia+Quinn&hl=&cd=1&source=gbs_api",
  },
  {
    id: "iwBaDwAAQBAJ",
    title: "The Deal",
    author: "Elle Kennedy",
    authors: ["Elle Kennedy"],
    coverId: null,
    coverUrl:
      "https://books.google.com/books/content?id=iwBaDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    genre: "Romance",
    rating: 5,
    ratingsCount: 654,
    pages: 437,
    year: "2015",
    description:
      "She's about to make a deal with the college hockey star. Garrett Graham is the last person Hannah Wells wants to deal with — he's arrogant, cocky, and annoyingly gorgeous. But when he offers to help her ace her midterms in exchange for fake-dating help, saying no isn't an option. Turns out Garrett is nothing like she thought, and their deal is about to become the real thing.",
    subjects: ["Fiction"],
    publisher: "Elle Kennedy Inc.",
    language: "en",
    previewLink:
      "http://books.google.com/books?id=iwBaDwAAQBAJ&printsec=frontcover&dq=The+Deal+Elle+Kennedy&hl=&cd=1&source=gbs_api",
  },
];

// ─── Demo Favorites ────────────────────────────────────────────────────────────
// All 6 books go into favorites.

export const DEMO_FAVORITES = [...DEMO_BOOKS];

// ─── Demo Reading List ─────────────────────────────────────────────────────────
// Format: { book, status, currentPage }

export const DEMO_READING_LIST = [
  {
    book: DEMO_BOOKS[2], // Fourth Wing — actively reading
    status: "reading",
    currentPage: 220,
  },
  {
    book: DEMO_BOOKS[3], // Harry Potter — completed
    status: "completed",
    currentPage: 332,
  },
  {
    book: DEMO_BOOKS[0], // Better Than the Movies — reading
    status: "reading",
    currentPage: 140,
  },
  {
    book: DEMO_BOOKS[4], // The Duke and I — to-read
    status: "to-read",
    currentPage: 0,
  },
  {
    book: DEMO_BOOKS[1], // Twisted Love — to-read
    status: "to-read",
    currentPage: 0,
  },
  {
    book: DEMO_BOOKS[5], // The Deal — reading
    status: "reading",
    currentPage: 85,
  },
];

// ─── Demo Reading Sessions ─────────────────────────────────────────────────────
// 10 consecutive days of sessions to produce a visible streak and line chart.
// The date format must match new Date().toLocaleDateString() used in the app.

export const DEMO_READING_SESSIONS = [
  // Day 10 ago
  { date: dateAgo(10), pagesRead: 42, bookId: "0Yo7PgAACAAJ", bookTitle: "Harry Potter and the Philosopher's Stone" },
  // Day 9 ago
  { date: dateAgo(9), pagesRead: 55, bookId: "0Yo7PgAACAAJ", bookTitle: "Harry Potter and the Philosopher's Stone" },
  { date: dateAgo(9), pagesRead: 18, bookId: "7V9BPwAACAAJ", bookTitle: "The Duke and I" },
  // Day 8 ago
  { date: dateAgo(8), pagesRead: 63, bookId: "xC-TzwEACAAJ", bookTitle: "Fourth Wing" },
  // Day 7 ago
  { date: dateAgo(7), pagesRead: 38, bookId: "xC-TzwEACAAJ", bookTitle: "Fourth Wing" },
  { date: dateAgo(7), pagesRead: 25, bookId: "iwBaDwAAQBAJ", bookTitle: "The Deal" },
  // Day 6 ago
  { date: dateAgo(6), pagesRead: 72, bookId: "xC-TzwEACAAJ", bookTitle: "Fourth Wing" },
  // Day 5 ago
  { date: dateAgo(5), pagesRead: 50, bookId: "YEvzEAAAQBAJ", bookTitle: "Better Than the Movies" },
  { date: dateAgo(5), pagesRead: 30, bookId: "iwBaDwAAQBAJ", bookTitle: "The Deal" },
  // Day 4 ago
  { date: dateAgo(4), pagesRead: 44, bookId: "xC-TzwEACAAJ", bookTitle: "Fourth Wing" },
  // Day 3 ago
  { date: dateAgo(3), pagesRead: 68, bookId: "YEvzEAAAQBAJ", bookTitle: "Better Than the Movies" },
  { date: dateAgo(3), pagesRead: 22, bookId: "i3jmEAAAQBAJ", bookTitle: "Twisted Love" },
  // Day 2 ago
  { date: dateAgo(2), pagesRead: 57, bookId: "xC-TzwEACAAJ", bookTitle: "Fourth Wing" },
  // Day 1 ago (yesterday)
  { date: dateAgo(1), pagesRead: 81, bookId: "xC-TzwEACAAJ", bookTitle: "Fourth Wing" },
  { date: dateAgo(1), pagesRead: 35, bookId: "i3jmEAAAQBAJ", bookTitle: "Twisted Love" },
  // Today
  { date: dateAgo(0), pagesRead: 48, bookId: "YEvzEAAAQBAJ", bookTitle: "Better Than the Movies" },
];

// ─── Default Demo Profile Values ───────────────────────────────────────────────

export const DEMO_PROFILE_NAME = "Cozy Reader";
export const DEMO_GOALS = { yearlyGoal: 15, dailyGoal: 45 };
