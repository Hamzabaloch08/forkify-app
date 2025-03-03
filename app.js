let searchValue = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");

// const searchRecipe = (event) => {
//   event.preventDefault();
//   searchValue = searchInput.value;
//   const url = `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchValue}`;
//   fetch(url)
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data.data, "data");
//       const recipe = data.data.recipes;
//       console.log(recipe, "recipe");
//       recipe.forEach((element) => {
//         console.log(element, "title");
//       });
//     });
// };

let searchRecipes = async () => {
  searchValue = searchInput.value;
  const url = `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchValue}`;

  try {
    const recipeData = await fetch(url);
    const data = await recipeData.json();
    const recipe = data.data.recipes;
    console.log(recipe);
    recipe.forEach((element) => {
      console.log(element);
    });
  } catch (error) {
    console.log("error: ", error);
  }
};
searchBtn.addEventListener("click", (event) => {
  event.preventDefault();
  searchRecipes();
});
