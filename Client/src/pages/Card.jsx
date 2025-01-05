import React from "react";

const Card = ({ data }) => {
  return (
    <div className="news-app-card-container">
      {data.map((curItem, index) => {
        if (!curItem.urlToImage) {
          return null; // Skip items without images
        } else {
          return (
            <div key={index} className="news-app-card">
              <img src={curItem.urlToImage} alt={curItem.title} />
              <div className="news-app-card-content">
                <a href={curItem.url} target="_blank" rel="noopener noreferrer" className="news-app-card-title">
                  {curItem.title}
                </a>
                <p>{curItem.description}</p>
                <button onClick={() => window.open(curItem.url)}>Read More</button>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Card;
