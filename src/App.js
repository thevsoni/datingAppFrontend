import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';

import HomeScreen from './screens/HomeScreen';
import LandingScreen from './screens/LandingScreen';
import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
import TalkingScreen from './screens/TalkingScreen';
import ProfileScreen from './screens/ProfileScreen';
import FriendsPending from './screens/FriendsPending';
import Friends from './screens/Friends';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>

          <Route path='/' exact Component={LandingScreen} />
          <Route path='/home' exact Component={HomeScreen} />
          <Route path='/signup' exact Component={SignupScreen} />
          <Route path='/login' exact Component={LoginScreen} />
          <Route path='/profile' exact Component={ProfileScreen} />
          <Route path='/friendsPending' exact Component={FriendsPending} />
          <Route path='/friends' exact Component={Friends} />
          <Route path='/talkingRoom/:providerId' exact Component={TalkingScreen} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
