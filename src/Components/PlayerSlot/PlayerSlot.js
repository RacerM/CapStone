import './PlayerSlot.scss';

const PlayerSlot = ({ imageUrl, name, playerNumber, pickedChampion }) => {
  return (
    <div className="player-slot">
      {imageUrl && (
        <img
          className="player-slot__icon"
          src={imageUrl}
          alt={name}
        />
      )}
      {!imageUrl && <div className="placeholder"></div>}
      <div className="player-number">
        {pickedChampion
          ? `Player ${playerNumber} picked ${pickedChampion}`
          : `Player ${playerNumber}`}
      </div>
    </div>
  );
};


export default PlayerSlot;
