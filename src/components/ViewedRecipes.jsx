// src/components/ViewedRecipes.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

function ViewedRecipes() {
  const [viewedRecipes, setViewedRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = sessionStorage.getItem('viewedRecipes');
    if (stored) {
      setViewedRecipes(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="App">
        <section className="recipe-list">
            <h2>Viewed Recipes</h2>
            {viewedRecipes.length === 0 ? (
                <p>No recipes viewed yet.</p>
            ) : (
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
                    {viewedRecipes.map(recipe => (
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
            )}
        </section>
      <Link to="/" className="return-link">Back to Dashboard</Link>
    </div>
  );
}

export default ViewedRecipes;
