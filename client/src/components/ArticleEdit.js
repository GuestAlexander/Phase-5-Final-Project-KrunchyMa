import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

function ArticleEdit() {
  const { id } = useParams();
  const history = useHistory();
  const [article, setArticle] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category_id, setCategoryId] = useState('');

  useEffect(() => {
    // Fetch the article with the specified ID from the API and update the state
  }, [id]);

  useEffect(() => {
    if (article) {
      setTitle(article.title);
      setContent(article.content);
      setCategoryId(article.category_id);
    }
  }, [article]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here, then navigate to the updated article
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Article</h2>
      <label>
        Title:
        <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
      </label>
      <label>
        Content:
        <textarea value={content} onChange={(event) => setContent(event.target.value)} />
      </label>
      <label>
        Category:
        <input type="text" value={category_id} onChange={(event) => setCategoryId(event.target.value)} />
      </label>
      <button type="submit">Save</button>
    </form>
  );
}

export default ArticleEdit;
