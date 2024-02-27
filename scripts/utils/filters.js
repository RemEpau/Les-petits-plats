import { recipes } from '../../data/recipes.js';
import { normalizedFilterName } from './normalized.js';

const filtres = [
  "Ingrédients",
  "Appareils",
  "Ustensiles"
];
let dropDownCreated = false;

export function filtresDropDown(currentSearch) {
  document.getElementById('filtres').innerHTML = '';
  filtres.forEach((filter, i) => {
    document.getElementById('filtres').innerHTML += `
        <div div class="w-52 font-medium z-10 relative" id="${normalizedFilterName(filtres[i])}">
          <div class="bg-white w-full p-4 flex items-center justify-between rounded-xl cursor-pointer btn-dropdown relative">
            ${filtres[i]}
            <i class="fa-solid fa-chevron-down"></i>
          </div>
          <ul class="bg-white overflow-y-auto max-h-52 hidden rounded-b-xl absolute">
            <form class="m-2 flex items-center border filters-form">
              <input type="text" class="p-2 w-full">
              <button type="submit">
                <svg width="20" height="20" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"
                  class="m-2">
                  <g id="search">
                    <circle id="Ellipse" cx="10" cy="10.4219" r="9.5" stroke="black"
                      class="group-hover:stroke-black transition" />
                    <line id="Line 2" x1="18.3536" y1="19.0683" x2="27.3536" y2="28.0683" stroke="black"
                      class="group-hover:stroke-black transition" />
                  </g>
                </svg>
              </button>
            </form>
            ${listItems(filtres[i], currentSearch)}
          </ul>
        </div>
        `
  });

  /*
  * Fonction qui retourne une liste d'items en fonction du nom du filtre
  * 1. On mappe les items en fonction du filtre, on les met en minuscule
  * 2. On les fait passer dans un Set pour ne pas avoir de doublons
  * 3. On les remet dans un tableau avec Array.from
  * 4. On flat le tableau pour avoir un seul tableau
  * 5. On les range par ordre alphabétique, incluant les accents
  * 6. On prend chaqu'un des items que l'on met dans une balise <li>
  * 7. On les met dans un string
  */
  function listItems(filtreName, currentSearch = [""]) {
    if (currentSearch.length === 0) {
      return Array.from(new Set(recipes.map(recipe => {
        switch (filtreName) {
          case "Ingrédients":
            return recipe.ingredients
              .map(ingredient => ingredient.ingredient.toLowerCase());
          case "Appareils":
            return [recipe.appliance.toLowerCase()];
          case "Ustensiles":
            return recipe.utensils
              .map(ustensil => ustensil.toLowerCase());
        }
      }).flat()))
        .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
        .map(item => {
          return `
            <li class="p-2 hover:bg-yellow cursor-pointer capitalize">${item}</li>
          `;
        }).join('');
    } else {
      return Array.from(new Set(recipes.filter(recipe => {
        return currentSearch.every(id => {
          const lowerCaseId = id.toLowerCase();
          if (
            recipe.name.toLowerCase().includes(lowerCaseId) ||
            recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(lowerCaseId)) ||
            recipe.description.toLowerCase().replace(/<[^>]*>?/gm, '').split(' ').includes(lowerCaseId)
          ) {
            return true;
          }
          return false;
        });
      }).map(recipe => {
        switch (filtreName) {
          case "Ingrédients":
            return recipe.ingredients
              .map(ingredient => ingredient.ingredient.toLowerCase());
          case "Appareils":
            return [recipe.appliance.toLowerCase()];
          case "Ustensiles":
            return recipe.utensils
              .map(ustensil => ustensil.toLowerCase());
        }
      }).flat()))
        .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
        .map(item => {
          return `
                <li class="p-2 hover:bg-yellow cursor-pointer capitalize">${item}</li>
              `;
        }).join('');
    }
  }


  // Fonction qui permet d'ouvrir ou de fermer le dropdown
  if (dropDownCreated === false) {
    document.addEventListener('click', (event) => {
      const button = event.target.closest('.btn-dropdown');
      if (button) {
        button.nextElementSibling.classList.toggle('hidden');
        button.classList.toggle('rounded-xl');
        button.classList.toggle('rounded-t-xl');
      }
    });
    dropDownCreated = true;
  }

  // On empêche la soumission des formulaires de filtres
  const filtersForm = document.querySelectorAll('.filters-form');
  filtersForm.forEach(form => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
    });
  });

  // Il y as une barre de recherche dans chaque dropdowns de filtres qui permet de filtrer les items de la liste en fonction de la recherche
  const filtersInput = document.querySelectorAll('.filters-form input');
  filtersInput.forEach(input => {
    input.addEventListener('input', (event) => {
      const filterName = event.target.closest('.relative').id;
      const currentSearchDiv = document.getElementById('current-search');
      const currentSearchs = Array.from(currentSearchDiv.children).map(div => div.querySelector('p').innerText.toLowerCase());
      const searchValue = event.target.value.toLowerCase();
      const listItems = document.querySelectorAll(`#${filterName} ul li`);
      listItems.forEach(item => {
        const itemValue = item.innerText.toLowerCase();
        if (searchValue === '') {
          item.classList.remove('hidden');
        } else if (itemValue.includes(searchValue) && !currentSearchs.includes(itemValue)) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });


  // On ajoute un event listener sur chaque button dans les divs de current-search pour les supprimer
  const currentSearchDiv = document.getElementById('current-search');
  currentSearchDiv.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (button) {
      button.parentElement.remove();
    }
  });
}

export function listItemSearch() {
  const currentSearchDiv = document.getElementById('current-search');
  document.addEventListener('click', (event) => {
    const item = event.target.closest('li');
    if (item) {
      currentSearchDiv.innerHTML += `
        <div class="flex items-center justify-center gap-8 bg-yellow pl-4 rounded-xl activeFilter">
          <p>${item.innerText}</p>
          <button class="p-4">
            <i class="fas fa-times"></i>
          </button>
        </div>`;
    }
  });
}