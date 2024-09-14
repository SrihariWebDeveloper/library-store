import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import {Routes,Route} from 'react-router-dom'
import Homiee from '../src/pages/Homiee/Homiee.js'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Save from '../src/pages/saved/save.js'
import { useState } from 'react';

function App() {
  const [Savedata,SetSaveData] = useState([])
  return (
    <div className="App">
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Homiee Savedata={Savedata} SetSaveData={SetSaveData}/>}/>
        <Route path='/save' element={<Save Savedata={Savedata} SetSaveData={SetSaveData}/>}/>
      </Routes>
    </div>
  );
}

export default App;
