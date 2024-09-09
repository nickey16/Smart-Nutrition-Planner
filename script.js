document.getElementById('nutrition-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const foodItem = document.getElementById('food-input').value;
    console.log(foodItem);
    getNutritionData(foodItem);
});

function getNutritionData(food) {
    //const apiKey = '5b0e557940424a7ebdfb89a7adcfb2ef'; // Replace with your API key
    const apiKey = '902a71c72c1f441b8ebd449a526d41a2';
    const apiUrl = `https://api.spoonacular.com/food/ingredients/search?query=${food}&apiKey=${apiKey}`;

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        if (data.results && data.results.length > 0) {
            const foodId = data.results[0].id;
            getDetailedNutritionData(foodId);
        } else {
            document.getElementById('nutrition-results').innerHTML = `<p>No data found for this food.</p>`;
        }
    })
    .catch(error => console.error('Error fetching nutrition data:', error));
}

function getDetailedNutritionData(foodId) {
    const apiKey = '5b0e557940424a7ebdfb89a7adcfb2ef'; // Replace with your API key
    const apiUrl = `https://api.spoonacular.com/food/ingredients/${foodId}/information?amount=1&apiKey=${apiKey}`;

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => displayNutritionData(data))
    .catch(error => console.error('Error fetching detailed nutrition data:', error));
}

function displayNutritionData(data) {
    const resultsDiv = document.getElementById('nutrition-results');
    resultsDiv.innerHTML = `
        <h2>Nutrition Information for ${data.name}</h2>
        <p>Calories: ${data.nutrition.nutrients[0].amount}</p>
        <p>Carbohydrates: ${data.nutrition.nutrients[3].amount}g</p>
        <p>Fat: ${data.nutrition.nutrients[1].amount}g</p>
        <p>Protein: ${data.nutrition.nutrients[8].amount}g</p>
    `;
}

