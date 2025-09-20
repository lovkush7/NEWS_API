import React, { useEffect, useState } from 'react'
import axios from "axios"
import "./App.css"

const App = () => {
  const [article,setArticle] = useState([]);

  useEffect(()=>{
  const fetchnews = async()=>{
   try{
    const options = {
      method: 'GET',
      url: 'https://real-time-news-data.p.rapidapi.com/search',
      params: {
        query: 'Football',
        limit: '10',
        time_published: 'anytime',
        country: 'US',
        lang: 'en'
      },
      headers: {
        'x-rapidapi-key': '4afbb366aemshd20f87ca222baa4p1969dbjsn89645635c2e9',
        'x-rapidapi-host': 'real-time-news-data.p.rapidapi.com'
      }
    };

    const res = await axios.request(options);
    setArticle(res.data.data || []);
    console.log(res.data);


   }catch(err){
    console.error("the error is "+err);
    setArticle([]);
   }
  }
  fetchnews();

  },[])
  return (
    <div className='app'>
    <h1>Latest News</h1>
    <ul>
      {article.length > 0 ? (
        article.map((article, index) => (
          <li key={index}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <div className="article-cont">
                <div className="author" style={{padding:"15px"}}>
                 <p> Author:{article.authors}  </p>
                </div>
                <div className="title" style={{paddingBottom:"15px"}}>
               <p>
                  TITle: {article.title}</p>
              </div>
              <div className="snippet" style={{paddingBottom:"20px"}}>
               <p>
                  SNIPPET: {article.snippet}</p>
              </div>
              <div className="more-info" style={{paddingBottom:"20px"}}>
                <a href={article.
source_url
}>click here for more information...</a>
              </div>
              <div className="article-image-container">
              <img src={article.photo_url} alt="" className='article-image' />
              </div>
              </div>
            </a>
          </li>
        ))
      ) : (
        <p>No articles found.</p>
      )}
    </ul>
  </div>
  )
}

export default App


