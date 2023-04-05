import React from "react";
import './BanSlot.scss';

const BanSlot = ({ imageUrl, name, side }) => {
  return (
    <div>
      <p>Banned</p>
      <div className={`slot ${side === "red" ? "red-side" : ""}`}>
        {imageUrl && <img src={imageUrl} alt={name} className="ban-image" />}
      </div>
    </div>
  );
};



export default BanSlot;