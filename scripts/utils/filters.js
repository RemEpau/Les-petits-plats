import { recipes } from '../../data/recipes.js';

const filtres = [
  "Ingrédients",
  "Appareils",
  "Ustensiles"
];

export function filtresDropDown() {
  for (let i = 0; i < filtres.length; i++) {
    document.getElementById('filtres').innerHTML += `
        <div div class="w-52 font-medium z-10 relative" id="${normalizedFilters(filtres[i])}">
          <div class="bg-white w-full p-4 flex items-center justify-between rounded-xl cursor-pointer btn-dropdown relative">
            ${filtres[i]}
            <i class="fa-solid fa-chevron-down"></i>
          </div>
          <ul class="bg-white overflow-y-auto max-h-52 hidden rounded-b-xl absolute">
            <div class="m-2 flex items-center border">
              <input type="text" class="p-2 w-full">
              <button>
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
            </div>
            ${listItems(filtres[i])}
          </ul>
        </div>
        `
  }

  function normalizedFilters(filtreName) {
    return filtreName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
  }

  function listItems(filtreName) {
    return Array.from(new Set(recipes.map(recipe => {
      switch (filtreName) {
        case "Ingrédients":
          return recipe.ingredients.map(ingredient => ingredient.ingredient);
        case "Appareils":
          return recipe.appliance;
        case "Ustensiles":
          return recipe.utensils;
      }
    }).flat())).sort().map(item => {
      return `
        <li class="p-2 hover:bg-yellow cursor-pointer capitalize">${item}</li>
      `;
    }).join('');
  }

  document.addEventListener('click', (event) => {
    const button = event.target.closest('.btn-dropdown');
    if (button) {
      button.nextElementSibling.classList.toggle('hidden');
      button.classList.toggle('rounded-xl');
      button.classList.toggle('rounded-t-xl');
    } else if (!button) {
      document.querySelectorAll('.btn-dropdown').forEach(btn => {
        btn.nextElementSibling.classList.add('hidden');
        btn.classList.remove('rounded-xl');
        btn.classList.add('rounded-xl');
      });
    }
  });
}

