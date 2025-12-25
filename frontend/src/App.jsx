import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Help from "./pages/Help";
import User from "./pages/Users";
import Report from "./pages/Report";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reg" element={<Registration />} />

        <Route element={<Navbar />} >
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/help" element={<Help />} />
          <Route path="/reports" element={<Report />} />
          <Route path="/users" element={<User />} />
        </Route>

      </Routes>
    </div>
  )
}

export default App;