import { useEffect, useState } from "react";
import { useParams, Link, To } from "react-router-dom"; // Import useNavigate and Link
import { api } from "../services/api";

import Header from "../components/Header";
import { Globe2, Users, Cloud, Mountain } from "lucide-react";
import { IPlanet } from "../assets/@types";

export default function DetalhesPlaneta() {
  const { id } = useParams();

  const [planet, setPlaneta] = useState<IPlanet | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/planets/${id}/`)
      .then((res) => {
        setPlaneta(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching planet details:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading || !planet) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <img
          src="/icons8-baby-yoda (1).svg"
          alt="Loading"
          className="h-16 w-16 animate-spin mb-4"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Link
          to={-1 as To}
          className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
        >
          ← Back to Characters
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-8 text-white">
            <div className="flex items-center gap-3 mb-2">
              <Globe2 size={32} className="text-blue-400" />
              <h1 className="text-4xl font-bold">{planet.name}</h1>
            </div>
            <p className="text-slate-300">Diâmetro: {planet.diameter} km</p>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-lg">
                <Users className="text-blue-600" size={24} />
                <div>
                  <p className="text-sm text-gray-600">População</p>
                  <p className="font-medium">{planet.population}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-lg">
                <Cloud className="text-blue-600" size={24} />
                <div>
                  <p className="text-sm text-gray-600">Clima</p>
                  <p className="font-medium capitalize">{planet.climate}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-lg">
                <Mountain className="text-blue-600" size={24} />
                <div>
                  <p className="text-sm text-gray-600">Terreno</p>
                  <p className="font-medium capitalize">{planet.terrain}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Período de Rotação</p>
                  <p className="font-medium">
                    {planet.rotation_period} horas padrão
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Período Orbital</p>
                  <p className="font-medium">
                    {planet.orbital_period} dias padrão
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Gravidade</p>
                  <p className="font-medium">{planet.gravity}</p>
                </div>

                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Água na Superfície</p>
                  <p className="font-medium">{planet.surface_water}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
