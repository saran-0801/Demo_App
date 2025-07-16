import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Components/RegisterPage';
import Login from './Components/login';
import Home from './Components/home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element = {<Home/>} />
      </Routes>
    </Router>
  );
}

export default App;
