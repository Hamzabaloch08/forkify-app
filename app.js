let searchValue = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");

const searchRecipe = () => {
  searchValue = searchInput.value;
  const url = `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchValue}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "data");
    });
};

searchBtn.addEventListener("click", searchRecipe);
