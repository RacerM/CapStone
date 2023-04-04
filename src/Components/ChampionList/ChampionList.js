import './ChampionList.scss';
import axios from 'axios';

const ChampionList = ({ champions, version, loading, onBanChampion, currentSide }) => {

  const fetchChampionData = async () => {
    try {
      const response = await axios.get('http://ddragon.leagueoflegends.com/cdn/12.6.1/data/en_US/champion.json');
      const version = response.data.version;
      const data = response.data.data;
      return { version, data };
    } catch (error) {
      console.error('Failed to fetch champion data:', error);
      throw error;
    }
  };

    const handleChampionClick = (champion) => {
    // Call the onBanChampion function from the parent component
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
                  return (
                    <li className="champion__item" key={champion.key}>
                      <img
                        className="champion__sprite"
                        src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.image.full}`}
                        alt={champion.name}
                        onClick={() => handleChampionClick(champion)}
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
