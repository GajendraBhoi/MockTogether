import { Router, Route, Routes, BrowserRouter } from "react-router-dom"
import Landing from "./pages/Landing"
import { Login, Signup } from "./pages/Auth"
import About from "./pages/About"
import Navbar from "./component/Navbar"
import Profile from "./pages/Profile"
import CreateRoom from "./pages/Room/CreateRoom"
import RoomPage from "./pages/Room/RoomPage"

function App() {

  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      {/* padding for different screen sizes */}

      {/* adding navbar here so it is available for evevry page  */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/room" element={<RoomPage />} />
        <Route path="/crateRoom" element={<CreateRoom />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

      </Routes>
    </div>
  )
}

export default App
