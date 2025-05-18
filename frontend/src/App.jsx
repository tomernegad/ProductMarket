import Navbar from "./components/Navbar";
import {Routes,Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
function App() {
  return (
   <div className="min-h-screen bg-base-200 transition-colors duaration-300">
      <Navbar/>
      <Routes>
        <Route path="/" element = {<HomePage/>} />
      </Routes>
     </div>
  )
}

export default App
