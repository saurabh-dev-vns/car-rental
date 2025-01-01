import { BrowserRouter,Route,Routes } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Models from "./Pages/Models";
import Testimonials from "./Pages/Testimonials";
import Navbar from "./components/Navbar/Navbar";
import Team from "./Pages/Team";
import Contact from "./Pages/Contact";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
function App() {
  return (
    <BrowserRouter>
  <Navbar />
    <Routes>
    <Route index path="/" element={<Home/>}/>
    <Route  path="/about" element={<About/>}/>
    <Route  path="/models" element={<Models/>}/>
    <Route  path="/testimonials" element={<Testimonials/>}/>
    <Route  path="/team" element={<Team/>}/>
    <Route  path="/contact" element={<Contact/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
