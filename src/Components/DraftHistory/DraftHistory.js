import React, { useState, useEffect } from 'react';
import './DraftHistory.scss';

function DraftHistory({ version }) {
  const [drafts, setDrafts] = useState([]);

  useEffect(() => {
    const storedDrafts = JSON.parse(localStorage.getItem('drafts')) || [];
    setDrafts(storedDrafts);
  }, []);

  const handleDeleteDraft = (index) => {
  // Remove the draft from the drafts array
  const updatedDrafts = drafts.filter((_, draftIndex) => draftIndex !== index);

  // Update the localStorage
  localStorage.setItem("drafts", JSON.stringify(updatedDrafts));

  // Update the drafts state
  setDrafts(updatedDrafts);
    };
return (
  <div className="draft-history">
    <div className="draft-history__container">
      {drafts.map((draft, index) => (
        <div key={index} className="draft-history__item">
          <div className="draft-history__content">
            <h3>Draft {index + 1}</h3>
            <h4>{new Date(draft.timestamp).toLocaleString()}</h4>

            <div className="draft-history__banned-champions">
              <div className="draft-history__blue-side">
                <h5>Blue Side Bans:</h5>
                <div className="draft-history__bans">
                  {draft.bannedChampions?.blueSide?.map((champion, idx) => (
                    <div key={idx} className="draft-history__champion">
                      <img
                        className="draft-history__sprite"
                        src={`http://ddragon.leagueoflegends.com/cdn/12.6.1/img/champion/${champion.image.full}`}
                        alt={champion.name}
                      />
                      <span>{champion.name}</span>
                    </div>
                  ))}
                </div>
                <h5>Blue Side Picks:</h5>
                <div className="draft-history__picks">
                  {draft.selectedChampions?.blueSide?.map((champion, idx) => (
                    <div key={idx} className="draft-history__champion">
                      <img
                        className="draft-history__sprite"
                        src={`http://ddragon.leagueoflegends.com/cdn/12.6.1/img/champion/${champion.image.full}`}
                        alt={champion.name}
                      />
                      <span>{champion.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="draft-history__red-side">
                <h5>Red Side Bans:</h5>
                <div className="draft-history__bans">
                  {draft.bannedChampions?.redSide?.map((champion, idx) => (
                    <div key={idx} className="draft-history__champion">
                      <img
                        className="draft-history__sprite"
                        src={`http://ddragon.leagueoflegends.com/cdn/12.6.1/img/champion/${champion.image.full}`}
                        alt={champion.name}
                      />
                      <span>{champion.name}</span>
                    </div>
                  ))}
                </div>
                <h5>Red Side Picks:</h5>
                <div className="draft-history__picks">
                  {draft.selectedChampions?.redSide?.map((champion, idx) => (
                    <div key={idx} className="draft-history__champion">
                      <img
                        className="draft-history__sprite"
                        src={`http://ddragon.leagueoflegends.com/cdn/12.6.1/img/champion/${champion.image.full}`}
                        alt={champion.name}
                      />
                      <span>{champion.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="draft-history__button-container">
            <button onClick={() => handleDeleteDraft(index)} className="draft-history__delete">Delete</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}

export default DraftHistory;
