let searchValue = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");
let recipeList = document.querySelector(".card-list");
let recipeCard = document.querySelector(".right");

let searchRecipes = async () => {
  searchValue = searchInput.value;
  const url = `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchValue}`;
  try {
    const recipeData = await fetch(url);
    const data = await recipeData.json();
    const recipe = data.data.recipes;
    recipe.forEach((element) => {
      recipeList.innerHTML += `
    
      <div id='${element.id}' style="padding: 5px 0 0 5px" class="card">
      <img style="width: 80px; height:80px; border-radius: 50px";  src="${element.image_url}" alt="recipe image" />
      <p>${element.title}</p>
      <p>${element.publisher}</p>
      </div>
      `;
    });
  } catch (error) {
    console.log("error: ", error);
  }
};

let arr = []

let searchSingleRecipies = async () => {
  let card = document.querySelector(".card");
  let id = card.id;
  try {
    console.log(id);
    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    const JSONResponse = await response.json();
    // console.log(JSONResponse.data.recipe, 'Recipe Data');
    displaySingleRecipe(JSONResponse.data.recipe);
  } catch (error) {
    console.log("error: ", error);
  }
};

let displaySingleRecipe = (recipe) => {
  console.log(recipe)
  recipe.ingredients.forEach((element) => {
    console.log(element,'ingredients')
  })
  recipeCard.innerHTML = `
  <div class="card">
  <img style="width: 80px; height:80px; border-radius: 50px";  src="${recipe.image_url}" alt="recipe image" />
  <p>${recipe.title}</p>
  <p>${recipe.cooking_time}</p>
  <p>${recipe.servings}</p>
  </div>
  `;
};

searchBtn.addEventListener("click", (event) => {
  event.preventDefault();
  searchRecipes();
});

recipeList.addEventListener("click", () => {
  searchSingleRecipies();
});
