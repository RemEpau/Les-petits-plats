const filtres = [
  "Ingrédients",
  "Appareil",
  "Ustensiles"
];

export function filtresDropDown() {
  for (let i = 0; i < filtres.length; i++) {
    document.getElementById('filtres').innerHTML += `
        <div div class="w-52 font-medium h-80 z-10">
          <div class="bg-white w-full p-4 flex items-center justify-between rounded-xl cursor-pointer btn-dropdown relative">
            ${filtres[i]}
            <i class="fa-solid fa-chevron-down"></i>
          </div>
          <ul class="bg-white overflow-y-auto max-h-52 hidden rounded-b-xl">
            <div class="m-2 flex items-center border">
              <input type="text" class="p-2 w-full">
              <button>
                <svg width="20" height="20" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"
                  class="m-2">
                  <g id="search">
                    <circle id="Ellipse" cx="10" cy="10.4219" r="9.5" stroke="black"
                      class="group-hover:stroke-secondary transition" />
                    <line id="Line 2" x1="18.3536" y1="19.0683" x2="27.3536" y2="28.0683" stroke="black"
                      class="group-hover:stroke-secondary transition" />
                  </g>
                </svg>
              </button>
            </div>
            <li class="p-2">Pomme de terre</li>
            <li class="p-2">Oeuf</li>
            <li class="p-2">Sel</li>
            <li class="p-2">Poivre</li>
            <li class="p-2">Huile</li>
            <li class="p-2">Lait</li>
          </ul>
        </div>
        `
  }

  const dropdownButtons = document.getElementsByClassName('btn-dropdown');

  new Array(...dropdownButtons).forEach(button => {
    button.addEventListener('click', () => {
      button.nextElementSibling.classList.toggle('hidden');
      if (button.classList.contains('rounded-xl')) {
        button.classList.remove('rounded-xl');
        button.classList.add('rounded-t-xl');
      } else {
        button.classList.remove('rounded-t-xl');
        button.classList.add('rounded-xl');
      }
    });
  });
}

