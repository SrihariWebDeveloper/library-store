import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Routes,Route} from 'react-router-dom'
import Sidebar from '../src/componts/sidebar/Sidebar.js'
import Navbar from './componts/navBar/Navbar.js';
import Add from './componts/add/Add.js';
import List from './componts/list/List.js';
import AddW from './componts/addWriters/addW.js';
import WriterList from './componts/writerslist/Writerlist.js'


const App = () => {
  const url = 'http://localhost:5000'
  return (
    <div>
    <ToastContainer/>
    <Navbar/>
    <div className="app-conent">
      <Sidebar/>
      <Routes>
        <Route path='/add' element={<Add url={url}/>}/>
        <Route path='/list' element={<List url={url}/>}/>
        <Route path='/writers' element={<AddW url={url}/>} />
        <Route path='/writerslist' element={<WriterList url={url}/>} />
      </Routes>
    </div>
  </div>
  )
}

export default App
