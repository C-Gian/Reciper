import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Auth, MyRecipes, Recipe, CreateRecipe } from "./pages";
import { Header, Footer } from "./components";

function App() {
  return (
    <div className="App">
      <Router>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/my-recipes" element={<MyRecipes />} />
          <Route path="/recipe" element={<Recipe />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
        </Routes>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
