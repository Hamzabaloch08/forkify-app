let searchValue = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");
let recipeList = document.querySelector(".card-list");
let recipeCard = document.querySelector(".right");
let bookmarkContainer = document.querySelector(".bookMarkBox");
let bookMarkBtn = document.getElementById("bookMarkListBtn");

let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

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
};

let searchSingleRecipies = async (id) => {
  const response = await fetch(
    `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
  );
  const JSONResponse = await response.json();
  console.log(JSONResponse.data.recipe);
  displaySingleRecipe(JSONResponse.data.recipe);
};

let displaySingleRecipe = (recipe) => {
  console.log(recipe.ingredients);
  recipeCard.innerHTML = `
  <div class="card">
  <img style="width: 80px; height:80px; border-radius: 50px";  src="${recipe.image_url}" alt="recipe image" />
  <p>${recipe.title}</p>
  <p>${recipe.cooking_time}</p>
  <p>${recipe.servings}</p>
  </div>
  `;
};

let toggleBookMark = (id, image_url, title) => {
  let index = bookmarks.findIndex((recipe) => recipe.id === id);
  if (index === -1) {
    bookmarks.push({ id, image_url, title });
  } else {
    index.splice(index, 1);
  }

  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  displayBookMark();
};

let displayBookMark = () => {}


searchBtn.addEventListener("click", (event) => {
  event.preventDefault();
  searchRecipes();
});
recipeList.addEventListener("click", (e) => {
  let card = e.target.closest(".card");
  console.log(card.id); // Output: "card1"
  searchSingleRecipies(card.id);
});

window.addEventListener("load", displayBookMark);
