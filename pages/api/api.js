
export async function fetchRecipes(query, maxFat, number) {
    const API_KEY = '4c1623b74de04ab5bb2ffe7330e066f5';
    const url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&maxFat=${maxFat}&number=${number}&apiKey=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();
    return data.results;
}
