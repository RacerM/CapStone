import './BanSlot.scss';

const BanSlot = ({ imageUrl, name, side }) => {
  return (
    <div>
      <p>Banned</p>
      <div className={`ban-slot ${side}`}>
        {imageUrl && (
          <>
            <img src={imageUrl} alt={name} className="champion-image" />
            <div className="banned-icon" >🚫</div>
          </>
        )}
      </div>
    </div>
  );
};

export default BanSlot;