import { useEffect, useState } from "react";
import { useParams, Link, To } from "react-router-dom";
import { api } from "../services/api";
import Header from "../components/Header";
import { Calendar, User, Users, ScrollText } from "lucide-react";

interface Film {
  title: string;
  episode_id: number;
  director: string;
  producer: string;
  release_date: string;
  opening_crawl: string;
}

export default function FilmDetails() {
  const { id } = useParams();
  const [film, setFilm] = useState<Film | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/films/${id}/`)
      .then((res) => {
        setFilm(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching film details:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading || !film) {
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
            <h1 className="text-4xl font-bold mb-2">{film.title}</h1>
            <p className="text-slate-300">Episódio {film.episode_id}</p>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-lg">
                <User className="text-blue-600" size={24} />
                <div>
                  <p className="text-sm text-gray-600">Diretor</p>
                  <p className="font-medium">{film.director}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-lg">
                <Users className="text-blue-600" size={24} />
                <div>
                  <p className="text-sm text-gray-600">Produtor</p>
                  <p className="font-medium">{film.producer}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-lg">
                <Calendar className="text-blue-600" size={24} />
                <div>
                  <p className="text-sm text-gray-600">Data de Lançamento</p>
                  <p className="font-medium">
                    {new Date(film.release_date).toLocaleDateString("pt-BR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <ScrollText className="text-blue-600" size={24} />
                <h2 className="text-xl font-bold">Texto de Abertura</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-justify tracking-wider">
                {film.opening_crawl}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
