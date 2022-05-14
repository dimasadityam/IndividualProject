// import logo from './logo.svg';
import './App.css';
import LandingPage from './Pages/LandingPage';
import "../src/App.css"
import { Routes, Route } from "react-router-dom"
// import NavbarComponent from "./Components/navbar";
import RegisterPage from './Pages/RegisterPage';
// import RegisterPagecopy3 from './Pages/RegisterPagecopy3'
import HomePage from './Pages/HomePage';
import ProfilePage from './Pages/ProfilePage';
import TesPage from './Pages/TesPage';

function App() {
  return (
    <div>
      {/* <NavbarComponent /> */}
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='tes' element={<TesPage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
