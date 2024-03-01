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
        <div div class="sm:w-52 w-32 flex-1 mb-5 font-medium z-10 relative" id="${normalizedFilterName(filtres[i])}" tabindex="3"> 
          <div class="bg-white w-full sm:text-base text-sm p-4 flex items-center justify-between rounded-xl cursor-pointer btn-dropdown relative">
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
  * 8. On retourne le string
  * Au sinon, on fait la même chose, mais on filtre les items en fonction de la valeur de l'input
  * Si la valeur de l'input est vide, on retourne tous les items
  */
  function listItems(filtreName, currentSearch = []) {
    console.log('currentSearch:', currentSearch);
    if (currentSearch.length === 0) {
      return Array.from(new Set(recipes.map(recipe => {
        let items;
        switch (filtreName) {
          case "Ingrédients":
            items = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase());
            break;
          case "Appareils":
            console.log('Appliance:', recipe.appliance);
            items = [recipe.appliance.toLowerCase()];
            break;
          case "Ustensiles":
            console.log('Utensils:', recipe.utensils);
            items = recipe.utensils.map(ustensil => ustensil.toLowerCase());
            break;
        }
        return items;
      }).flat()))
        .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
        .map(item => {
          return `
            <li class="p-2 sm:text-base text-sm hover:bg-yellow focus:bg-yellow cursor-pointer capitalize" tabindex="0">${item}</li>
          `;
        }).join('');
    } else {
      return Array.from(new Set(recipes.filter(recipe => {
        return currentSearch.every(id => {
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
      }).map(recipe => {
        let items;
        switch (filtreName) {
          case "Ingrédients":
            items = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase());
            break;
          case "Appareils":
            items = [recipe.appliance.toLowerCase()];
            break;
          case "Ustensiles":
            items = recipe.utensils.map(ustensil => ustensil.toLowerCase());
        }
        return items;
      }).flat()))
        .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
        .map(item => {
          return `
                <li class="p-2 hover:bg-yellow sm:text-base text-sm focus:bg-yellow cursor-pointer capitalize" tabindex="0">${item}</li>
              `;
        }).join('');
    }
  }


  /*
  *1. On ajoute un event listener sur chaque input pour filtrer les items
  *2. On récupère le nom du filtre
  *3. On récupère les divs de current-search
  *4. On récupère les p de chaque div
  *5. On les met dans un tableau
  *6. On les met en minuscule
  *7. On récupère la valeur de l'input
  *8. On récupère tous les items de la liste
  *9. On les mappe
  *10. On récupère la valeur de chaque item
  *11. On les met en minuscule
  *12. On vérifie si la valeur de l'input est vide
  *13. Si c'est le cas, on enlève la classe hidden
  *14. Sinon, on vérifie si la valeur de l'input est incluse dans la valeur de l'item
  *15. Si c'est le cas, on enlève la classe hidden
  *16. Sinon, on ajoute la classe hidden
  */
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

  // On ajoute un event listener sur chaque button dans les divs de current-search pour les supprimer
  const currentSearchDiv = document.getElementById('current-search');
  currentSearchDiv.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (button) {
      button.parentElement.remove();
    }
  });
}

// Fonction qui permet d'ajouter un item à la liste de recherche actuelle
export function addListItemToCurrentSearch() {
  const currentSearchDiv = document.getElementById('current-search');
  document.addEventListener('click', (event) => {
    const item = event.target.closest('li');
    if (item) {
      currentSearchDiv.innerHTML += `
        <div class="flex items-center justify-center gap-8 bg-yellow pl-4 rounded-xl activeFilter sm:text-base text-sm">
          <p class="whitespace-nowrap">${item.innerText}</p>
          <button class="p-4">
            <i class="fas fa-times"></i>
          </button>
        </div>`;
    }
  });
}