let searchValue = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");

let searchRecipes = async () => {
  searchValue = searchInput.value;
  const url = `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchValue}`;

  try {
    const recipeData = await fetch(url);
    const data = await recipeData.json();
    const recipe = data.data.recipes;
    console.log(recipe);
  } catch (error) {
    console.log("error: ", error);
  }
};

searchBtn.addEventListener("click", (event) => {
  event.preventDefault();
  searchRecipes();
});