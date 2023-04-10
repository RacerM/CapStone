// src/Components/IntroScreen/IntroScreen.js
import React from 'react';
import './IntroScreen.scss';

const IntroScreen = ({ onNext }) => {
  return (
    <div className="intro-screen">
      <div className="intro-screen__content">
        <h1>Welcome to League of Legends Champion Select!</h1>
            <p>
            Welcome! This interactive experience simulates the champion selection process in the popular online game, League of Legends. In this game, players are divided into two teams and take turns banning and choosing champions (characters) to play as during the match. Each champion has unique abilities and strategies, so the selection process is an essential part of the gameplay.  Tradiontally each player bans one champion and then the pick phase starts going in an order of 1-2-2-1, alternating sides until all players have chosen.  But for the purpose of this application you have control of who can pick what in what order!  <br></br> Click "Next" to begin the champion selection process!
            </p>
        <button className="intro-screen__next-button" onClick={onNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default IntroScreen;
