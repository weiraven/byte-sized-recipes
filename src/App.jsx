// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import About from './components/About';
import ViewedRecipes from './components/ViewedRecipes';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<RecipeList />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/viewed" element={<ViewedRecipes />} />
      </Routes>
    </Router>
  );
}

export default App;

