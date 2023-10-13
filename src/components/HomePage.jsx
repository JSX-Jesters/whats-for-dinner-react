import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import placeImage from "../images/placeholder.png";
import axios from "axios";
import FoodOption from "./FoodOption";
import Recipe from "./Recipe";

function HomePage() {
	// State for meal images and names
	const [meal1Image, setMeal1Image] = useState(placeImage); // Initialize with a placeholder image
	const [meal2Image, setMeal2Image] = useState(placeImage);
	const [meal1Name, setMeal1Name] = useState("Meal 1"); // Default meal name
	const [meal2Name, setMeal2Name] = useState("Meal 2");
	const [meal1Recipe, setMeal1Recipe] = useState(""); // COMMENTING THESE OUT TO TROUBLESHOOT DEPLOYMENT
	const [meal2Recipe, setMeal2Recipe] = useState(""); // COMMENTING THESE OUT TO TROUBLESHOOT DEPLOYMENT
	const [mealsSelected, setMealsSelected] = useState(0);
	const [mealWinnerName, setMealWinnerName] = useState(null);
	const [mealWinnerImage, setMealWinnerImage] = useState(null);
	const [mealWinnerRecipe, setMealWinnerRecipe] = useState(null);

	// Function to handle the "Start" button click
	const handleStartClick = async () => {
		try {
			// On Start Click count is reset to 0.
			setMealsSelected(0);
			setMealWinnerName(null);
			setMealWinnerImage(null);
			setMealWinnerRecipe(null);
			// API requests to get random meal images
			const response1 = await axios.get(
				"https://www.themealdb.com/api/json/v1/1/random.php"
			);
			const response2 = await axios.get(
				"https://www.themealdb.com/api/json/v1/1/random.php"
			);

			// Extract meal data for the first meal
			const mealData1 = response1.data.meals[0] || {};
			const meal1NameUrl = mealData1.strMeal || "Meal 1";
			const meal1ImageUrl = mealData1.strMealThumb || placeImage; // Use a placeholder image if not available

			// Extract meal data for the second meal
			const mealData2 = response2.data.meals[0] || {};
			const meal2NameUrl = mealData2.strMeal || "Meal 2";
			const meal2ImageUrl = mealData2.strMealThumb || placeImage;

			// Extract Recipe from API responses
			const meal1Recipe = response1.data.meals[0]?.strInstructions; // COMMENTING THESE OUT TO TROUBLESHOOT DEPLOYMENT
			const meal2Recipe = response2.data.meals[0]?.strInstructions; // COMMENTING THESE OUT TO TROUBLESHOOT DEPLOYMENT

			// Update state to display the fetched images, names and recipes
			setMeal1Image(meal1ImageUrl);
			setMeal1Name(meal1NameUrl);
			setMeal2Image(meal2ImageUrl);
			setMeal2Name(meal2NameUrl);
			setMeal1Recipe(meal1Recipe); // COMMENTING THESE OUT TO TROUBLESHOOT DEPLOYMENT
			setMeal2Recipe(meal2Recipe); // COMMENTING THESE OUT TO TROUBLESHOOT DEPLOYMENT
		} catch (error) {
			console.error("Error fetching meal images:", error);
		}
	};

	const handleMealClick = async (mealId) => {
		try {
			// Retrieve Random Meal from API
			const meal = await axios.get(
				"https://www.themealdb.com/api/json/v1/1/random.php"
			);

			// Retrieve Image from Meal
			const mealImageUrl = meal.data.meals[0]?.strMealThumb;
			// Retrieve Name from Meal
			const mealNameUrl = meal.data.meals[0]?.strMeal;
			// Retrieve Recipe from Meal
			const mealRecipe = meal.data.meals[0]?.strInstructions;

			// If Meal #1 is clicked, Meal #2 is reshuffled
			if (mealId === 1) {
				setMeal2Image(mealImageUrl);
				setMeal2Name(mealNameUrl);
				setMeal2Recipe(mealRecipe);
				// If Meal #2 is clicked, Meal #1 is reshuffled
			} else if (mealId === 2) {
				setMeal1Image(mealImageUrl);
				setMeal1Name(mealNameUrl);
				setMeal1Recipe(mealRecipe);
			}
			// Increases the meal count as each click occurs
			setMealsSelected(mealsSelected + 1);
			// If mealsSelected reaches 5: display recipe for last selection
			if (mealsSelected >= 4) {
				// If Meal #2 is selected, meal information is set as Winner state
				if (mealId === 2) {
					setMealWinnerName(meal2Name);
					setMealWinnerImage(meal2Image);
					setMealWinnerRecipe(meal2Recipe);
					// If Meal #1 is selected, meal information is set as Winner state
				} else if (mealId === 1) {
					setMealWinnerName(meal1Name);
					setMealWinnerImage(meal1Image);
					setMealWinnerRecipe(meal1Recipe);
				}
			}
		} catch (error) {
			console.error("Error fetching meal image:", error);
		}
	};
	function changeLabel() {
		document.querySelector("button").innerHTML = "Reshuffle!";
	}

	useEffect(() => {
		const t = setTimeout(() => {}, 2000);
		return () => {
			clearTimeout(t);
		};
	}, []);

	return (
		<Container>
			{/* Button to start and fetch random meals */}
			<button
				className="btn btn-primary"
				onClick={function (event) {
					handleStartClick();
					changeLabel();
				}}
			>
				Start
			</button>
			{/* No Winner is set from Start, so FoodOptions are displayed */}
			{mealWinnerName === null ? (
				<>
					<Row>
						{/* Display the first meal's name and image */}
						<Col md={6} className="mb-3">
							<FoodOption
								name={meal1Name}
								url={meal1Image}
								handleClick={() => handleMealClick(1)}
							/>
						</Col>

						{/* Display the second meal's name and image */}
						<Col md={6} className="mb-3">
							<FoodOption
								name={meal2Name}
								url={meal2Image}
								handleClick={() => handleMealClick(2)}
							/>
						</Col>
					</Row>
					{/* Include the Recipe component with meal data */}
					<Recipe
						meal1Name={meal1Name}
						meal2Name={meal2Name}
						meal1Image={meal1Image}
						meal2Image={meal2Image}
					/>
				</>
			) : (
				// When setWinner is not null, selected meal recipe is revealed
				<>
					<FoodOption
						name={mealWinnerName}
						hideButton={true}
						url={mealWinnerImage}
						recipe={mealWinnerRecipe}
					/>
				</>
			)}
		</Container>
	);
}

export default HomePage;
