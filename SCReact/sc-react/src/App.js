import logo from './logo.svg';
import './App.css';
import bluemarble from './bluemarble.png'


import {Home} from './Home';
import {Post} from './Post';
import {Navigation} from './Navigation';

import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { LoadScreen } from './LoadingScreen';

function App() {
  return (
    <BrowserRouter>
    
     <div className="App-header">
        

      
      <div className='Marble-logo'>

        <img alt='marblelogo' src={bluemarble}/>
      </div> 

      <div className='Title-text'>
        <h3>Brand Comparison</h3>
      </div>
        

      <div className='Login-link'>
      Login
      
      </div>
      
        
        
      </div>
      
      
      
      <Routes>
          <Route path='/home' element={<Home/>} />
          <Route path='/post' element={<Post/>} />
          <Route path='/loading' element={<LoadScreen/>} />

      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
