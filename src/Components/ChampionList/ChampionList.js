import './ChampionList.scss';

const ChampionList = ({ champions, version, loading, onBanChampion, currentSide, bannedChampions}) => {

  const handleChampionClick = (champion) => {
      onBanChampion(currentSide, champion);
  };


  return (
    <div className='champion'>
      <div className='champion__container'>
        <div className="champion__list">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul>
              <div className='champion__flex'>
                {champions &&
                  champions.map((champion) => {
                    const isBanned = bannedChampions[champion.key] !== undefined;
                    return (
                      <li className="champion__item" key={champion.key} onClick={() => handleChampionClick(champion)}>
                        <img
                          className={`champion__sprite${isBanned ? " champion__item--banned" : ""}`}
                          src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.image.full}`}
                          alt={champion.name}
                        />
                        {champion.name}
                      </li>
                    );
                  })}
              </div>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChampionList;
