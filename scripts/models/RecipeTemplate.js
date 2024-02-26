import { Recipe } from "./Recipe.js";

export class RecipeTemplate extends Recipe {
    constructor(recipe) {
        super(recipe);
    }

    /**
     * Récupère le DOM de la carte de recette.
     * @returns {HTMLElement} - Le DOM de la carte de recette.
     */
    getRecipeCardDOM() {
        const recipeCard = new DOMParser().parseFromString(`
                <article
                    class="bg-white rounded-xl overflow-hidden drop-shadow-2xl relative hover:scale-105 transition duration-300">
                    <figure class="">
                        <img src="/images/recettes/${this.image}" alt="Recette ${this.id}" class="object-cover h-80 w-full" />
                    </figure>
                    <span class="absolute top-5 right-5 bg-yellow p-1 px-4 rounded-full text-xs">${this.time}min</span>
                    <div class="px-8 py-8 flex flex-col gap-4" id="description">
                        <h2 class="font-anton text-lg text-black pb-2">${this.name}</h2>
                        <h3 class="text-xs text-grey uppercase tracking-widest font-bold">Recette</h3>
                        <p class="text-sm overflow-hidden max-h-16 overflow-ellipsis">
                                ${this.description}
                        </p>
                        <h3 class="text-xs text-grey uppercase tracking-widest font-bold">Ingrédients</h3>
                    </div>
                </article>
                `, "text/html").body.firstChild;

        const ingredientsContainer = recipeCard.querySelector('#description');

        // On ajoute la liste des ingrédients à la recette
        ingredientsContainer.appendChild(this.getIngredientsDom());

        return recipeCard;
    }

    /**
     * Récupère le DOM des ingrédients de la recette.
     * @returns {HTMLElement} - Le DOM des ingrédients de la recette.
     */
    getIngredientsDom() {

        // On crée un élément DOM pour la liste des ingrédients
        const ingredientsDiv = new DOMParser().parseFromString(`
        <div id="ingredients" class="grid grid-cols-2 gap-5"></div>
        `, "text/html").body.firstChild;

        this.ingredients.forEach(ingredient => {

            // Si l'ingrédient n'a pas de quantité ou d'unité, on les remplace par une chaine vide
            const quantity = ingredient.quantity || '';
            const unit = ingredient.unit || '';

            // On crée un élément DOM pour chaque ingrédient
            const ingredientDom = new DOMParser().parseFromString(`
                <div>
                    <h4 class="text-sm capitalize">${ingredient.ingredient}</h4>
                    <p class="text-sm text-grey">${quantity} ${unit}</p>
                </div>`, "text/html").body.firstChild;
            ingredientsDiv.appendChild(ingredientDom);
        });
        return ingredientsDiv;
    }
}

