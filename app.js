let searchValue = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");

const searchRecipe = (event) => {
  event.preventDefault();
  searchValue = searchInput.value;
  const url = `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchValue}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.data, "data");
      const recipe = data.data.recipes;
      console.log(recipe, "recipe");
      recipe.forEach((element) => {
        console.log(element, "title");
      });
    });
};

searchBtn.addEventListener("click", searchRecipe);
