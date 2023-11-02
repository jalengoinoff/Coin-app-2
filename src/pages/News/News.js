import React, { useState, useEffect } from 'react';
import styles from "./News.module.css";

const News = () => {
  const [news, setNews] = useState([]);
  const [Apiquery, setApiquery] = useState('');

  useEffect(() => {
    const apiKey = '3/9xM4/uXG1A1dK5Cce39EO0eSbFKJAxEqasf8W7B5s=';
    const apiUrl = 
       `https://openapiv1.coinstats.app/news/search?query=${Apiquery}`
  

    fetch(apiUrl, {
      headers: {
        'X-API-KEY': apiKey,
        'accept': 'application/json'
      }
    })
    .then(response => response.json())
    .then(result => {
      if (result && result.data) {
        setNews(result.data);
      } else {
        console.error('Invalid data structure:');
      }
    })
    .catch(error => console.error('Error fetching news:', error));
  }, [Apiquery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (Apiquery.trim() !== '') {
      setApiquery(e.target.value);
    }
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">News</h1>
      <div className="mb-3 d-flex">
        <input
          type="text"
          className="form-control"
          placeholder="Search news..."
          value= {Apiquery}
          onChange={e => setApiquery(e.target.value)}
        />
        <button className="btn btn-primary mx-2" onClick={handleSearch}>Search</button>
      </div>
      <div className="row">
        {news && news.length > 0 ? (
          news.map((item) => (
            <div key={item.id} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h2 className="card-title">{item.title}</h2>
                  <p className="card-text">{item.description}</p>
                  <p className="card-text">{item.source}</p>
                  <p className="card-text">{item.createdAt}</p>
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Read more</a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col text-center">No news available</div>
        )}
      </div>
    </div>
  );
};

export default News;









