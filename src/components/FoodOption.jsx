export default function FoodOption({ name, url, handleClick }) {
    return (
      <>
        <h2>{name}</h2>
        <button  className="btn btn-select" type="button" onClick={handleClick}>✓</button>
        <img src={url} alt={name} style={{ maxHeight: "300px" }} />
        
      </>
    );
  }