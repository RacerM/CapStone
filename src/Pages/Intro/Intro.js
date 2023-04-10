import React from 'react';
import IntroScreen from '../../Components/IntroScreen/IntroScreen';

const Intro = ({ onNext }) => {
  return (
    <div>
      <IntroScreen onNext={onNext} />
    </div>
  );
};

export default Intro;
