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
	const [meal1Recipe, setMeal1Recipe] = useState("");
	const [meal2Recipe, setMeal2Recipe] = useState("");
	const [mealsSelected, setMealsSelected] = useState(0);

	// Function to handle the "Start" button click
	const handleStartClick = async () => {
		try {
			// On Start Click count is reset to 0.
			setMealsSelected(0);
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
			const meal1Recipe = response1.data.meals[0]?.strInstructions;
			const meal2Recipe = response2.data.meals[0]?.strInstructions;

			// Update state to display the fetched images
			setMeal1Image(meal1ImageUrl);
			setMeal1Name(meal1NameUrl);
			setMeal2Image(meal2ImageUrl);
			setMeal2Name(meal2NameUrl);
			setMeal1Recipe(meal1Recipe);
			setMeal2Recipe(meal2Recipe);
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
			// Retrieve Image from Meal
			const mealNameUrl = meal.data.meals[0]?.strMeal;

			if (mealId === 1) {
				setMeal2Image(mealImageUrl);
				setMeal2Name(mealNameUrl);
			} else if (mealId === 2) {
				setMeal1Image(mealImageUrl);
				setMeal1Name(mealNameUrl);
			}

			setMealsSelected(mealsSelected + 1);
			// if mealsSelected > 3: display recipe for last selection
			if (mealsSelected >= 3) {
				let thisGuy = meal1Name;
				if (mealId === 2) {
					thisGuy = meal2Name;
				}
				alert(`Looks like you're having ${thisGuy} for dinner`);
			}
		} catch (error) {
			console.error("Error fetching meal image:", error);
		}
	};
	function changeLabel() {
		document.querySelector("button").innerHTML = "Reshuffle!";
	}

	useEffect(() => {
		const t = setTimeout(() =>{

		}, 2000);
		return () =>{
			clearTimeout(t);
		};
	}, []);
	

	return (
		
		<Container>
			{/* Button to start and fetch random meals */}
			<button className="btn btn-primary" onClick={function(event){handleStartClick(); changeLabel()}}>
				Start
			</button>
			<h3>Choices: {mealsSelected}</h3>
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
		</Container>
	);
}

export default HomePage;
