import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Personagens from "./pages/Personagens";
import DetalhesPersonagem from "./pages/DetalhesPersonagem";
import DetalhesPlaneta from "./pages/DetalhesPlaneta";
import DetalhesFilme from "./pages/MovieDetails";
import DetalhesVeiculo from "./pages/DetalhesVeiculo";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Router>
        <Routes>
          <Route path="/" element={<Personagens />} />
          <Route path="/personagens/:id" element={<DetalhesPersonagem />} />
          <Route path="/planetas/:id" element={<DetalhesPlaneta />} />
          <Route path="/filmes/:id" element={<DetalhesFilme />} />
          <Route path="/veiculos/:id" element={<DetalhesVeiculo />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
