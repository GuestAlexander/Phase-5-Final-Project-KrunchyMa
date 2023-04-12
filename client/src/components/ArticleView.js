import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ArticleView() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    // Fetch the article with the specified ID from the API and update the state
  }, [id]);

  return (
    <div>
      {article ? (
        <div>
          <h2>{article.title}</h2>
          <p>{article.content}</p>
          {/* Add edit and delete buttons */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ArticleView;
