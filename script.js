const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');

// FUNCTION TO GET RECIPES

const fetchReciipes =async (element)  =>{
  recipeContainer.innerHTML="<h2>Fetching Recipes...</h2>" 
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

  // console.log(response);   //we get all the item realated to that we search
  // console.log(response.meals[0]);  //we get firsh item in th list we searched

}

searchBtn.addEventListener('click',(e) =>{
  e.preventDefault();      // STOPPING FROM AUTO SUBMIT\

  const searchInput = searchBox.value.trim();

  // console.log(searchInput); // what will search in search box we will get here
  fetchReciipes(searchInput);
  // console.log("Button clicked");
})

