import React from 'react';
import { useState, useEffect } from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import './ChampionInfoModal.scss';

const formatChartData = (championInfo) => {
  return [
    { attribute: 'Attack', value: championInfo.attack },
    { attribute: 'Defense', value: championInfo.defense },
    { attribute: 'Magic', value: championInfo.magic },
    { attribute: 'Difficulty', value: championInfo.difficulty },
  ];
};

const ChampionInfoModal = ({ champion, onClose }) => {
  const [abilities, setAbilities] = useState([]);
  const [currentSkinIndex, setCurrentSkinIndex] = useState(0);
  const [selectedAbilityIndex, setSelectedAbilityIndex] = useState(0);
  const [championLore, setChampionLore] = useState("");
  const [championSkins, setChampionSkins] = useState([]);

  const fetchChampionAbilities = async (championId) => {
    const version = "12.6.1";
    const language = "en_US";
    const response = await fetch(
      `https://ddragon.leagueoflegends.com/cdn/${version}/data/${language}/champion/${championId}.json`
    );
    const data = await response.json();
    const championData = data.data[championId];
    const championSkins = championData.skins;
    setAbilities(championData.spells);
    setChampionLore(championData.lore);
    setChampionSkins(championData.skins);
  };
  
  useEffect(() => {
    if (champion) {
      fetchChampionAbilities(champion.id);
    }
  }, [champion]);

  useEffect(() => {
    setCurrentSkinIndex(0);
  }, [champion]);

  const nextSkin = () => {
    setCurrentSkinIndex((currentSkinIndex + 1) % championSkins.length);
  };

  const prevSkin = () => {
    setCurrentSkinIndex(
      (currentSkinIndex - 1 + championSkins.length) % championSkins.length
    );
  };

  if (!champion) return null;

return (
  <div className="modal" onClick={onClose}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <div className="modal-champion-info">
        <div className="modal-champion-image" style={{ display: "flex", alignItems: "center" }}>
          <button className="modal-champion-image__arrow left" onClick={prevSkin}>{"<"}</button>
          <img src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_${currentSkinIndex}.jpg`} alt={champion.name} />
          <button className="modal-champion-image__arrow right" onClick={nextSkin}>{">"}</button>
        </div>
        <div className="modal-champion-details">
          <h2 className='champion-name'>
            {championSkins[currentSkinIndex] && championSkins[currentSkinIndex].name !== "default"
              ? championSkins[currentSkinIndex].name
              : champion.name}
          </h2>         
          <h3>{champion.title}</h3>
          <p>{championLore}</p>
        </div>
      </div>
      <div className="abilities">
        <div className="ability-icons">
          {abilities.map((ability, index) => (
            <img
              key={index}
              className={`ability-icon ${index === selectedAbilityIndex ? "selected" : ""}`}
              src={`https://ddragon.leagueoflegends.com/cdn/12.6.1/img/spell/${ability.image.full}`}
              alt={ability.name}
              onClick={() => setSelectedAbilityIndex(index)}
            />
          ))}
        </div>
        {abilities[selectedAbilityIndex] && (
          <div className="ability-info">
            <h4>{abilities[selectedAbilityIndex].name}</h4>
            <p>{abilities[selectedAbilityIndex].description}</p>
          </div>
        )}
      </div>
      <RadarChart
        cx={200}
        cy={150}
        outerRadius={100}
        width={400}
        height={300}
        data={formatChartData(champion.info)}
      >
        <PolarGrid />
        <PolarAngleAxis dataKey="attribute" />
        <PolarRadiusAxis angle={30} domain={[0, 10]} />
        <Radar
          dataKey="value"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
      </RadarChart>
    </div>
  </div>
);
};

export default ChampionInfoModal;
