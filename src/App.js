import './App.css';
import { Route, Routes } from 'react-router-dom';
import ChampionList from './Components/ChampionList/ChampionList';
import Header from './Components/Header/Header';


function App() {
  return (
    <div>
      <Header />
        <Routes>
          <Route path="/" element={<ChampionList />} />
          {/* Add other routes here */}
        </Routes>
    </div>
  );
}

export default App;