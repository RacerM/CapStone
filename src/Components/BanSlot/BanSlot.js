import React from "react";
import './BanSlot.scss';

const BanSlot = ({ imageUrl, name }) => {
  return (
    <div className="slot">
        {imageUrl && <img src={imageUrl} alt={name} className="ban-image" />}
    </div>
  );
};

export default BanSlot;