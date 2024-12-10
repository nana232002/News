import React, { useEffect, useState } from 'react'
import './itemPage.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { changeMood } from '../api';
import { useUser } from '@clerk/clerk-react';

export default function ItemPage() {
  const location = useLocation();
  const { news } = location.state || {};
  const nevigate = useNavigate();
  const handleBackButton =()=>{
   nevigate("/");
  };

  const [calmnews, setnews] = useState(news);
  

  const handleButton = async () => {
    try {
      const moodValue = await changeMood(news); // Fetch new mood
      setnews(moodValue); // Update the title with the new mood
      console.log(calmnews);
      
    } catch (error) {
      console.error("Error processing mood:", error);
    }
  };
  
  const userData =useUser();
  console.log( "userdata"+userData);
  
  const isAdmin = userData?.user?.publicMetadata.role ==="admin";

  return (
    <>
    <div className="news-card" >
    <button className="button back" onClick={handleBackButton}>Back</button>
      <h1 className="news-title">{calmnews.title}</h1>
      
      {news.image && <img className="news-image" src={news.image} alt="News headline" />}
      <div className="news-details">
        <p className="news-author">Author: <span>{news.author}</span></p>
        <p className="news-source">Source: <span>{news.source}</span></p>
        <p className="news-date">Published on: <span>{news.published_at}</span></p>
      </div>
      <p className="news-summary">{calmnews.description}</p>
      {isAdmin &&  <button className="button calm" onClick={handleButton} >Make It Calm</button>}
      {/* <button className="button calm" onClick={handleButton} >Make It Calm</button> */}
    </div>
    </>
  )
}
