import React from 'react';
import './Header.scss';

const Header = () => {
  return (
    <header className='header'>
        <div className='header__left'>
            <h2>Blue Side</h2>
        </div>
        <div className='header__right'>
            <h2>Red Side</h2>
        </div>
    </header>
  );
};

export default Header;
