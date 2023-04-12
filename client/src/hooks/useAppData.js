import { useState, useEffect } from 'react';

const useAppData = () => {
  const [user, setUser] = useState(null);
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);

  // Fetch articles
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => setArticles(data))
      .catch(error => console.error(error));
  }, []);

  // Fetch categories
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error(error));
  }, []);

  // Handle user authentication
  const authenticateUser = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return {
    user,
    authenticateUser,
    logout,
    articles,
    setArticles,
    categories,
    setCategories
  };
};

export default useAppData;
