import Login from "./pages/login"
import { Routes, Route } from "react-router-dom"
import Verify from "./pages/verify"
import NotFound from "./pages/notfound/Notfound"
import Instructor from "./pages/instructor-profile"
import LandingPage from "./pages/instructor-profile/LandingPage"
import LoginUser from "./pages/user/login"
import VerifyUser from "./pages/user/verify"
function App() {

  return (
    <>
      <Routes>
        <Route path="/instructor/login" element={<Login />} />
        <Route path="/instructor/verify" element={<Verify />} />
        <Route path="/instructor/profile" element={< Instructor />} />
        <Route path="/instructor" element={< LandingPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/user/login" element={<LoginUser />} />
        <Route path="/user/verify" element={<VerifyUser />} />
        
      </Routes>
    </>
  )
}

export default App
