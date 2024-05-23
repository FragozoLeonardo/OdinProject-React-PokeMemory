import React from 'react';
import '../styles/Card.css';

const Card = ({ pokemon, onClick, isFlipped }) => {
  return (
    <div className="card" onClick={() => onClick(pokemon)}>
      {isFlipped ? <img src={pokemon.image} alt={pokemon.name} /> : <div className="card-back">PokéMemory</div>}
    </div>
  );
};

export default Card;
