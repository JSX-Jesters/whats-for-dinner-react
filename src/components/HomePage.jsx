import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import placeImage from "../images/placeholder.png";
import axios from "axios";
import FoodOption from "./FoodOption";
import Recipe from "./Recipe";

export function HomePage() {
	const [meal1Image, setMeal1Image] = useState(placeImage);
	const [meal2Image, setMeal2Image] = useState(placeImage);
	const [meal1Name, setMeal1Name] = useState("Meal 1");
	const [meal2Name, setMeal2Name] = useState("Meal 2");
	const [meal1Recipe, setMeal1Recipe] = useState("");
	const [meal2Recipe, setMeal2Recipe] = useState("");
	const [mealsSelected, setMealsSelected] = useState(0);

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

			// Extract image URLs from the API responses
			const meal1ImageUrl =
				response1.data.meals[0]?.strMealThumb || placeImage;
			const meal2ImageUrl =
				response2.data.meals[0]?.strMealThumb || placeImage;

			// Extract meal names from the API responses
			const meal1NameUrl = response1.data.meals[0]?.strMeal || meal1Name;
			const meal2NameUrl = response2.data.meals[0]?.strMeal || meal2Name;

			// Extract Recipe from API responses
			const meal1Recipe = response1.data.meals[0]?.strInstructions;
			const meal2Recipe = response2.data.meals[0]?.strInstructions;

			// Update state to display the fetched images
			setMeal1Image(meal1ImageUrl);
			setMeal2Image(meal2ImageUrl);
			setMeal1Name(meal1NameUrl);
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
			const mealImageUrl =
				meal.data.meals[0]?.strMealThumb;
			// Retrieve Image from Meal	
			const mealNameUrl = meal.data.meals[0]?.strMeal;

			
			
			if (mealId === 1){
				setMeal2Image(mealImageUrl);
				setMeal2Name(mealNameUrl);
				
			} else if (mealId === 2) {
				setMeal1Image(mealImageUrl);
				setMeal1Name(mealNameUrl);
			}
			
			setMealsSelected(mealsSelected + 1); 
			// if mealsSelected > 3: display recipe for last selection
			if (mealsSelected >= 3){
				let thisGuy = meal1Name;
				if (mealId === 2){
					thisGuy = meal2Name;
				}
				alert(`Looks like you're having ${thisGuy} for dinner`)  
				
			}

		} catch (error){
			console.error("Error fetching meal image:", error);
		}
	}

	return (
		<Container>
			{/* Button to fetch random meal images */}
			<button className="btn btn-primary" onClick={handleStartClick}>
				Start
			</button>
			<h3>Choices: {mealsSelected}</h3>
			<Row>
				<Col md={6} className="mb-3">
					<FoodOption 
						name={meal1Name} 
						url={meal1Image} 
						handleClick={()=>handleMealClick(1)}
					/>
				</Col>
				<Col md={6} className="mb-3">
					<FoodOption 
						name={meal2Name} 
						url={meal2Image} 
						handleClick={()=>handleMealClick(2)}
					/>				
				</Col>
			</Row>
			
		</Container>
	);
}

export default HomePage;