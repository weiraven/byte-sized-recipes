import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;

function App() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRecipeType, setFilterRecipeType] = useState('all');
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [maxReadyTime, setMaxReadyTime] = useState(90);
  const [veganFilter, setVeganFilter] = useState(false);
  const [glutenFreeFilter, setGlutenFreeFilter] = useState(false);


  const fetchData = async () => {
    try {
      const response = await axios.get('https://api.spoonacular.com/recipes/random', {
        params: {
          number: 10,
          apiKey: apiKey,
        }
      });
      setRecipes(response.data.recipes);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Update filtered recipes based on search and filter
  useEffect(() => {
    let filtered = recipes;

    // Filter by search term (entire recipe object)
    if (searchTerm) {
      filtered = filtered.filter(recipe =>
        JSON.stringify(recipe).toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by dish type (if applicable)
    if (filterRecipeType !== 'all') {
      filtered = filtered.filter(recipe =>
        recipe.dishTypes && recipe.dishTypes.includes(filterRecipeType)
      );
    }

    // Filter by readyInMinutes using the slider value
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
  

  // Compute summary statistics
  const totalRecipes = recipes.length;
  const totalReadyTime = recipes.reduce((acc, recipe) => acc + recipe.readyInMinutes, 0);
  const avgReadyTime = totalRecipes > 0 ? (totalReadyTime / totalRecipes).toFixed(2) : 0;
  const filteredCount = filteredRecipes.length;
  const mostPopularRecipe = filteredRecipes.length > 0 
    ? filteredRecipes.reduce((max, recipe) =>
        recipe.spoonacularScore > max.spoonacularScore ? recipe : max,
        filteredRecipes[0]
      )
    : null;

  return (
<div className="App">
      <header>
        <h1>Byte-Sized Recipes</h1>
      </header>

      {/* Summary Statistics Section */}
      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Recipes</h3>
          <p>{totalRecipes}</p>
        </div>
        <div className="stat-card">
          <h3>Average Ready Time</h3>
          <p>{avgReadyTime} minutes</p>
        </div>
        <div className="stat-card">
          <h3>Filtered ByteS</h3>
          <p>{filteredCount}</p>
        </div>
        <div className="stat-card">
          <h3>Most Popular</h3>
          <p>{mostPopularRecipe ? mostPopularRecipe.title : "N/A"}</p>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <section className="controls">

      <div className="controls-row">
          <button onClick={fetchData}>Find me 10 new ByteS!</button>
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
        <h2>Recipes</h2>
        <table>
          <thead>
            <tr>
              <th>Recipe</th>
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
                onClick={() => window.open(recipe.sourceUrl, '_blank')}
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
  )
}

export default App;
