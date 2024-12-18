import { useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard.js';

// paths for the image cards
const imageCards = [
  { "src": "/img/carnation.png" },
  { "src": "/img/cherryblossom.png" },
  { "src": "/img/chrysanthemum.png" },
  { "src": "/img/iris.png" },
  { "src": "/img/lily.png" },
  { "src": "/img/poppy.png" },
]

function App() {
  const [cards, setCards] = useState([]);
  const [turnCount, setTurnCount] = useState(0);

  // used to duplicate , duplicate and identify the cards
  const shuffleCards = () => {
    const shuffledCards = [...imageCards, ...imageCards] 
      .sort(() => Math.random() - 0.5) 
      .map((card) => ({ ...card, id: Math.random() }))

    setCards(shuffledCards);
    setTurnCount(0);
  }

  console.log(cards, turnCount);


  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}

export default App;
