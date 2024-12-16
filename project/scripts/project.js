// Universal Hamburger Menu Functionality
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  } else {
    console.error('Hamburger menu or nav-links element not found.');
  }
});

// Fetch All Meals
const alphabet = 'abcdefghijk'.split('');
const mealContainer = document.getElementById('meal-container');
const loadingContainer = document.querySelector('.loading-container');

const fetchAllMeals = async () => {
  let allMeals = [];
  for (let letter of alphabet) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    const data = await response.json();
    if (data.meals) {
      allMeals = allMeals.concat(data.meals);
    }
  }
  return allMeals;
};

if (mealContainer && loadingContainer) {
  fetchAllMeals().then((meals) => {
    loadingContainer.style.display = 'none';
    meals.forEach((meal) => {
      const cardElement = document.createElement('div');
      cardElement.className = 'meal-card';
      cardElement.addEventListener('click', () => {
        window.location.href = `recipe-detail.html?id=${meal.idMeal}`;
      });
      cardElement.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <div class="meal-card-content">
          <h3>${meal.strMeal}</h3>
          <p>${meal.strArea} | ${meal.strCategory}</p>
          <p>${meal.strInstructions.slice(0, 100)}...</p>
        </div>
      `;
      mealContainer.appendChild(cardElement);
    });
  });
}

// Recipe Details
const urlParams = new URLSearchParams(window.location.search);
const mealId = urlParams.get('id');

if (mealId) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((response) => response.json())
    .then((data) => {
      const meal = data.meals[0];
      document.getElementById('meal-image').src = meal.strMealThumb;
      document.getElementById('meal-name').textContent = meal.strMeal;
      document.getElementById('meal-area-category').textContent = `${meal.strArea} | ${meal.strCategory}`;
      document.getElementById('meal-instructions').textContent = meal.strInstructions;
      document.getElementById('meal-video-link').href = meal.strYoutube;
      document.getElementById('meal-video-thumbnail').src = `https://img.youtube.com/vi/${meal.strYoutube.split('v=')[1]}/0.jpg`;

      const ingredientList = document.getElementById('ingredient-list');
      for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== '') {
          const listItem = document.createElement('li');
          listItem.textContent = `${measure} ${ingredient}`;
          ingredientList.appendChild(listItem);
        }
      }
    });
}

// Contact Form

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      alert(`Thank you ${name}, your message was sent! We will contact you through your email: ${email}`);

      // Clear the form fields
      form.reset();
    });
  } else {
    console.error('Contact form element not found.');
  }
});

// Get Started Button
const getStartedButton = document.querySelector('.get-started');
if (getStartedButton) {
  getStartedButton.addEventListener('click', () => {
    window.location.href = 'recipes.html';
  });
}
