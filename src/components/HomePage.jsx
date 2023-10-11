import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import placeImage from "../images/placeholder.png";
import axios from "axios"; // Axios for making API requests
import Recipe from "./Recipe";

function HomePage() {
	// State for meal images and names
	const [meal1Image, setMeal1Image] = useState(placeImage); // Initialize with a placeholder image
	const [meal2Image, setMeal2Image] = useState(placeImage);
	const [meal1Name, setMeal1Name] = useState("Meal 1"); // Default meal name
	const [meal2Name, setMeal2Name] = useState("Meal 2");

	// Function to handle the "Start" button click
	const handleStartClick = async () => {
		try {
			// Fetch random meals from the API
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

			// Update the state with the fetched meal data
			setMeal1Image(meal1ImageUrl);
			setMeal1Name(meal1NameUrl);
			setMeal2Image(meal2ImageUrl);
			setMeal2Name(meal2NameUrl);
		} catch (error) {
			console.error("Error fetching meal images:", error);
		}
	};

	return (
		<Container>
			{/* Button to start and fetch random meals */}
			<button className="btn btn-primary" onClick={handleStartClick}>
				Start
			</button>

			<Row>
				{/* Display the first meal's name and image */}
				<Col md={6} className="mb-3">
					<h2>{meal1Name}</h2>
					<img
						src={meal1Image}
						alt=""
						style={{ maxHeight: "300px" }}
					/>
				</Col>

				{/* Display the second meal's name and image */}
				<Col md={6} className="mb-3">
					<h2>{meal2Name}</h2>
					<img
						src={meal2Image}
						alt=""
						style={{ maxHeight: "300px" }}
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
