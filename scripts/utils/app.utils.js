export function normalizedFilterName(name) {
    let normalized = name.toLowerCase().normalize('NFD');
    let result = '';
    for (let i = 0; i < normalized.length; i++) {
        let charCode = normalized.charCodeAt(i);
        if (charCode < 0x0300 || charCode > 0x036f) {
            result += normalized[i];
        }
    }
    return result;
}