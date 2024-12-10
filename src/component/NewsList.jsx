import React, { useContext, useEffect } from 'react'
import {getNews} from '../api.js'
import { NewsContext } from './NewsContext.jsx';
import New from './New.jsx';
export default function NewsList() {

const NEWS_FETCH_INTERVAL =  72 * 60 * 60 * 1000; // 8 hours in milliseconds


  const {News,SetNews} = useContext(NewsContext);

  // useEffect(() => {
  //   getNews().then((data) => {
  //     SetNews(data.data);
  //     console.log(data);
  
  //   });
  // }, []);
 
  useEffect(() => {
    const fetchAndSaveNews = async () => {
      try {
        const storedNews = localStorage.getItem("news");
        const lastUpdated = localStorage.getItem("lastUpdated");

        // Check if data exists in local storage and is valid
        const now = Date.now();
        if (storedNews && lastUpdated && now - lastUpdated < NEWS_FETCH_INTERVAL) {
          console.log("Using cached news");
          SetNews(JSON.parse(storedNews)); // Load from localStorage
        } else {
          console.log("Fetching new news");
          const data = await getNews();
          SetNews(data.data); 
          console.log(data.data);
          

          // Save data to localStorage
          localStorage.setItem("news", JSON.stringify(data.data));
          localStorage.setItem("lastUpdated", now.toString());
        
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchAndSaveNews();

    // Set up periodic updates every 8 hours
    const interval = setInterval(fetchAndSaveNews, NEWS_FETCH_INTERVAL);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [SetNews]); // `SetNews` is safe to include in dependencies since React guarantees stability


  
  
  return (
    <>
   { News.map((news, index)=>(
       <New key={index} news ={news}/>
    ))}
    </>
  )
}
