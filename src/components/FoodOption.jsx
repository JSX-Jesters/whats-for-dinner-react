export default function FoodOption({ name, url, handleClick }) {
    return (
      <>
        <h2>{name}</h2>
        <img src={url} alt="" style={{ maxHeight: "300px" }} />
        <button type="button" onClick={handleClick}>
          ✓
        </button>
      </>
    );
  }