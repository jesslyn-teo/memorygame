import { useState, useEffect } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard.js";

// paths for the image cards
const imageCards = [
  { src: "/img/carnation.png", matched: false },
  { src: "/img/cherryblossom.png", matched: false },
  { src: "/img/chrysanthemum.png", matched: false },
  { src: "/img/iris.png", matched: false },
  { src: "/img/lily.png", matched: false },
  { src: "/img/poppy.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turnCount, setTurnCount] = useState(0);
  const [firstChoice, setFirstChoice] = useState(null);
  const [secondChoice, setSecondChoice] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // used to duplicate , duplicate and identify the cards
  const shuffleCards = () => {
    const shuffledCards = [...imageCards, ...imageCards]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurnCount(0);
  };

  // handles image card choice
  const handleChoice = (card) => {
    firstChoice ? setSecondChoice(card) : setFirstChoice(card);
  };

  // comparing cards 
  useEffect(() => {
    if(firstChoice && secondChoice) {
      setDisabled(true); 
      
      if(firstChoice.src === secondChoice.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === firstChoice.src) {
              return {...card, matched: true};
            } else {
              return card;
            }
          })
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [firstChoice, secondChoice])

  // reset choices and increase turn count 
  const resetTurn = () => {
    setFirstChoice(null);
    setSecondChoice(null);
    setTurnCount(prevTurns => prevTurns + 1);
    setDisabled(false);
  }

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard 
            key={card.id} 
            card={card} 
            handleChoice={handleChoice} 
            flipped={card === firstChoice || card === secondChoice || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
