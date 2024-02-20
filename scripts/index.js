import { recipes } from '../data/recipes.js';
import { filtresDropDown } from './utils/filters.js';
import { Recipe } from "./models/Recipe.js";
import { RecipeTemplate } from "./templates/RecipeTemplate.js";

async function getRecipes() {
    return recipes;
}

async function displayData(recipesData) {
    const recipesDOM = document.getElementById('recipes');
    recipesData.forEach(recipe => {
        const recipeModel = new RecipeTemplate(new Recipe(recipe));
        const recipeCard = recipeModel.getRecipeCardDOM();
        recipesDOM.appendChild(recipeCard);
    });
    const totalRecipes = recipesData.length;
    document.getElementById('total-recipes').innerText = totalRecipes + " recettes";
}

async function init() {
    filtresDropDown();
    const recipes = await getRecipes();
    displayData(recipes);

    document.getElementById('main-search').addEventListener('submit', function (e) {
        e.preventDefault();
    });
}

init();

