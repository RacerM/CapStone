import './ChampionList.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ChampionList = () => {
  const [champions, setChampions] = useState(null);
  const [version, setVersion] = useState('');
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { version, data } = await fetchChampionData();
        if (data) {
          setChampions(Object.values(data));
          setVersion(version);
        }
      } catch (error) {
        console.error('Failed to fetch champion data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='champion'>
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
  );
};

export default ChampionList;
