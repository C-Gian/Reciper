import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Auth, MyRecipes, CreateRecipe } from "./pages";
import { Navbar, Topbar } from "./components";

function App() {
  return (
    <div className="App">
      <Router>
        <Topbar></Topbar>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/my-recipes" element={<MyRecipes />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
