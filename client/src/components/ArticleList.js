import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchArticles } from '../api';

function ArticleList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticlesFromApi = async () => {
      try {
        const data = await fetchArticles('http://localhost:5555/api/articles'); // Replace with your API endpoint URL
        setArticles(data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticlesFromApi();
  }, []);

  return (
    <div>
      <h2>Articles</h2>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <Link to={`/articles/${article.id}`}>{article.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ArticleList;
