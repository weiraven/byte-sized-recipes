# Byte‑Sized Recipes

An interactive dashboard for discovering and filtering recipes at a glance. Built with Vite + React, this app fetches random recipes from the Spoonacular Food API and provides powerful search, filtering, and chart visualizations.

## Overview

Users can:

* Fetch batches of 10 random recipes (up to 30 stored in session during each visit)
* Search across all recipe data fields
* Filter by dish type, prep time, vegan, and gluten‑free options
* View summary statistics: total fetched, average ready time, displayed count, most popular recipe
* Click on any recipe to see a detail view with servings, source link, tags, and ingredients
* Explore interactive charts (dish‑type distribution as a pie chart; score trend as a line chart) in a collapsible sidebar

## Tech Stack & Prerequisites

* **Framework:** Vite + React
* **Routing:** React Router v6
* **Data Fetching:** Axios
* **Charts:** Chart.js + react‑chartjs‑2
* **API Key:** Spoonacular Food API (set `VITE_SPOONACULAR_API_KEY` in `.env`)

## Key Features

* **Random Recipe Fetching**: Get 10 new recipes on demand, with session‑based persistence
* **Global Search & Filters**: Search all recipe properties, filter by dish type, prep time slider, vegan & gluten‑free
* **Summary Stat Cards**: Total fetched, average ready time, displayed count, top‑scored recipe
* **Detail View**: Full recipe information fetched via `/recipes/{id}/information`, including ingredients and tags
* **Collapsible Charts Sidebar**: Pie chart for dish‑type distribution; line chart for Spoonacular score trend

## File Structure

```
src/
├─ components/
│  ├─ RecipeList.jsx       # Dashboard and list view
│  ├─ RecipeDetail.jsx     # Detail view for individual recipes
│  ├─ Navigation.jsx       # Top navbar with links
│  ├─ ViewedRecipes.jsx    # List of recipes viewed this session
│  ├─ DashboardCharts.jsx  # Chart components
│  └─ ChartSidebar.jsx     # Collapsible sidebar for charts
├─ App.jsx                 # Main router and layout
├─ main.jsx                # Vite entry point
├─ App.css                 # Global and component styles
└─ .env                    # Environment variables (not committed)
```

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='https://github.com/weiraven/byte-sized-recipes/blob/main/public/images/bsr-demo2.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

GIF created with [ScreenToGif](https://www.screentogif.com/) for Windows

## License

    Copyright [2025] [Raven Wei]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
