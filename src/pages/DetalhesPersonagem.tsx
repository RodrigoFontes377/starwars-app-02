import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import Header from "../components/Header";
import { Film, Globe2, Car } from "lucide-react";
import { IPeople, IPlanet, IFilm, IVehicle } from "../assets/@types";

export default function CharacterDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState<IPeople | null>(null);
  const [planet, setPlanet] = useState<IPlanet | null>(null);
  const [films, setFilms] = useState<IFilm[]>([]);
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const characterRes = await api.get(`/people/${id}/`);
        const characterData = characterRes.data;
        setCharacter(characterData);

        const planetRes = await fetch(characterData.homeworld);
        const planetData = await planetRes.json();
        setPlanet({ ...planetData, url: characterData.homeworld });

        const filmsData = await Promise.all(
          characterData.films.map((url: string) =>
            fetch(url).then((r) => r.json())
          )
        );
        setFilms(filmsData);

        const vehiclesData = await Promise.all(
          characterData.vehicles.map((url: string) =>
            fetch(url).then((r) => r.json())
          )
        );
        setVehicles(vehiclesData);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching character details:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleFilmClick = (url: string) => {
    const segments = url.split("/").filter(Boolean);
    const filmId = segments[segments.length - 1];
    navigate(`/filmes/${filmId}`);
  };

  const handleVehicleClick = (url: string) => {
    const vehicleId = url.split("/").filter(Boolean).pop();
    navigate(`/veiculos/${vehicleId}`);
  };

  const handlePlanetClick = (url: string) => {
    const planetId = url.split("/").filter(Boolean).pop();
    navigate(`/planetas/${planetId}`);
  };

  if (loading || !character) {
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
        <div className="mb-8">
          <Link
            to="/"
            className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
          >
            ← Back to Characters
          </Link>
          <h1 className="text-4xl font-bold text-center mb-8">
            {character.name}
          </h1>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                ["Altura", `${character.height}cm`],
                ["Peso", `${character.mass}kg`],
                ["Gênero", character.gender],
                ["Ano de Nascimento", character.birth_year],
                ["Cor dos Olhos", character.eye_color],
                ["Cor do Cabelo", character.hair_color],
                ["Cor da Pele", character.skin_color],
                ["Planeta Natal", planet?.name],
              ].map(([label, value]) => (
                <div key={label} className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600 text-sm">{label}</p>
                  <p className="font-medium capitalize">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-2 mb-4">
                <Film className="text-blue-600" />
                <h2 className="text-xl font-bold">Filmes</h2>
              </div>
              <div className="space-y-2">
                {films.length > 0 ? (
                  films.map((film) => (
                    <div
                      key={film.url}
                      onClick={() => handleFilmClick(film.url)}
                      className="p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      {film.title}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">Nenhum filme encontrado</p>
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-2 mb-4">
                <Car className="text-blue-600" />
                <h2 className="text-xl font-bold">Veículos</h2>
              </div>
              <div className="space-y-2">
                {vehicles.length > 0 ? (
                  vehicles.map((vehicle) => (
                    <div
                      key={vehicle.url}
                      onClick={() => handleVehicleClick(vehicle.url)}
                      className="p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      {vehicle.name}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">Nenhum veículo encontrado</p>
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-2 mb-4">
                <Globe2 className="text-blue-600" />
                <h2 className="text-xl font-bold">Planeta Natal</h2>
              </div>
              <div className="space-y-2">
                {planet ? (
                  <div
                    onClick={() => handlePlanetClick(planet.url)}
                    className="p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    {planet.name}
                  </div>
                ) : (
                  <p className="text-gray-500">
                    Informações do planeta não disponíveis
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
