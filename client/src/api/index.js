// src/api/index.js

const API_BASE_URL = "http://127.0.0.1:5555/api"; 

export const fetchArticles = async () => {
  const response = await fetch(`${API_BASE_URL}/articles`);
  return response.json();
};

export const fetchArticleById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/articles/${id}`);
  return response.json();
};

