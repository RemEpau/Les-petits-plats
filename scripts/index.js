import { recipes } from '../data/recipes.js';
import { filtresDropDown } from './utils/filters.js';
import { RecipeTemplate } from "./models/RecipeTemplate.js";
import { addListItemToCurrentSearch } from './utils/filters.js';

async function displayData(recipesData, searchValue) {
    const recipesDOM = document.getElementById('recipes');
    const noResults = document.getElementById('no-results');

    recipesDOM.innerHTML = '';
    let tabIndex = 4;
    recipesData.forEach(recipe => {
        const recipeModel = new RecipeTemplate(recipe);
        const recipeCard = recipeModel.getRecipeCardDOM(tabIndex);
        tabIndex++;
        recipesDOM.appendChild(recipeCard);
    });
    const totalRecipes = recipesData.length;
    document.getElementById('total-recipes').innerText = `${totalRecipes} recette${totalRecipes > 1 ? "s" : ""}`;

    if (totalRecipes === 0) {
        noResults.classList.replace("hidden", "flex");
        noResults.children[0].innerText = `Aucune recette ne contient "${searchValue.join(' et ')}" vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
    } else {
        noResults.classList.replace("flex", "hidden");
    }
    filtresDropDown(searchValue);
}

function mainSearch(recipes) {
    const searchForm = document.getElementById('main-search');
    const resetForm = document.getElementById('reset-search');

    searchForm.addEventListener("input", (e) => {
        if (e.target.value.length > 0) {
            resetForm.classList.remove("text-transparent");
            resetForm.children[0].innerText = `Réinitialiser la recherche`;
        } else {
            resetForm.classList.add("text-transparent");
        }
    });

    searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const searchValue = e.target.querySelector('input').value;
        const currentSearchDiv = document.getElementById('current-search');

        currentSearchDiv.innerHTML += `
        <div class="flex items-center justify-center gap-8 bg-yellow pl-4 rounded-xl activeFilter sm:text-base text-sm">
            <p class="whitespace-nowrap">${searchValue}</p>
            <button class="p-4">
                <i class="fas fa-times"></i>
            </button>
        </div>`;
        e.target.querySelector('input').value = "";
        resetForm.classList.add("text-transparent");
    });

    resetForm.addEventListener("click", () => {
        resetForm.classList.add("text-transparent");
        displayData(recipes);
    });

    const observer = new MutationObserver(() => {

        const searchValue = Array.from(document.getElementById('current-search').children).map(div => div.querySelector('p').innerText);

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
                    return true;
                }
                return false;
            });
        });
        displayData(filteredRecipes, searchValue);
    });

    observer.observe(document.getElementById('current-search'), { childList: true });

}

async function init() {
    displayData(recipes);
    mainSearch(recipes);
    addListItemToCurrentSearch();
}

init();

