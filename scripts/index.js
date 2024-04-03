import { recipes } from '../data/recipes.js';
import { filtresDropDown } from './utils/app.filters.js';
import { RecipeTemplate } from "./models/app.class.RecipeTemplate.js";
import { addListItemToCurrentSearch } from './utils/app.filters.js';

async function displayData(recipesData, searchValue) {
    const noResults = document.getElementById('no-results');

    document.getElementById('recipes').innerHTML = '';
    let tabIndex = 4;

    for (let i = 0; i < recipesData.length; i++) {
        let recipe = recipesData[i];
        tabIndex++;
        document.getElementById('recipes').appendChild(new RecipeTemplate(recipe).getRecipeCardDOM(tabIndex));
    }

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
            const filteredRecipes = [];
            for (let i = 0; i < recipes.length; i++) {
                const recipe = recipes[i];
                let match = true;
                for (let j = 0; j < searchValue.length; j++) {
                    const id = searchValue[j];
                    if (!(recipe.name.toLowerCase().includes(id.toLowerCase()) ||
                        recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(id.toLowerCase())) ||
                        recipe.description.toLowerCase().includes(id.toLowerCase()) ||
                        recipe.appliance.toLowerCase().includes(id.toLowerCase()) ||
                        recipe.utensils.some(utensil => utensil.toLowerCase().includes(id.toLowerCase())))) {
                        match = false;
                        break;
                    }
                }
                if (match) {
                    filteredRecipes.push(recipe);
                }
            }

            const currentSearchDiv = document.getElementById('current-search');
            if (currentSearchDiv.children.length > 0) {
                const additionalSearchValue = [];
                const children = [];
                const additionalFilteredRecipes = [];
                const currentSearchDiv = document.getElementById('current-search');
                for (let i = 0; i < currentSearchDiv.children.length; i++) {
                    children.push(currentSearchDiv.children[i]);
                }
                for (let i = 0; i < children.length; i++) {
                    const div = children[i];
                    additionalSearchValue.push(div.querySelector('p').innerText.toLowerCase());
                }
                for (let i = 0; i < filteredRecipes.length; i++) {
                    const recipe = filteredRecipes[i];
                    let match = true;
                    for (let j = 0; j < additionalSearchValue.length; j++) {
                        const id = additionalSearchValue[j];
                        if (!(recipe.name.toLowerCase().includes(id) ||
                            recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(id)) ||
                            recipe.description.toLowerCase().includes(id) ||
                            recipe.appliance.toLowerCase().includes(id) ||
                            recipe.utensils.some(utensil => utensil.toLowerCase().includes(id)))) {
                            match = false;
                            break;
                        }
                    }
                    if (match) {
                        additionalFilteredRecipes.push(recipe);
                    }
                }
                displayData(additionalFilteredRecipes, [...searchValue, ...additionalSearchValue]);
            } else {
                displayData(filteredRecipes, searchValue);
            }
        } else {
            const currentSearchDiv = document.getElementById('current-search');
            if (currentSearchDiv.children.length > 0) {
                const additionalSearchValue = [];
                const children = [];
                const additionalFilteredRecipes = [];
                const currentSearchDiv = document.getElementById('current-search');
                for (let i = 0; i < currentSearchDiv.children.length; i++) {
                    children.push(currentSearchDiv.children[i]);
                }
                for (let i = 0; i < children.length; i++) {
                    const div = children[i];
                    additionalSearchValue.push(div.querySelector('p').innerText.toLowerCase());
                }
                for (let i = 0; i < recipes.length; i++) {
                    const recipe = recipes[i];
                    let match = true;
                    for (let j = 0; j < additionalSearchValue.length; j++) {
                        const id = additionalSearchValue[j];
                        if (!(recipe.name.toLowerCase().includes(id) ||
                            recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(id)) ||
                            recipe.description.toLowerCase().includes(id) ||
                            recipe.appliance.toLowerCase().includes(id) ||
                            recipe.utensils.some(utensil => utensil.toLowerCase().includes(id)))) {
                            match = false;
                            break;
                        }
                    }
                    if (match) {
                        additionalFilteredRecipes.push(recipe);
                    }
                }
                displayData(additionalFilteredRecipes, additionalSearchValue);
            } else {
                displayData(recipes);
            }
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
        let searchValue = [];
        let children = [];
        let filteredRecipes = [];
        const currentSearchDiv = document.getElementById('current-search');
        for (let i = 0; i < currentSearchDiv.children.length; i++) {
            children.push(currentSearchDiv.children[i]);
        }
        for (let i = 0; i < children.length; i++) {
            let div = children[i];
            searchValue.push(div.querySelector('p').innerText);
        }
        for (let i = 0; i < recipes.length; i++) {
            let recipe = recipes[i];
            let match = true;
            for (let j = 0; j < searchValue.length; j++) {
                let id = searchValue[j];
                if (!(recipe.name.toLowerCase().includes(id.toLowerCase()) ||
                    recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(id.toLowerCase())) ||
                    recipe.description.toLowerCase().includes(id.toLowerCase()) ||
                    recipe.appliance.toLowerCase().includes(id.toLowerCase()) ||
                    recipe.utensils.some(utensil => utensil.toLowerCase().includes(id.toLowerCase())))) {
                    match = false;
                    break;
                }
            }
            if (match) {
                filteredRecipes.push(recipe);
            }
        }
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