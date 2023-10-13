import { Col, Row } from "react-bootstrap";

export default function FoodOption({ name, url, handleClick, hideButton, recipe }) {
  return (
    <>
      <h3>{name}</h3>
      {/* Hides the tick button for Food Options when the winning meal is chosen */}
      {hideButton === true ? (
        <></>
      ) : (
        <>
          <button
            className="btn btn-select"
            type="button"
            onClick={handleClick}
          >
            ✓
          </button>
        </>
      )}
      <Row>
        {/* Centres the image for the food comparison and also the final meal */}
        <Col md={{ span: 6, offset: 3 }}>
          <img src={url} alt={name} style={{ maxHeight: "300px" }} />
        </Col>
      </Row>
      {/* Recipe is truthy when final meal is chosen, therefore it is displayed */}
      {recipe ? (
				<div className="description">
        <p>{recipe}</p>
        <p>
          {recipe.split("\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </p>
      </div>
      ) : (
        <></>
      )}
    </>
  );
}
