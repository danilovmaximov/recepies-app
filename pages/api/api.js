
export async function fetchRecipes(query, diet, cuisine, ingredients, number, page) {
    // const API_KEY = '4c1623b74de04ab5bb2ffe7330e066f5';
    // const API_KEY = 'a6330108aac5429f835e80f9490f3a2a';
    const API_KEY = '2bfd5fda58c444ef8a76dfbed0135e5c ';
    let url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&diet=${diet}&cuisine=${cuisine}&number=${number}&includeIngredients=${ingredients}&offset=${(page - 1) * number}&apiKey=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();
    return data.results;
}