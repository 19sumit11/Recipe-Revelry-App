const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');

const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');

// FUNCTION TO GET RECIPES

const fetchReciipes =async (element)  =>{
  recipeContainer.innerHTML="<h2>Fetching Recipes...</h2>"

  
  // IF USER SEARCH RANDOM THING WHICH IS NOT PRESENT THEN
  
  try {

        const data= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${element}`);
        const response = await data.json();


         recipeContainer.innerHTML=""  // CONVERTING H2 I.E FAVOURITE RECIPE TO EMPTY

          response.meals.forEach(meal => {
    const recipeDiv = document.createElement('div');
    recipeDiv.classList.add('recipe');   // GIVING CLASSNAME RECIPE TO THE DIV
    // strMealThumb IS THE IMAGE NAME IN API WE ARE TAKING FROM API ,
    recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}">   
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span>Dish</p>
        <p>Belongs to <span>${meal.strCategory}</span> Category</p>
        
    `
    //MAKING BUTTON OF VIEW RECIPE  

    const button = document.createElement('button');
    button.textContent = "View Recipe";
    recipeDiv.appendChild(button);

// ADDING EVENTLISTENER TO RECIPE BUTTON
  button.addEventListener('click',()=>{
    openRecipePopup(meal);
  })
     recipeContainer.appendChild(recipeDiv);    
        });
      }
      catch (error) {
        recipeContainer.innerHTML = "<h2>Error in fetching Recipes...</h2>";
      }

  // console.log(response);   //we get all the item realated to that we search
  // console.log(response.meals[0]);  //we get firsh item in th list we searched

}


// FUNCTION TO FETCH INGREDIENTS AND MEASURMENTS

const fetchIngredients = (meal) => {
  let IngredentsList = "";
  for(let i=1;i<=20;i++) {
    const ingredient = meal[`strIngredient${i}`];
    if (ingredient) {
      const measure = meal[`strMeasure${i}`];
      IngredentsList += `<li>${measure} ${ingredient}</li>`
    }
    else {
      break;
    }
  }
  return IngredentsList;
}

const openRecipePopup = (meal) =>{
  recipeDetailsContent.innerHTML = `

    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredents:</h3>
    <ul class="ingredientList">${fetchIngredients(meal)}</ul>
    <div class="recipeInstructions">
      <h3>Instructions:</h3>
      <p >${meal.strInstructions}</p>
    </div>
  `

  
 recipeDetailsContent.parentElement.style.display = "block";
}

recipeCloseBtn.addEventListener('click', ()=>{
  recipeDetailsContent.parentElement.style.display = "none";

})


searchBtn.addEventListener('click',(e) =>{
  e.preventDefault();      // STOPPING FROM AUTO SUBMIT\

  const searchInput = searchBox.value.trim();
  // IF USER DIDN'T SEARCH ANYTHING THEN
  if (!searchInput){
    recipeContainer.innerHTML= `<h2>Type the meal in the search box.</h2>`;
    return;
  }

  // console.log(searchInput); // what will search in search box we will get here
  fetchReciipes(searchInput);
  // console.log("Button clicked");
})

