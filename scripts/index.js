import { recipes } from "../data/recipes.js";

// This is just an example to test ESLint, Vite & TailwindCSS
recipes.forEach((recipe) => {
    const recipeCard = new DOMParser().parseFromString(`
        <article class="mb-52">
            <h2 class="text-3xl font-bold mb-5">${recipe.name}</h2>
            <p class=" text-lg">${recipe.description}</p>
            <ul class="flex flex-row gap-3 mt-5 mb-5">
                ${recipe.ingredients.map((ingredient) => `<li class="
                font-light bg-slate-800 py-1 px-3 rounded-lg border border-slate-950 hover:bg-slate-700 transition
                ">${ingredient.ingredient}</li>`).join("")}
            </ul>
        </article>
    `, "text/html").body.firstChild;
    document.querySelector("#recipes").appendChild(recipeCard);
});