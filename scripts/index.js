import { recipes } from '../data/recipes.js';
import { filtresDropDown } from './utils/filters.js';
import { Recipe } from "./models/Recipe.js";
import { RecipeTemplate } from "./templates/RecipeTemplate.js";

async function getRecipes() {
    return recipes;
}

async function displayData(recipesData) {
    const recipesDOM = document.getElementById('recipes');
    recipesDOM.innerHTML = '';
    recipesData.forEach(recipe => {
        const recipeModel = new RecipeTemplate(new Recipe(recipe));
        const recipeCard = recipeModel.getRecipeCardDOM();
        recipesDOM.appendChild(recipeCard);
    });
    const totalRecipes = recipesData.length;
    document.getElementById('total-recipes').innerText = totalRecipes + " recettes";
}

function search(recipes) {
    const searchForm = document.getElementById('main-search');
    const resetForm = document.getElementById('reset-search');
    const inputForm = searchForm.querySelector('input');

    searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const searchValue = e.target.querySelector('input').value;
        const filteredRecipes = recipes.filter(recipe => {
            const nameMatch = recipe.name.toLowerCase().includes(searchValue.toLowerCase());
            const ingredientMatch = recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(searchValue.toLowerCase()));
            const descriptionMatch = recipe.description.toLowerCase().split(' ').some(word => word === searchValue.toLowerCase());
            return nameMatch || ingredientMatch || descriptionMatch;
        });
        console.log(filteredRecipes);
        displayData(filteredRecipes);
    });

    inputForm.addEventListener("input", () => {
        if (inputForm.value) {
            resetForm.classList.remove("text-transparent");
        } else {
            resetForm.classList.add("text-transparent");
            displayData(recipes);
        }
    });

    resetForm.addEventListener("click", () => {
        resetForm.classList.add("text-transparent");
        displayData(recipes);
    });
}

async function init() {
    const recipes = await getRecipes();
    filtresDropDown();
    displayData(recipes);
    search(recipes);
}

init();

