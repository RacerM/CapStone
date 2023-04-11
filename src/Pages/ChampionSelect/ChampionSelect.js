import React from 'react';
import ChampionList from '../../Components/ChampionList/ChampionList';
import PlayerSlot from '../../Components/PlayerSlot/PlayerSlot';
import BanSlot from '../../Components/BanSlot/BanSlot';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import axios from 'axios';
import { useState, useEffect} from 'react';
import './ChampionSelect.scss';

const ChampionSelect = (props) => {

  const [champions, setChampions] = useState([]);
  const [version, setVersion] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentSide, setCurrentSide] = useState("blueSide");
  const [selectedChampions, setSelectedChampions] = useState({
    blueSide: [null, null, null, null, null],
    redSide: [null, null, null, null, null],
  });
  const [currentDraft, setCurrentDraft] = useState({bannedChampions: {}, selectedChampions: {}});
  const [pickPhase, setPickPhase] = useState(false);
  const [bannedChampions, setBannedChampions] = useState({
    blueSide: [],
    redSide: []
  });
  
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

  useEffect(() => {
    setCurrentDraft({
      timestamp: new Date(),
      bannedChampions: bannedChampions,
      selectedChampions: selectedChampions,
    });
  }, [bannedChampions, selectedChampions]);

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


  const handleBanChampion = (side, champion) => {
    setBannedChampions((prevBannedChampions) => {
      // Check if the champion is already banned by the same team
      if (prevBannedChampions[side].includes(champion)) {
        return prevBannedChampions;
      }

      // Check if the current team has already banned 5 champions
      if (prevBannedChampions[side].length >= 5) {
        return prevBannedChampions;
      }

      const updatedBannedChampions = {
        ...prevBannedChampions,
        [side]: [...prevBannedChampions[side], champion],
      };

      // If there are 10 banned champions, switch to the pick phase
      if (
        updatedBannedChampions.blueSide.length + updatedBannedChampions.redSide.length >= 10
      ) {
        setPickPhase(true);
      }

      return updatedBannedChampions;
    });
  };

  const handleSelectChampion = (side, champion) => {
    setSelectedChampions((prevSelectedChampions) => {
      // Check if the champion is already picked by the same team
      if (prevSelectedChampions[side].includes(champion)) {
        return prevSelectedChampions;
      }

      // Check if the champion is in the banned list
      if (
        bannedChampions.blueSide.includes(champion) ||
        bannedChampions.redSide.includes(champion)
      ) {
        return prevSelectedChampions;
      }

      // Find the first available slot and place the selected champion
      const slotIndex = prevSelectedChampions[side].findIndex((champ) => champ === null);
      if (slotIndex !== -1) {
        const updatedSelectedChampions = {
          ...prevSelectedChampions,
          [side]: [...prevSelectedChampions[side]]
        };
        updatedSelectedChampions[side][slotIndex] = champion;
        return updatedSelectedChampions;
      } else {
        // If no available slot is found, return the previous state
        return prevSelectedChampions;
      }
    });
  };

  const toggleSide = () => {
    setCurrentSide((prevSide) => (prevSide === "blueSide" ? "redSide" : "blueSide"));
  };

  const togglePickPhase = () => {
  setPickPhase((prevPickPhase) => !prevPickPhase);
  };

  return (
    <div>
        <Header />
      <div className="champion-select">
        <div className="team-section left-section">
          <div className="ban-slots blue-side">
            {[...Array(5)].map((_, index) => {
                const champion = bannedChampions.blueSide[index];
                return (
                <BanSlot
                    key={index}
                    imageUrl={champion ? `http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.image.full}` : null}
                    name={champion ? champion.name : null}
                    side="blue"
                />
                );
            })}
          </div>
          <div className="player-slots">
            <div className="player-slots-title">Player Picks</div>
            {[...Array(5)].map((_, index) => (
              <PlayerSlot
                key={index}
                imageUrl={
                  selectedChampions.blueSide[index]
                    ? `http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${selectedChampions.blueSide[index].image.full}`
                    : null
                }
                name={selectedChampions.blueSide[index] ? selectedChampions.blueSide[index].name : null}
                playerNumber={index + 1}
                pickedChampion={selectedChampions.blueSide[index] ? selectedChampions.blueSide[index].name : null}
              />
            ))}
          </div>
        </div>
        <button
          className={`toggle-button ${currentSide === "blueSide" ? "blue-side" : "red-side"}`}
          onClick={toggleSide}
          >
          Toggle Side
        </button>
        <button onClick={togglePickPhase} className="toggle-button">
          Toggle Phase: {pickPhase ? "Pick" : "Ban"}
        </button>
        <button onClick={props.onShowDraftHistory} className="toggle-button">View Draft History</button>
        <button onClick={() => props.onSaveDraft(currentDraft)} className="toggle-button">Save Draft</button>
          <ChampionList
            pickPhase={pickPhase}
            onSelectChampion={handleSelectChampion}
            champions={champions}
            version={version}
            loading={loading}
            onBanChampion={handleBanChampion}
            currentSide={currentSide}
            bannedChampions={bannedChampions}
            selectedChampions={selectedChampions}
          />
        <div className="team-section right-section">
          <div className="ban-slots red-side">
            {[...Array(5)].map((_, index) => {
                const champion = bannedChampions.redSide[index];
                return (
                <BanSlot
                    key={index}
                    imageUrl={champion ? `http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.image.full}` : null}
                    name={champion ? champion.name : null}
                    side="red"
                />
                );
            })}
          </div>
          <div className="player-slots">
            <div className="player-slots-title">Player Picks</div>
            {[...Array(5)].map((_, index) => (
                <PlayerSlot
                  key={index}
                  imageUrl={
                    selectedChampions.redSide[index]
                      ? `http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${selectedChampions.redSide[index].image.full}`
                      : null
                  }
                  name={selectedChampions.redSide[index] ? selectedChampions.redSide[index].name : null}
                  playerNumber={index + 1}
                  pickedChampion={selectedChampions.redSide[index] ? selectedChampions.redSide[index].name : null}
                />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ChampionSelect;