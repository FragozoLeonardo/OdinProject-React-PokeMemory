import React, { useEffect, useState, useCallback } from 'react';
import Card from './Card';
import Scoreboard from './Scoreboard';
import '../styles/Game.css';

const Game = () => {
  const [pokemons, setPokemons] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const fetchPokemons = useCallback(async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=6');
    const data = await response.json();
    const loadedPokemons = await Promise.all(
      data.results.map(async (item) => {
        const res = await fetch(item.url);
        const pokemonData = await res.json();
        return {
          id: pokemonData.id,
          name: pokemonData.name,
          image: pokemonData.sprites.front_default,
        };
      })
    );
    const pairedPokemons = [...loadedPokemons, ...loadedPokemons].map((pokemon, index) => ({
      ...pokemon,
      uniqueId: index,
    }));
    shuffleCards(pairedPokemons);
  }, []);

  const shuffleCards = (cards) => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setPokemons(shuffled);
  };

  useEffect(() => {
    fetchPokemons();
  }, [fetchPokemons]);

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
    }
  }, [score, bestScore]);

  const handleCardClick = (clickedPokemon) => {
    if (
      flippedCards.length === 2 ||
      flippedCards.some(card => card.uniqueId === clickedPokemon.uniqueId) ||
      matchedCards.includes(clickedPokemon.id)
    ) {
      return;
    }

    setFlippedCards((prevFlipped) => {
      const newFlipped = [...prevFlipped, clickedPokemon];
      if (newFlipped.length === 2) {
        if (newFlipped[0].id === newFlipped[1].id) {
          setMatchedCards((prevMatched) => [...prevMatched, newFlipped[0].id]);
          setScore((prevScore) => prevScore + 1);
        }
        setTimeout(() => setFlippedCards([]), 1000);
      }
      return newFlipped;
    });
  };

  return (
    <div className="game">
      <Scoreboard score={score} bestScore={bestScore} />
      <div className="card-container">
        {pokemons.map((pokemon) => (
          <Card
            key={pokemon.uniqueId}
            pokemon={pokemon}
            onClick={() => handleCardClick(pokemon)}
            isFlipped={flippedCards.includes(pokemon) || matchedCards.includes(pokemon.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Game;
