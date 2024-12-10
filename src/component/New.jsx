import React, { useEffect, useState } from 'react'
import './news.css'
import { useNavigate } from 'react-router-dom'
import ItemPage from './ItemPage';
import { processTitleMood } from "../api.js";
export default function New({news}) {
  const [mood, setMood] = useState();

  useEffect(() => {
    const fetchMood = async () => {
      try {
        const moodValue = await processTitleMood(news.title);
        setMood(moodValue);
       
        
      } catch (error) {
        console.error("Error processing mood:", error);
      }
    };
    fetchMood();
  }, [news.title]);

  
  const nevigate =useNavigate();
  function handleOnClick() {
    nevigate("/news", { state: { news } }); 
  }
  return (
  <>
   <div className="article-card" onClick={handleOnClick}>
  <div className="article-content">
    <h1 className="article-title">{news.title}</h1>
    <div className="article-info">
      <p className="article-author">Author: <span>{news.author}</span></p>
      <p className="article-source">Source: <span>{news.source}</span></p>
      <p className="article-date">Published on: <span>{news.published_at}</span></p>
      <p className="mosde">mode: <span>{mood}</span></p>
    </div>
  </div>
  <div className="article-image">
    <img
      src={news.image}
      alt="News headline"
    />
  </div>
</div>
  </>
  )
}
