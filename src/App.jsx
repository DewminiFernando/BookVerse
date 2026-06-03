import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { BookProvider, useBook } from "./context/BookContext.jsx";
import Navbar from "./components/layout/Navbar.jsx";
import Sidebar from "./components/layout/Sidebar.jsx";
import Footer from "./components/layout/Footer.jsx";
import Home from "./pages/Home.jsx";
import Explore from "./pages/Explore.jsx";
import BookDetails from "./pages/BookDetails.jsx";
import Favorites from "./pages/Favorites.jsx";
import Analytics from "./pages/Analytics.jsx";
import Profile from "./pages/Profile.jsx";

const AppShell = () => {
  const { theme } = useBook();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className="bg-cream-100 dark:bg-charcoal-900 text-charcoal-900 dark:text-cream-100 min-h-screen transition-colors duration-400 grain"
      data-theme={theme}
    >
      <Navbar setSidebarOpen={setSidebarOpen} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="min-h-screen pt-16">
        <div className="page-enter">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/book/:id" element={<BookDetails />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const App = () => (
  <BookProvider>
    <AppShell />
  </BookProvider>
);

export default App;

