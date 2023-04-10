import React, { useState, useEffect } from 'react';
import './App.css';
import ChampionSelect from './Pages/ChampionSelect/ChampionSelect';
import Intro from './Pages/Intro/Intro';
import DraftHistory from './Components/DraftHistory/DraftHistory';

function App() {
  const [currentPath, setCurrentPath] = useState('/intro');

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const handleNext = () => {
    window.history.pushState(null, '', '/champselect');
    setCurrentPath('/champselect');
  };

  const handleShowDraftHistory = () => {
    window.history.pushState(null, '', '/DraftHistory');
    setCurrentPath('/DraftHistory');
  };

  const saveDraft = (draft) => {
    // Retrieve the current list of saved drafts from the localStorage
    const storedDrafts = localStorage.getItem('drafts');
    const drafts = storedDrafts ? JSON.parse(storedDrafts) : [];

    // Add the new draft to the list of saved drafts
    drafts.push(draft);

    // Save the updated list of drafts back to the localStorage
    localStorage.setItem('drafts', JSON.stringify(drafts));
  };

  return (
    <div className="App">
      {currentPath === '/intro' ? (
        <Intro onNext={handleNext} />
      ) : currentPath === '/DraftHistory' ? (
        <DraftHistory />
      ) : (
        <ChampionSelect onShowDraftHistory={handleShowDraftHistory} onSaveDraft={saveDraft} />
      )}
    </div>
  );
}
export default App;
