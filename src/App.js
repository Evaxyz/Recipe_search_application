import React, { useEffect, useState } from 'react';
import Recipe from "./Recipe";
import "./App.css";

const App = () => {

  const APP_ID = 'dec73c0c';
  const APP_KEY = "4a5728d5a45429962e5ed6a80e254733";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');



  useEffect(() => {
    getRecipes();

  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);

  };

  const updateSearch = e => {
    setSearch(e.target.value);
    // console.log(search);

  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch} />
        <button className="search-button" type="submit">
          search
        </button>
      </form>
      <div className="recipes">
        {recipes.map(recipe => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />

        ))}
      </div>

    </div>

  );
}

export default App;