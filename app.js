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
    
      <div id='${element.id}'class="card">
      <img style="width: 80px; height:80px; border-radius: 50px";  src="${element.image_url}" alt="recipe image" />
        <div>
          <p>${element.title}</p>
          <p>${element.publisher}</p>
        </div>
      </div>
      `;
    });
  } catch (error) {
    console.log("error: ", error);
  }
}

let arr = []

let searchSingleRecipies = async (id) => {

  const response = await fetch(
    `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
  );
  const JSONResponse = await response.json();
  console.log(JSONResponse.data.recipe);
  displaySingleRecipe(JSONResponse.data.recipe);
};


let displaySingleRecipe = (recipe) => {
  console.log(recipe.ingredients)
  recipe.ingredients.forEach((element) => {
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

recipeList.addEventListener('click', (e) => {
  let card = e.target.closest(".card");
  console.log(card.id); // Output: "card1"
  searchSingleRecipies(card.id)
})