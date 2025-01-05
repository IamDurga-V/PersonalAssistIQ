import React, { useEffect, useState } from "react";
import Card from "./Card";
import './NewsApp.css';

const NewsApp = () => {
  const [search, setSearch] = useState("India");
  const [newsData, setNewsData] = useState(null);
  const [loading, setLoading] = useState(false); // State for loading
  const API_KEY = "e9d6f444af9a48a78f44c3052fe9e969";

  const getData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const jsonData = await response.json();
      setNewsData(jsonData.articles);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [search]);

  useEffect(() => {
    // Apply flex-start alignment to the body
    document.body.style.display = 'flex';
    document.body.style.alignItems = 'flex-start';

    // Reset styles when component unmounts
    return () => {
      document.body.style.display = '';
      document.body.style.alignItems = '';
    };
  }, []);

  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  const handleCategoryClick = (category) => {
    setSearch(category);
  };

  return (
    <div className="news-page-wrapper">
      <div className="news-app-container">
        <header className="news-app-header">
          <h1>Latest News Updates</h1>
        </header>

        <nav className="news-app-navbar">
          <div>
            <h2>Trendy News</h2>
          </div>
          <ul className="news-app-nav-links">
          <a>All News</a>
          <a>Trending</a>
          </ul>
          <div className="news-app-search-bar">
            <input 
              type="text" 
              placeholder="Search News" 
              value={search} 
              onChange={handleInput} 
            />
            <button onClick={getData}>Search</button>
          </div>
        </nav>

        <div className="news-app-category-btns">
          <button onClick={() => handleCategoryClick("Sports")}>Sports</button>
          <button onClick={() => handleCategoryClick("Politics")}>Politics</button>
          <button onClick={() => handleCategoryClick("Entertainment")}>Entertainment</button>
          <button onClick={() => handleCategoryClick("Health")}>Health</button>
          <button onClick={() => handleCategoryClick("Fitness")}>Fitness</button>
        </div>

        <div className="news-app-cards">
          {loading ? (
            <p>Loading...</p>
          ) : (
            newsData ? <Card data={newsData} /> : <p>No news available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsApp;
