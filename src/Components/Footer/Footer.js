import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__links">
        <a href="https://www.leagueoflegends.com/en-us/champions/" target="_blank" rel="noopener noreferrer" className="footer__link">
          Champion List - Official
        </a>
        <a href="https://leagueoflegends.fandom.com/wiki/League_of_Legends_Wiki" target="_blank" rel="noopener noreferrer" className="footer__link">
          LoL Wiki - Information and Statistics
        </a>
        <a href="https://na.op.gg/" target="_blank" rel="noopener noreferrer" className="footer__link">
          OP.GG - Summoner Stats and Tier List
        </a>
        <a href="https://www.probuilds.net/" target="_blank" rel="noopener noreferrer" className="footer__link">
          Probuilds - Pro Player Builds and Matchups
        </a>
        <a href="https://champion.gg/" target="_blank" rel="noopener noreferrer" className="footer__link">
          Champion.gg - Champion Statistics
        </a>
      </div>
      <div className="footer__copyright">
        &copy; {new Date().getFullYear()} LoL Draft Simulator. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
