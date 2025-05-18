import themes from "daisyui/theme/object";
import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import { useThemeStore } from "./store/useThemeStore";

import { Routes, Route } from "react-router-dom";

function App() {
    const { theme } = useThemeStore();
  return (
    <div className="min-h-screen bg-base-200 transition-colors duration-200" data-theme ={theme}>
      <Navbar />

      <Routes>
       <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>

    </div>
  );
}

export default App;