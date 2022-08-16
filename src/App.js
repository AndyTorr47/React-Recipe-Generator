const getMealBtn = document.getElementById("get_meal");
const mealContainer = document.getElementById("meal");

getMealBtn.addEventListener("click", () => {
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      createMeal(res.meals[0]);
    });
});

function createMeal(meal) {
  const ingredients = [];
  for (i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} -
      ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }
  console.log(ingredients);

  document.getElementById("get_meal").innerHTML = `
    <div class="row>
    <div class="columns five">
    <img src="${meal.strMealThumb}" alt="Meal Img" />

    <p><strong>Category:</strong> ${meal.strCategory}
    <strong>Area:</strong> ${meal.strArea}
    <strong>Tags:</strong> ${meal.strTags.split(",").join(", ")}</p>

    <h5>Ingredients</h5>
    <ul>
    ${ingredients
      .map(
        (ingredientArr) => `
      <ul>${ingredientArr}</ul>`
      )
      .join("")}
    </ul>

    </div>
    <div class=columns seven">
    <h4>${meal.strMeal}</h4>
    <h7>${meal.strInstructions}</h7>
    </div>
    <div class="row">
    <h5> Video Recipe</h5>
    <div class="videoWrapper">
    <iframe
    src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}" />
    </div>

    `;
}
