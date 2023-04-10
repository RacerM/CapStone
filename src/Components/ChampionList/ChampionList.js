import React, { useState } from 'react';
import './ChampionList.scss';

const ChampionList = ({ champions, version, loading, onBanChampion, currentSide, bannedChampions, pickPhase, onSelectChampion, selectedChampions }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  const getUniqueTags = () => {
    const tags = new Set();
    champions.forEach((champion) => champion.tags.forEach((tag) => tags.add(tag)));
    return Array.from(tags);
  };

  const handleChampionClick = (champion) => {
    if (!pickPhase) {
      onBanChampion(currentSide, champion);
    } else {
      onSelectChampion(currentSide, champion);
    }
  };

  const filterChampions = (champion) => {
    const matchesSearch = champion.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === '' || champion.tags.includes(selectedTag);

    return matchesSearch && matchesTag;
  };

  return (
    <div className='champion'>
      <div className='champion__container'>
        <div className="champion__list">
          <input
            className='champion__search'
            type="text"
            placeholder="Search champions"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className='champion__filter'
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
          >
            <option value="">All</option>
            {getUniqueTags().map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul>
              <div className='champion__flex'>
                {console.log(champions)}
                {champions &&
                  champions
                    .filter(filterChampions)
                    .map((champion) => {
                      const isBanned = bannedChampions.blueSide.includes(champion) || bannedChampions.redSide.includes(champion);
                      const isPicked = selectedChampions.blueSide.some(selectedChamp => selectedChamp && selectedChamp.key === champion.key) || selectedChampions.redSide.some(selectedChamp => selectedChamp && selectedChamp.key === champion.key);
                      return (
                        <li className="champion__item" key={champion.key} onClick={() => handleChampionClick(champion)}>
                          <img
                            className={`champion__sprite${isBanned || isPicked ? " champion__item--banned" : ""}`}
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
