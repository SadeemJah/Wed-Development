document.addEventListener("DOMContentLoaded", function() {
  const API_KEY = "ea81ba65f7de480e80b8c503bd8a3318"; // Replace with your Spoonacular API key
  const searchForm = document.getElementById("SearchBox");
  const recipesContainer = document.getElementById("recipes-container");

  // Event listener for form submission
  searchForm.addEventListener("submit", function(event) {
      event.preventDefault(); // Prevent form submission

      const query = document.getElementById("query").value.trim(); // Get the search query from the input field

      // Clear previous search results
      recipesContainer.innerHTML = "";

      // Fetch recipes from Spoonacular API
      fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=ea81ba65f7de480e80b8c503bd8a3318&query=rice&cuisine=amercian&cuisine=dite`)
          .then(response => response.json())
          .then(data => {
              // Loop through each recipe and create HTML elements to display recipe details
              data.results.forEach(recipe => {
                  const recipeCard = document.createElement("div");
                  recipeCard.classList.add("recipe-card");

                  recipeCard.innerHTML = `
                      <h2>${recipe.title}</h2>
                      <p><strong>Ready in:</strong> ${recipe.readyInMinutes} minutes</p>
                      <img src="${recipe.image}" alt="${recipe.title}">
                      <a href="${recipe.sourceUrl}" target="_blank">View Recipe</a>
                  `;

                  recipesContainer.appendChild(recipeCard);
              });
          })
          .catch(error => {
              console.error("Error fetching recipes:", error);
              recipesContainer.innerHTML = "<p>Unable to fetch recipes. Please try again later.</p>";
          });
  });
});
