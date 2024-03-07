import { recipes } from '../data/recipes.js';
import { filtresDropDown } from './utils/app.filters.js';
import { RecipeTemplate } from "./models/app.class.RecipeTemplate.js";
import { addListItemToCurrentSearch } from './utils/app.filters.js';

async function displayData(recipesData, searchValue) {
    const noResults = document.getElementById('no-results');

    document.getElementById('recipes').innerHTML = '';
    let tabIndex = 4;
    recipesData.forEach(recipe => {
        tabIndex++;
        document.getElementById('recipes').appendChild(new RecipeTemplate(recipe).getRecipeCardDOM(tabIndex));
    });
    document.getElementById('total-recipes').innerText = `${recipesData.length} recette${recipesData.length > 1 ? "s" : ""}`;

    if (recipesData.length === 0) {
        noResults.classList.replace("hidden", "flex");
        noResults.children[0].innerText = `Aucune recette ne contient "${searchValue.join('" et "')}", vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
    } else {
        noResults.classList.replace("flex", "hidden");
    }
    filtresDropDown(searchValue);
}

// Fonction qui filtres les recettes en fonction de la recherche principale
function mainSearch(recipes) {
    document.getElementById('main-search').addEventListener("input", (e) => {
        if (e.target.value.length > 0) {
            document.getElementById('reset-search').classList.remove("text-transparent");
        } else {
            document.getElementById('reset-search').classList.add("text-transparent");
        }

        if (e.target.value.length > 3) {
            const searchValue = e.target.value.split(" ");
            const filteredRecipes = recipes.filter(recipe => {
                return searchValue.every(id => {
                    return (
                        recipe.name.toLowerCase().includes(id.toLowerCase()) ||
                        recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(id.toLowerCase())) ||
                        recipe.description.toLowerCase().includes(id.toLowerCase()) ||
                        recipe.appliance.toLowerCase().includes(id.toLowerCase()) ||
                        recipe.utensils.some(utensil => utensil.toLowerCase().includes(id.toLowerCase()))
                    );
                });
            });
            displayData(filteredRecipes, searchValue);
        } else {
            displayData(recipes);
        }
    });

    document.getElementById('main-search').addEventListener("submit", (e) => {
        e.preventDefault();
    });

    document.getElementById('reset-search').addEventListener("click", () => {
        document.getElementById('reset-search').classList.add("text-transparent");
        displayData(recipes);
    });

    // Observer pour observer les changements dans ".current-search"
    const observer = new MutationObserver(() => {

        const searchValue = Array.from(document.getElementById('current-search').children).map(div => div.querySelector('p').innerText);

        const filteredRecipes = recipes.filter(recipe => {
            const currentSearchDiv = document.getElementById('current-search');
            const currentSearchs = Array.from(currentSearchDiv.children).map(div => div.querySelector('p').innerText.toLowerCase());
            return currentSearchs.every(id => {
                const lowerCaseId = id.toLowerCase();
                return (
                    recipe.name.toLowerCase().includes(lowerCaseId) ||
                    recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(lowerCaseId)) ||
                    recipe.description.toLowerCase().includes(lowerCaseId) ||
                    recipe.appliance.toLowerCase().includes(lowerCaseId) ||
                    recipe.utensils.some(utensil => utensil.toLowerCase().includes(lowerCaseId))
                );
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

