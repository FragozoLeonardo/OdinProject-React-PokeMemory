import React from 'react';
import '../styles/Scoreboard.css';

const Scoreboard = ({ score, bestScore }) => {
  return (
    <div className="scoreboard">
      <div>Revealed Cards : {score} </div>
      &nbsp;
      <div>Best Score : {bestScore} </div>
    </div>
  );
};

export default Scoreboard;