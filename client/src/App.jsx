import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Auth,
  Profile,
  Home,
  Explore,
  Notifications,
  Messages,
  MyRecipes,
  CreateRecipe,
  Recipe,
} from "./pages";
import { LeftBar, RightBar } from "./components";

function App() {
  return (
    <div className="App">
      <Router>
        <LeftBar></LeftBar>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/my-recipes" element={<MyRecipes />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/recipe" element={<Recipe />} />
        </Routes>
        <RightBar></RightBar>
      </Router>
    </div>
  );
}

export default App;
