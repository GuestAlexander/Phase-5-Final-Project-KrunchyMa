// api.js
export async function fetchArticles(apiKey) {
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.articles;
  }
  