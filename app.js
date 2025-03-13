let searchValue = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");
let recipeList = document.querySelector(".card-list");
let recipeCard = document.querySelector(".right");
let bookmarkContainer = document.querySelector(".bookMarkBox");
let bookMarkBtn = document.getElementById("bookmarkBtn");
let recipeContainer = document.querySelector(".right");
let bookmarkListBtn = document.getElementById("bookMarkListBtn");
let modal = document.querySelector(".active");

// let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

let searchRecipes = async () => {
  searchValue = searchInput.value;
  const url = `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchValue}`;
  try {
    const recipeData = await fetch(url);
    const data = await recipeData.json();
    const recipe = data.data.recipes;
    recipeList.innerHTML = "";
    recipe.forEach((element) => {
      recipe.forEach((element) => {
        let recipeTitle = element.title;

        if (recipeTitle.length > 30) {
          recipeTitle = recipeTitle.slice(0, 25) + "...";
        }

        recipeList.innerHTML += `
          <div id="${element.id}" class="card">
            <div class="card-img">
              <img src="${element.image_url}" alt="recipe image" />
            </div>
            <div>
              <h1>${recipeTitle}</h1>
              <p>${element.publisher}</p>
            </div>
          </div>
        `;
      });
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
  console.log(JSONResponse.data);
  displaySingleRecipe(JSONResponse.data.recipe, JSONResponse.data.recipe.id);
};

let displaySingleRecipe = (recipe, id) => {
  console.log(id);
  console.log(recipe.ingredients);

  // Convert ingredients into list items
  let ingredientsList = recipe.ingredients
    .map(
      (ing) => `<li>${ing.quantity || ""} ${ing.unit} - ${ing.description}</li>`
    )
    .join("");

  recipeCard.innerHTML = `
  <div id=${id}  class="recipe-container">
    <!-- Top Image -->
    <div class="recipe-img">
      <img src="${recipe.image_url}" alt="recipe image" />
    </div>

    <!-- Title and Basic Info -->
    <div class="recipe-info">
      <h1>${recipe.title}</h1>
      <p><strong>Cooking Time:</strong> ${recipe.cooking_time} minutes</p>
      <p><strong>Servings:</strong> ${recipe.servings}</p>
      <Button id="bookmarkBtn">BookMark</Button>
      
    </div>

    <!-- Recipe Ingredients -->
    <div class="recipe-ingredients">
      <h2>Recipe Ingredients</h2>
      <ul class="recipe-ingredients-list">
        ${ingredientsList}
      </ul>
    </div>

    <!-- How to Cook It Section -->
    <div class="recipe-directions">
      <h3>How to Cook It</h3>
      <p>${
        recipe.instructions || "Please follow the directions on the website."
      }</p>
      <p>This recipe was carefully designed and tested by <strong>${
        recipe.publisher
      }</strong>. 
      Please check out directions at their website.</p>
      <a href=""><button>directions</button></a>
    </div>



  </div>
  `;
};

searchBtn.addEventListener("click", (event) => {
  event.preventDefault();
  searchRecipes();
});

recipeList.addEventListener("click", (e) => {
  let card = e.target.closest(".card");
  console.log(card.id);
  searchSingleRecipies(card.id);
});

bookmarkListBtn.addEventListener("mouseover", () =>  modal.style.display = "block");
bookmarkListBtn.addEventListener("mouseleave", () =>  modal.style.display = "none");

// BOOKMARK SECTION

let bookmark = (id) => {
  bookMarkBtn.addEventListener("click", () => {
    let bookMarkId = e.target.closest(".recipe-container");
    if (id === bookMarkId.id) {
      // remove Bookmark Container
    } else {
      // add bookmark container
    }
  });
};

// let toggleBookMark = (id, image_url, title) => {
//   let index = bookmarks.findIndex((recipe) => recipe.id === id);
//   if (index === -1) {
//     bookmarks.push({ id, image_url, title });
//   } else {
//     index.splice(index, 1);
//   }

//   localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

//   displayBookMark();
// };
