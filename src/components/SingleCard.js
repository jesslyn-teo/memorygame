import "./SingleCard.css";

function SingleCard({ card, handleChoice }) {
  // handling the image selection 
  const handleClick = () => {
    handleChoice(card);
  }

  return (
    <div className="card">
      <div>
        <img className="front" src={card.src} alt="card front" />
        <img
          className="back"
          src="/img/coverimg.png"
          onClick={handleClick}
          alt="card back"
        />
      </div>
    </div>
  );
}

export default SingleCard;
