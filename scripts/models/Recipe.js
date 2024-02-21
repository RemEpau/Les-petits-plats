export class Recipe {
    constructor(data) {
        this._id = data.id;
        this._image = data.image;
        this._name = data.name;
        this._servings = data.servings;
        this._ingredients = data.ingredients;
        this._time = data.time;
        this._description = data.description;
        this._utensils = data.utensils;
    }
    get id() {
        return this._id;
    }
    get image() {
        return this._image;
    }
    get name() {
        return this._name;
    }
    get servings() {
        return this._servings;
    }
    get ingredients() {
        return this._ingredients;
    }
    get time() {
        return this._time;
    }
    get description() {
        return this._description;
    }
    get utensils() {
        return this._utensils;
    }
}