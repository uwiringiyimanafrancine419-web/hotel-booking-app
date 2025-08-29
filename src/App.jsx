import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './pages/Autho/signUp';
import  Login from './pages/Autho/login';
import Home from './pages/Customers/Home'; // Example placeholder page

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Login/>} />
         <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home/>} />
      </Routes>
    
  );
}

export default App;
