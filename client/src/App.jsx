import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Home,
  Auth,
  MyRecipes,
  Recipe,
  CreateRecipe,
  SearchRecipes,
} from "./pages";
import { Header, Footer } from "./components";

function App() {
  return (
    <div className="App">
      <Router>
        <Header></Header>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Home />} />
          <Route path="/random-recipes" element={<Home />} />
          <Route path="/my-recipes" element={<MyRecipes />} />
          <Route path="/search-recipes" element={<SearchRecipes />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/recipe" element={<Recipe />} />
        </Routes>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
