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
            return recipe.name.toLowerCase().includes(searchValue.toLowerCase());
        });
        displayData(filteredRecipes);
    });

    inputForm.addEventListener("input", () => {
        if (inputForm.value) {
            resetForm.classList.remove("invisible");
        } else {
            resetForm.classList.add("invisible");
        }
    });

    resetForm.addEventListener("click", () => {
        resetForm.classList.add("invisible");
        displayData(recipes);
    });
}

async function init() {
    filtresDropDown();
    const recipes = await getRecipes();
    displayData(recipes);
    search(recipes);
}

init();

