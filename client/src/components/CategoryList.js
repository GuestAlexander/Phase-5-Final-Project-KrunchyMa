import React, { useState, useEffect } from 'react';

function CategoryList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from the API and update the state
  }, []);

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryList;
