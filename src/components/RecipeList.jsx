import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;

function RecipeList() {
  // Use 'recipes' state to store the recipes to display (capped at 30)
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRecipeType, setFilterRecipeType] = useState('all');
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [maxReadyTime, setMaxReadyTime] = useState(90);
  const [veganFilter, setVeganFilter] = useState(false);
  const [glutenFreeFilter, setGlutenFreeFilter] = useState(false);

  const navigate = useNavigate();

  // Helper function that takes the cumulative recipes and returns the 30 most recent
  const capDisplayedRecipes = (allRecipes) => {
    if (allRecipes.length > 30) {
      return allRecipes.slice(allRecipes.length - 30);
    }
    return allRecipes;
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('https://api.spoonacular.com/recipes/random', {
        params: {
          number: 10,
          apiKey: apiKey,
        }
      });
      
      // Newly fetched recipes (an array of 10 recipes)
      const newRecipes = response.data.recipes;
      
      // Retrieve the cumulative recipes array from sessionStorage (if present)
      const storedRecipes = sessionStorage.getItem('recipes');
      let allRecipes = storedRecipes ? JSON.parse(storedRecipes) : [];
      
      // Append new recipes to the cumulative array
      allRecipes = allRecipes.concat(newRecipes);
      
      // Update sessionStorage with the full cumulative array
      sessionStorage.setItem('recipes', JSON.stringify(allRecipes));
      
      // Determine the displayed recipes – only the last 30 should be shown (if there are more than 30)
      const displayedRecipes = capDisplayedRecipes(allRecipes);
      
      // Update the state so that these displayed recipes appear on the page.
      setRecipes(displayedRecipes);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  // On initial load, check sessionStorage first. Use stored recipes if available, otherwise fetch new ones.
  useEffect(() => {
    const storedRecipes = sessionStorage.getItem('recipes');
    if (storedRecipes) {
      let allRecipes = JSON.parse(storedRecipes);
      const displayedRecipes = capDisplayedRecipes(allRecipes);
      setRecipes(displayedRecipes);
    } else {
      fetchData();
    }
  }, []);

  // Update filtered recipes whenever dependencies change
  useEffect(() => {
    let filtered = recipes;
  
    // Filter by search term (search in the entire recipe object)
    if (searchTerm) {
      filtered = filtered.filter(recipe =>
        JSON.stringify(recipe).toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  
    // Filter by dish type if the user selected one
    if (filterRecipeType !== 'all') {
      filtered = filtered.filter(recipe =>
        recipe.dishTypes && recipe.dishTypes.includes(filterRecipeType)
      );
    }
  
    // Filter by readyInMinutes using the slider
    filtered = filtered.filter(recipe => recipe.readyInMinutes <= maxReadyTime);
  
    // Apply Vegan filter if enabled
    if (veganFilter) {
      filtered = filtered.filter(recipe => recipe.vegan);
    }
  
    // Apply Gluten Free filter if enabled
    if (glutenFreeFilter) {
      filtered = filtered.filter(recipe => recipe.glutenFree);
    }
  
    setFilteredRecipes(filtered);
  }, [recipes, searchTerm, filterRecipeType, maxReadyTime, veganFilter, glutenFreeFilter]);
  
  // Compute some summary statistics (as before)
  const totalRecipes = sessionStorage.getItem('recipes')
    ? JSON.parse(sessionStorage.getItem('recipes')).length
    : recipes.length;
  const totalReadyTime = recipes.reduce((acc, recipe) => acc + recipe.readyInMinutes, 0);
  const avgReadyTime = recipes.length > 0 ? (totalReadyTime / recipes.length).toFixed(2) : 0;
  const displayedCount = recipes.length;
  const mostPopularRecipe = recipes.length > 0 
    ? recipes.reduce((max, recipe) =>
        recipe.spoonacularScore > max.spoonacularScore ? recipe : max,
        recipes[0]
      )
    : null;
  
  return (
    <div className="App">
  
      {/* Summary Stats (sidebar) */}
      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Recipes (Cumulative)</h3>
          <p>{totalRecipes}</p>
        </div>
        <div className="stat-card">
          <h3>Average Ready Time</h3>
          <p>{avgReadyTime} minutes</p>
        </div>
        <div className="stat-card">
          <h3>Displayed ByteS</h3>
          <p>{displayedCount}</p>
        </div>
        <div className="stat-card">
          <h3>Most Popular</h3>
          <p>{mostPopularRecipe ? mostPopularRecipe.title : "N/A"}</p>
        </div>
      </div>
  
      {/* Controls Section */}
      <section className="controls">
        <div className="controls-row">
          <button onClick={fetchData}>Find me 10 more ByteS!</button>
          <input
            type="text"
            placeholder="Search in current ByteS..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={filterRecipeType}
            onChange={(e) => setFilterRecipeType(e.target.value)}
          >
            <option value="all">All ByteS Types</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="appetizer">Appetizer</option>
            <option value="main course">Entree</option>
            <option value="side dish">Side</option>
            <option value="dessert">Dessert</option>
            <option value="salad">Salad</option>
            <option value="snack">Snack</option>
            <option value="beverage">Drink</option>
          </select>
        </div>
  
        <div className="controls-row">
          <div style={{ margin: '1rem' }}>
            <span>Ready in</span>
            <input
              type="range"
              min="10"
              max="90"
              value={maxReadyTime}
              onChange={(e) => setMaxReadyTime(Number(e.target.value))}
              style={{ margin: '0 0.5rem' }}
            />
            <span>{maxReadyTime} minutes</span>
          </div>
  
          <label style={{ marginLeft: '1rem' }}>
            Vegan 
            <input
              type="checkbox"
              checked={veganFilter}
              onChange={(e) => setVeganFilter(e.target.checked)}
              style={{ transform: 'scale(1.5)', marginLeft: '0.75rem' }}
            />
          </label>
          <label style={{ marginLeft: '1rem' }}>
            Gluten Free
            <input
              type="checkbox"
              checked={glutenFreeFilter}
              onChange={(e) => setGlutenFreeFilter(e.target.checked)}
              style={{ transform: 'scale(1.5)', marginLeft: '0.75rem' }}
            />
          </label>
        </div>
      </section>
  
      {/* Recipes List */}
      <section className="recipe-list">
      <h2>{ totalRecipes >= 31 ? "Recipes (Last 30)" : "Recipes" }</h2>
        <table>
          <thead>
            <tr>
              <th>Byte</th>
              <th>Title</th>
              <th style={{ textAlign: 'center' }}>Ready In Minutes</th>
              <th style={{ textAlign: 'center' }}>Vegan</th>
              <th style={{ textAlign: 'center' }}>Gluten Free</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecipes.map(recipe => (
              <tr
                key={recipe.id}
                onClick={() => navigate(`/recipe/${recipe.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <td style={{ padding: '0', width: '120px', height: '120px' }}>
                  <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        transform: 'scale(1.2)',
                      }}
                    />
                  </div>
                </td>
                <td>{recipe.title}</td>
                <td style={{ textAlign: 'center' }}>{recipe.readyInMinutes}</td>
                <td style={{ textAlign: 'center' }}>{recipe.vegan ? '✔️' : '❌'}</td>
                <td style={{ textAlign: 'center' }}>{recipe.glutenFree ? '✔️' : '❌'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default RecipeList;