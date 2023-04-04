import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './Components/Header/Header';
import ChampionSelect from './Pages/ChampionSelect/ChampionSelect';


function App() {
  return (
    <div>
      <Header />
        <Routes>
          <Route path="/" element={<ChampionSelect />} />
          {/* Add other routes here */}
        </Routes>
    </div>
  );
}

export default App;