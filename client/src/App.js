import './App.css';
import Homepage from './Pages/Homepage';
import {Routes, Route} from 'react-router-dom';
import CricketPage from './Pages/CricketPage';
import Register from './admin/pages/Register';
import Login from './admin/pages/Login';
import Dashboard from './admin/pages/Dashboard';
import Football from './Pages/Football';
import Vollyball from './Pages/Vollyball';
import Chess from './Pages/ChessPage';
import Tennis from './Pages/Tennis';
import Badminton from './Pages/Badminton';
import EmailAlert from './components/EmailAlert';
import Help from './Pages/Help';
import Remainder from './admin/pages/Remainder';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <Homepage />} />
        <Route path='/auth/admin/with-my-permission-register' element={<Register />} />
        <Route path='/auth/admin/login' element={<Login />} />
        <Route path='/cricket' element={<CricketPage />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/football' element={<Football />} />
        <Route path='/vollyball' element={<Vollyball />} />
        <Route path='/chess' element={<Chess />} />
        <Route path='/tennis' element={<Tennis />} />
        <Route path='/badminton' element={<Badminton />} />
        <Route path='/subscribe' element={<EmailAlert />} />
        <Route path='/help' element={<Help />} />
        <Route path='/admin/remainder' element={<Remainder />} />
      </Routes>
    </div>
  );
}

export default App;

