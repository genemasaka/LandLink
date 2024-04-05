import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Header from "./components/header";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return <BrowserRouter>
  <Header />
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/sign-in" element={<Signin />} />
    <Route path="/signup" element={<Signup />} />
    <Route element={<PrivateRoute />} >
    <Route path="/profile" element={<Profile />} />
    </Route>
    <Route path="/about" element={<About />} />
    
  </Routes>
  </BrowserRouter>
}