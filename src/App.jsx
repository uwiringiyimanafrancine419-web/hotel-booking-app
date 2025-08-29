import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  SignUp from './Pages/Auth/signUp';
import  Login from './Pages/Auth/login';
import  Home from './Pages/Customer/Home'; 

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
