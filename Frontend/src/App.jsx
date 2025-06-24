import { Router, Route, Routes, BrowserRouter } from "react-router-dom"
import Landing from "./pages/Landing"
import Room from "./pages/Room"
import Auth from "./pages/Auth"
import Dashboard from "./pages/Dashboard"
import About from "./pages/About"
import Navbar from "./component/Navbar"
import Profile from "./pages/Profile"

function App() {

  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      {/* padding for different screen sizes */}

      {/* adding navbar here so it is available for evevry page  */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/room" element={<Room />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/auth" element={<Auth />} />

      </Routes>
    </div>
  )
}

export default App
