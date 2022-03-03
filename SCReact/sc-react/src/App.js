import logo from './logo.svg';
import './App.css';
import bluemarble from './Icons/bluemarble.png'


import {Home} from './Home';
import {Post} from './Post';
import {Navigation} from './Navigation';

import {BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { LoadScreen } from './LoadingScreen';

function App() {
  return (
    <BrowserRouter>
    
     <div className="App-header">

          <div className='Marble-logo'>
              <img alt='marblelogo' src={bluemarble}/>
          </div> 

          <div className='Title-text'>
              <h3>Social Media Comparison</h3>
          </div>
          <div className='Login-link'>Login</div>
      </div>
      <Routes>
          <Route path='/home' element={<Home/>} />
          <Route path='/post' element={<Post/>} />
          <Route path='/loading' element={<LoadScreen/>} />
          <Route path="" element={<Navigate replace to ="/home" />} />
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
