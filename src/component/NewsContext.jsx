import { createContext, useState } from "react";

export const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
    const [News, SetNews] = useState([]); 

    return (
        <NewsContext.Provider value={{ News, SetNews }}>
            {children} 
        </NewsContext.Provider>
    );
};
