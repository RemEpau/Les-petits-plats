import { recipes } from '../data/recipes.js';
import { filtresDropDown } from './utils/filters.js';
import { RecipeTemplate } from "./models/RecipeTemplate.js";

async function displayData(recipesData) {
    const recipesDOM = document.getElementById('recipes');
    recipesDOM.innerHTML = '';
    recipesData.forEach(recipe => {
        const recipeModel = new RecipeTemplate(recipe);
        const recipeCard = recipeModel.getRecipeCardDOM();
        recipesDOM.appendChild(recipeCard);
    });
    const totalRecipes = recipesData.length;
    document.getElementById('total-recipes').innerText = `${totalRecipes} recette${totalRecipes > 1 ? "s" : ""}`;
}

function mainSearch(recipes) {
    const searchForm = document.getElementById('main-search');
    const resetForm = document.getElementById('reset-search');

    searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const searchValue = e.target.querySelector('input').value;
        const currentSearchDiv = document.getElementById('current-search');

        currentSearchDiv.innerHTML += `
        <div class="flex items-center justify-center gap-8 bg-yellow pl-4 rounded-xl activeFilter">
            <p>${searchValue}</p>
            <button class="p-4">
                <i class="fas fa-times"></i>
            </button>
        </div>`;
        e.target.querySelector('input').value = "";
    });

    resetForm.addEventListener("click", () => {
        resetForm.classList.add("text-transparent");
        displayData(recipes);
    });

    const observer = new MutationObserver(() => {
        const filteredRecipes = recipes.filter(recipe => {
            const currentSearchDiv = document.getElementById('current-search');
            const currentSearchs = Array.from(currentSearchDiv.children).map(div => div.querySelector('p').innerText.toLowerCase());
            return currentSearchs.every(id => {
                const lowerCaseId = id.toLowerCase();
                if (
                    recipe.name.toLowerCase().includes(lowerCaseId) ||
                    recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(lowerCaseId)) ||
                    recipe.description.toLowerCase().replace(/<[^>]*>?/gm, '').split(' ').includes(lowerCaseId) ||
                    recipe.appliance.toLowerCase().includes(lowerCaseId) ||
                    recipe.utensils.some(utensil => utensil.toLowerCase().includes(lowerCaseId))
                ) {
                    console.log(recipe.name, recipe.ingredients, recipe.description, recipe.appliance, recipe.ustensils);
                    return true;
                }
                return false;
            });
        });
        displayData(filteredRecipes);
    });

    observer.observe(document.getElementById('current-search'), { childList: true });

}

async function init() {
    filtresDropDown();
    displayData(recipes);
    mainSearch(recipes);
}

init();

