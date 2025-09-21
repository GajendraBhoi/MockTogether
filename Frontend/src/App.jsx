import { Router, Route, Routes, BrowserRouter } from "react-router-dom"
import Landing from "./pages/Landing"
import { Login, Signup } from "./pages/Auth"
import About from "./pages/About"
import Navbar from "./component/Navbar"
import Profile from "./pages/Profile"
import CreateRoom from "./pages/Room/CreateRoom"
import RoomPage from "./pages/Room/RoomPage"
import { Toaster } from "react-hot-toast"

function App() {

  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">

    <div>
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 4000,
        success: {
          style: {
            background: '#001F8F',
            color: '#ffffff',
            boxShadow: '0 6px 18px rgba(14,165,233,0.18)'
          },
          iconTheme: {
            primary: '#0369a1',
            secondary: '#ffffff'
          }
        },
        error: {
          style: {
            background: '#ef4444',
            color: '#ffffff'
          },
          iconTheme: {
            primary: '#b91c1c',
            secondary: '#ffffff'
          }
        }
      }}
    />
    </div>


      {/* padding for different screen sizes */}

      {/* adding navbar here so it is available for evevry page  */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/room/:roomId" element={<RoomPage />} />
        <Route path="/crateRoom" element={<CreateRoom />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

      </Routes>
    </div>
  )
}

export default App
