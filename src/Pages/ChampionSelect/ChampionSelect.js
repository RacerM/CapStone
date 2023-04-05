import React from 'react';
import ChampionList from '../../Components/ChampionList/ChampionList';
import PlayerSlot from '../../Components/PlayerSlot/PlayerSlot';
import BanSlot from '../../Components/BanSlot/BanSlot';
import axios from 'axios';
import { useState, useEffect} from 'react';
import './ChampionSelect.scss';

const ChampionSelect = () => {

  const [champions, setChampions] = useState([]);
  const [version, setVersion] = useState('');
  const [loading, setLoading] = useState(true);

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

  const [bannedChampions, setBannedChampions] = useState({
    blueSide: [],
    redSide: []
  });

  const handleBanChampion = (side, champion) => {
  setBannedChampions((prevBannedChampions) => {
    // Check if the champion is already banned by the same team
    if (prevBannedChampions[side].includes(champion)) {
      return prevBannedChampions;
    }

    return {
      ...prevBannedChampions,
      [side]: [...prevBannedChampions[side], champion],
    };
  });
  };

  const [currentSide, setCurrentSide] = useState("blueSide");

  const toggleSide = () => {
    setCurrentSide((prevSide) => (prevSide === "blueSide" ? "redSide" : "blueSide"));
  };

  return (
    <div className="champion-select">
      <div className="team-section left-section">
      <div className="ban-slots">
        {[...Array(5)].map((_, index) => {
            const champion = bannedChampions.blueSide[index];
            return (
            <BanSlot
                key={index}
                imageUrl={champion ? `http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.image.full}` : null}
                name={champion ? champion.name : null}
            />
            );
        })}
      </div>
      <div className="player-slots">
          {[...Array(5)].map((_, index) => (
            <PlayerSlot key={index} />
          ))}
      </div>
      </div>
      <button onClick={toggleSide} className='toggle-button'>
        Toggle Side: {currentSide === "blueSide" ? "Blue" : "Red"}
      </button>
        <ChampionList
        champions={champions}
        version={version}
        loading={loading}
        onBanChampion={handleBanChampion}
        currentSide={currentSide}
        bannedChampions={bannedChampions}
        />
      <div className="team-section right-section">
      <div className="ban-slots">
        {[...Array(5)].map((_, index) => {
            const champion = bannedChampions.redSide[index];
            return (
            <BanSlot
                key={index}
                imageUrl={champion ? `http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.image.full}` : null}
                name={champion ? champion.name : null}
            />
            );
        })}
      </div>
        <div className="player-slots">
          {[...Array(5)].map((_, index) => (
            <PlayerSlot key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChampionSelect;