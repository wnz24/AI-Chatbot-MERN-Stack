import Header from "./components/Header"
import { Routes ,Route} from "react-router-dom"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import Home from "./Pages/Home"
import Chat from "./Pages/Chat"
import NotFound from "./Pages/NotFound"
function App() {
  return <main>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/chat" element={<Chat/>} />
      <Route path="*" element={<NotFound/>} />
    </Routes>

  </main>
}

export default App
