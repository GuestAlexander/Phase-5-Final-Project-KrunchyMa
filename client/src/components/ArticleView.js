import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchArticles } from './api';

function ArticleList({ apiKey }) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticlesFromApi = async () => {
      try {
        const data = await fetchArticles(apiKey);
        setArticles(data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticlesFromApi();
  }, [apiKey]);

  return (
    <div>
      <h2>Articles</h2>
      <ul>
        {articles.map((article) => (
          <li key={article.url}>
            <Link to={`/articles/${encodeURIComponent(article.url)}`}>{article.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ArticleList;
