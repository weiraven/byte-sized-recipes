import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const About = () => {
  return (
    <div className="App">
      <h2>About BSR</h2>
      <img
        src="/images/foodies_table.jpg"
        alt="Foodies at a table"
        className="about-decorative-image"
      />
      <div className="about-content">
        <p>Welcome to Byte-Sized Recipes, your go-to digital cookbook for culinary inspiration!</p> 
        <p>This app was built with foodies and home cooks in mind—those moments when you're standing in the kitchen, wondering “What should I make today?” or craving something new and unexpected. Our mission is to shake up your meal routine by instantly generating 10 random recipe suggestions that are both fun and delicious.</p> 
        <p>Whether you're adventurous in the kitchen or simply in need of a quick idea, Byte-Sized Recipes offers a diverse selection of recipes sourced from the Spoonacular API. With just one click, you can explore an ever-changing list of dish ideas—from hearty dinners and zesty appetizers to sweet desserts and refreshing drinks. Each recipe comes with essential details to help you decide if it's the one for your next meal. </p>
        <p>Dive into our dashboard, filter by ready time, dish types, or dietary preferences, and let your epi-curiosity spark your culinary creativity! Even if you're short on time or inspiration, our app is designed to bring flavor and variety in the perfect byte.</p>
        <p>Bon Appétit!</p>
      </div>
    </div>
  );
};

export default About;
