import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import About from "./pages/About";
import UpdateListing from "./pages/UpdateListing";
import Header from "./components/header";
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";

export default function App() {
  return <BrowserRouter>
  <Header />
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/sign-in" element={<Signin />} />
    <Route path="/signup" element={<Signup />} />
    <Route element={<PrivateRoute />} >
    <Route path="/profile" element={<Profile />} />
    <Route path="/create-listing" element={<CreateListing />} />
    <Route path="/update-listing/:listingId" element={<UpdateListing />} />

    </Route>
    <Route path="/about" element={<About />} />
    
  </Routes>
  </BrowserRouter>
}