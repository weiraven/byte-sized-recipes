import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the detailed recipe information using the specified endpoint.
    const fetchDetail = async () => {
      try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
          params: {
            includeNutrition: false,
            apiKey: apiKey,
          },
        });
        setRecipe(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recipe details:', error);
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  useEffect(() => {
    if (recipe) {
        const viewed = sessionStorage.getItem('viewedRecipes');
        let viewedRecipes = viewed ? JSON.parse(viewed) : [];
        // Check if the recipe is already stored (by comparing the id)
        if (!viewedRecipes.find(r => r.id === recipe.id)) {
        viewedRecipes.push(recipe);
        sessionStorage.setItem('viewedRecipes', JSON.stringify(viewedRecipes));
        }
    }
    }, [recipe]);

  if (loading) {
    return (
      <div className="App">
        <p>Loading...</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="App">
        <p>Recipe not found.</p>
        <Link to="/" className="return-link">Back to Dashboard</Link>
      </div>
    );
  }

  return (
    <div className="App">

      <section className="recipe-detail">
        <h1>{recipe.title}</h1>
        <img
          src={recipe.image}
          alt={recipe.title}
          style={{
            width: '600px',
            height: 'auto',
            objectFit: 'cover',
            borderRadius: '8px',
            marginBottom: '1rem'
          }}
        />

        <p><strong>Servings:</strong> {recipe.servings}</p>
        
        <p>
          <strong>Recipe Source:</strong>{" "}
          <a href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer">
            {recipe.sourceName}
          </a>
        </p>

        <div style={{ marginTop: '1rem' }}>
          <strong>Suitable for:</strong>
          <div className="dish-types">
            {recipe.dishTypes && recipe.dishTypes.map((type, index) => (
              <span key={index} className="dish-type-tag">{type}</span>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '1rem' }}>
            <strong>Ingredients:</strong>
            <ul className="ingredients-list">
                {recipe.extendedIngredients && recipe.extendedIngredients.map((ing, index) => (
                <li key={index}>{ing.original}</li>
                ))}
            </ul>
        </div>
      </section>

      <Link to="/" className="return-link">Back to Dashboard</Link>
    </div>
  );
}

export default RecipeDetail;
