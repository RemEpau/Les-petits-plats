import { recipes } from '../data/recipes.js';
import { filtresDropDown } from './utils/filters.js';
import { Recipe } from "./models/Recipe.js";
import { RecipeTemplate } from "./templates/RecipeTemplate.js";

async function getRecipes() {
    return await recipes;
}

async function displayData(recipesData) {
    const recipesDOM = document.getElementById('recipes');
    recipesData.forEach(recipe => {
        const recipeModel = new RecipeTemplate(new Recipe(recipe));
        const recipeCard = recipeModel.getRecipeCardDOM();
        recipesDOM.appendChild(recipeCard);
    });
}

async function init() {
    filtresDropDown();
    const recipes = await getRecipes();
    displayData(recipes);
}

init();

