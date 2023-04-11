import React, { useState } from "react";
import "./ChampionList.scss";
import ChampionInfoModal from "../ChampionInfoModal/ChampionInfoModal";

const ChampionList = ({
  champions,
  version,
  loading,
  onBanChampion,
  currentSide,
  bannedChampions,
  pickPhase,
  onSelectChampion,
  selectedChampions,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedChampion, setSelectedChampion] = useState(null);

  const getUniqueTags = () => {
    const tags = new Set();
    champions.forEach((champion) =>
      champion.tags.forEach((tag) => tags.add(tag))
    );
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
    const matchesSearch = champion.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesTag =
      selectedTag === "" || champion.tags.includes(selectedTag);

    return matchesSearch && matchesTag;
  };

  return (
    <div className="champion">
      <div className="champion__container">
        <div className="champion__list">
            <input
              className="champion__search"
              type="text"
              placeholder="Search champions"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="champion__filter"
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
                <div className="champion__flex">
                  {console.log(champions)}
                  {champions &&
                    champions
                      .filter(filterChampions)
                      .map((champion) => {
                        const isBanned =
                          bannedChampions.blueSide.includes(champion) ||
                          bannedChampions.redSide.includes(champion);
                        const isPicked =
                          selectedChampions.blueSide.some(
                            (selectedChamp) =>
                              selectedChamp && selectedChamp.key === champion.key
                          ) ||
                          selectedChampions.redSide.some(
                            (selectedChamp) =>
                              selectedChamp && selectedChamp.key === champion.key
                          );
                        return (
                          <li
                            className="champion__item"
                            key={champion.key}
                            onClick={() => handleChampionClick(champion)}
                          >
                            <img
                              className={`champion__sprite${
                                isBanned || isPicked
                                  ? " champion__item--banned"
                                  : ""
                              }`}
                              src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.image.full}`}
                              alt={champion.name}
                            />
                            {champion.name}
                            <span
                              className="champion__info-icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedChampion(champion);
                              }}
                            >
                              ⓘ
                            </span>
                          </li>
                        );
                      })}
                </div>
              </ul>
          )}
        </div>
        <ChampionInfoModal
          champion={selectedChampion}
          onClose={() => setSelectedChampion(null)}
        />
      </div>
    </div>
  );
};

export default ChampionList;
