import React, { useState } from "react";
import axios from "axios";

function Recipe({ meal1Name, meal2Name }) {
	// State for meal recipes and visibility
	const [meal1Recipe, setMeal1Recipe] = useState(null);
	const [meal2Recipe, setMeal2Recipe] = useState(null);
	const [isMeal1Visible, setIsMeal1Visible] = useState(false);
	const [isMeal2Visible, setIsMeal2Visible] = useState(false);

	// Function to handle recipe button click
	const handleRecipeClick = async (mealNumber) => {
		try {
			// Determine the meal name based on the meal number
			let mealName;
			if (mealNumber === 1) {
				mealName = meal1Name;
			} else {
				mealName = meal2Name;
			}

			// Fetch meal details using Axios
			const response = await axios.get(
				`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
			);

			console.log("API Response", response.data);
			console.log("meal name: ", mealName);

			if (response.data.meals && response.data.meals.length > 0) {
				const meal = response.data.meals[0];
				// const mealName = meal.strMeal;     // COMMENTING THESE OUT TO TROUBLESHOOT DEPLOYMENT
				const mealInstructions = meal.strInstructions;

				// Extract and format ingredients
				const ingredients = [];
				for (let i = 1; i <= 20; i++) {
					const ingredient = meal[`strIngredient${i}`];
					if (ingredient) {
						const measure = meal[`strMeasure${i}`];
						ingredients.push(`${ingredient} - ${measure}`);
					}
				}

				// Create the recipe content
				const recipeContent = `\n${mealInstructions}\n\nIngredients:\n${ingredients.join(
					"\n"
				)}`;

				if (mealNumber === 1) {
					setMeal1Recipe(recipeContent);
					setIsMeal1Visible(true);
				} else {
					setMeal2Recipe(recipeContent);
					setIsMeal2Visible(true);
				}
			}
		} catch (error) {
			console.error("Error fetching recipe:", error);
		}
	};

	// Function to determine the button label based on meal number and visibility
	const getButtonLabel = (mealNumber) => {
		if (mealNumber === 1) {
			return isMeal1Visible
				? `Hide ${meal1Name} Recipe`
				: `Show ${meal1Name} Recipe`;
		} else {
			return isMeal2Visible
				? `Hide ${meal2Name} Recipe`
				: `Show ${meal2Name} Recipe`;
		}
	};

	return (
		<div>
			{/* Buttons for each meal */}
			<button
				className="btn show-recipe"
				onClick={() => handleRecipeClick(1)}
			>
				{getButtonLabel(1)}
			</button>
			<button
				className="btn show-recipe"
				onClick={() => handleRecipeClick(2)}
			>
				{getButtonLabel(2)}
			</button>

			{/* Display the recipe content for Meal 1 if available and visible */}
			{meal1Recipe && isMeal1Visible && (
				<div>
					<h2>{meal1Name} Recipe</h2>
					<p>
						{meal1Recipe.split("\n").map((paragraph, index) => (
							<p key={index}>{paragraph}</p>
						))}
					</p>
				</div>
			)}

			{/* Display the recipe content for Meal 2 if available and visible */}
			{meal2Recipe && isMeal2Visible && (
				<div>
					<h2>{meal2Name} Recipe</h2>
					<p>
						{meal2Recipe.split("\n").map((paragraph, index) => (
							<p key={index}>{paragraph}</p>
						))}
					</p>
				</div>
			)}
		</div>
	);
}

export default Recipe;
