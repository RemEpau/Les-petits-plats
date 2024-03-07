export function normalizedFilterName(name) {
    return name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}