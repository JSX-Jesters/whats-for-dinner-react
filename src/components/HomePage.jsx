import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import placeImage from "../images/placeholder.png";
import axios from "axios";

export function HomePage() {
	const [meal1Image, setMeal1Image] = useState(placeImage);
	const [meal2Image, setMeal2Image] = useState(placeImage);
	const [meal1Name, setMeal1Name] = useState("Meal 1");
	const [meal2Name, setMeal2Name] = useState("Meal 2");

	const handleStartClick = async () => {
		try {
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

			// Update state to display the fetched images
			setMeal1Image(meal1ImageUrl);
			setMeal2Image(meal2ImageUrl);
			setMeal1Name(meal1NameUrl);
			setMeal2Name(meal2NameUrl);
		} catch (error) {
			console.error("Error fetching meal images:", error);
		}
	};

	return (
		<Container>
			{/* Button to fetch random meal images */}
			<button className="btn btn-primary" onClick={handleStartClick}>
				Start
			</button>
			<Row>
				<Col md={6} className="mb-3">
					<h2>{meal1Name}</h2>
					<img
						src={meal1Image}
						alt=""
						style={{ maxHeight: "300px" }}
					/>
				</Col>
				<Col md={6} className="mb-3">
					<h2>{meal2Name}</h2>
					<img
						src={meal2Image}
						alt=""
						style={{ maxHeight: "300px" }}
					/>
				</Col>
			</Row>
		</Container>
	);
}

export default HomePage;
