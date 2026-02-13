const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const errorMessage = document.getElementById('errorMessage');
const resultsGrid = document.getElementById('resultsGrid');
const loading = document.getElementById('loading');
const noResults = document.getElementById('noResults');

let currentResults = [];

searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();

    if (!query) {
        errorMessage.textContent = "Please enter a search term.";
        errorMessage.classList.remove('hidden');
        return;
    }

    errorMessage.textContent = "";
    searchMeals(query);
});

async function searchMeals(query) {
    loading.classList.remove('hidden');
    resultsGrid.innerHTML = "";
    noResults.classList.add('hidden');

    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const data = await response.json();
        loading.classList.add('hidden');

        if (!data.meals) {
            noResults.classList.remove('hidden');
            return;
        }

        currentResults = data.meals;
        displayResults(currentResults);
    } catch (error) {
        loading.classList.add('hidden');
        console.log(error);
    }
}

function displayResults(meals) {
  resultsGrid.innerHTML = "";

  meals.forEach(meal => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${meal.strMealThumb}" />
      <h3>${meal.strMeal}</h3>
      <p>${meal.strCategory}</p>
    `;

    card.addEventListener("click", () => {
      showMealDetail(meal.idMeal);
    });

    resultsGrid.appendChild(card);
  });
}