export class RecipeTemplate {
    constructor(recipe) {
        this._recipe = recipe;
    }

    getRecipeCardDOM() {
        console.log(this._recipe);
        const card = new DOMParser().parseFromString(`
        <article
          class="bg-white rounded-xl overflow-hidden drop-shadow-2xl relative hover:scale-105 transition duration-300">
          <figure class="">
            <img src="/images/recettes/${this._recipe.image}" alt="Recette ${this._recipe.id}" class="object-cover h-80 w-full" />
          </figure>
          <span class="absolute top-5 right-5 bg-primary p-1 px-4 rounded-full text-xs">${this._recipe.time}min</span>
          <div class="px-8 py-8 flex flex-col gap-4">
            <h2 class="font-anton text-lg pb-2">${this._recipe.name}</h2>
            <h3 class="text-xs text-tertiary uppercase tracking-widest font-bold">Recette</h3>
            <p class="text-sm overflow-hidden max-h-16 overflow-ellipsis">
                ${this._recipe.description}
            </p>
            <h3 class="text-xs text-tertiary uppercase tracking-widest font-bold">Ingrédients</h3>
            <div class="grid grid-cols-2 gap-5" id="ingredients">
            </div>
          </div>
        </article>
        `, "text/html");

        console.log(card);


        this._recipe.ingredients.forEach(ingredient => {
            const ingredientDOM = new DOMParser().parseFromString(`
        <div>
            <h4 class="text-sm">${ingredient.ingredient}</h4>
            <p class="text-sm text-tertiary">${ingredient.quantity}${ingredient.unit}</p>
        </div>`, "text/html").body.firstChild;
            console.log(ingredientDOM);
        });
    }
}

