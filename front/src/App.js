import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from "./components/Navigation";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Exercises from "./pages/Exercises";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Workouts from "./pages/Workouts";
import {Container} from "react-bootstrap";
import Footer from "./components/Footer";
import About from "./pages/About";

function App() {
  return (
    <>
      <Navigation />

        <Container>
            <div className="main">

                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/exercises" element={<Exercises />} />
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/workouts" element={<Workouts />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </Container>
        <Footer />
    </>
  );
}

export default App;