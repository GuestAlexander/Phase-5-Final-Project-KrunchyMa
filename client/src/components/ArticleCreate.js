import React, { useState } from 'react';

function ArticleCreate() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category_id, setCategoryId] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Article</h2>
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
      <button type="submit">Create</button>
    </form>
  );
}

export default ArticleCreate;
