// src/components/DashboardCharts.jsx
import React from 'react';
import { Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement);

const DashboardCharts = ({ recipes }) => {
  // Dish Type Distribution Data (for a Pie Chart)
  const dishTypeCounts = {};
  recipes.forEach(recipe => {
    if (recipe.dishTypes && recipe.dishTypes.length) {
      recipe.dishTypes.forEach(type => {
        dishTypeCounts[type] = (dishTypeCounts[type] || 0) + 1;
      });
    }
  });
  
  const dishTypeChartData = {
    labels: Object.keys(dishTypeCounts),
    datasets: [
      {
        label: 'Number of Recipes',
        data: Object.values(dishTypeCounts),
        backgroundColor: [
          '#4CAF50',
          '#2196F3',
          '#FF9800',
          '#9C27B0',
          '#E91E63',
          '#3F51B5',
          '#00BCD4',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Spoonacular Score Trend Data (for a Line Chart)
  const scoreLabels = recipes.map(recipe => recipe.title);
  const scoreData = recipes.map(recipe => recipe.spoonacularScore);

  const scoreChartData = {
    labels: scoreLabels,
    datasets: [
      {
        label: 'Spoonacular Score',
        data: scoreData,
        fill: false,
        borderColor: '#a8e093',
        tension: 0.1,
      },
    ],
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <div 
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          gap: '1rem'
        }}
      >
        <div className="chart-container" style={{ width: '90%', maxWidth: '600px', height: '400px' }}>
          <h3>Dish Type Distribution</h3>
          <Pie 
            data={dishTypeChartData} 
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top',
                },
              },
            }} 
          />
        </div>
        <div className="chart-container" style={{ width: '90%', maxWidth: '600px', height: '400px' }}>
          <h3>Spoonacular Score Trend</h3>
          <Line 
            data={scoreChartData} 
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: { 
                legend: { position: 'top' }
              },
              scales: {
                x: {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 5,
                  },
                },
              },
            }} 
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
