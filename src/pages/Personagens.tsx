import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import Header from "../components/Header";
import { IPeople } from "../assets/@types";

const characterImages: Record<string, string> = {
  "Luke Skywalker": "/luke.jpg",
  "Darth Vader": "/Darth Vader.jpg",
  "Leia Organa": "/Leia Organa.jpg",
  "Obi-Wan Kenobi": "/Obi-Wan Kenobi.jpg",
  "C-3PO": "/C-3PO.jpg",
  "R2-D2": "/R2-D2.jpg",
  "Owen Lars": "/Owen Lars.jpg",
  "Beru Whitesun lars": "/Beru Whitesun lars.jpg",
  "R5-D4": "/R5-D4.jpg",
  "Biggs Darklighter": "/Biggs Darklighter.jpg",
  "Anakin Skywalker": "/Anakin Skywalker.jpg",
  "Wilhuff Tarkin": "/Wilhuff Tarkin.jpg",
  Chewbacca: "/Chewbacca.jpg",
  "Han Solo": "/Han Solo.jpg",
  Greedo: "/Greedo.jpg",
  "Jabba Desilijic Tiure": "/Jabba Desilijic Tiure.jpg",
  "Wedge Antilles": "/Wedge Antilles.jpg",
  "Jek Tono Porkins": "/Jek Tono Porkins.jpg",
  Yoda: "/Yoda.jpg",
  Palpatine: "/Palpatine.jpg",
  "Boba Fett": "/Boba Fett.jpg",
  "IG-88": "/IG-88.jpg",
  Bossk: "/Bossk.jpg",
  "Lando Calrissian": "/Lando Calrissian.jpg",
  Lobot: "/Lobot.jpg",
  Ackbar: "/Ackbar.jpg",
  "Mon Mothma": "/Mon Mothma.jpg",
  "Arvel Crynyd": "/Arvel Crynyd.jpg",
  "Wicket Systri Warrick": "/Wicket Systri Warrick.jpg",
  "Nien Nunb": "/Nien Nunb.jpg",
  "Qui-Gon Jinn": "/Qui-Gon Jinn.jpg",
  "Nute Gunray": "/Nute Gunray.jpg",
  "Finis Valorum": "/Finis Valorum.jpg",
  "Padmé Amidala": "/Padmé Amidala.jpg",
  "Jar Jar Binks": "/Jar Jar Binks.jpg",
  "Roos Tarpals": "/Roos Tarpals.jpg",
  "Rugor Nass": "/Rugor Nass.jpg",
  "Ric Olié": "/Ric Olié.jpg",
  Watto: "/Watto.jpg",
  Sebulba: "/Sebulba.jpg",
  "Quarsh Panaka": "/Quarsh Panaka.jpg",
  "Shmi Skywalker": "/Shmi Skywalker.jpg",
  "Darth Maul": "/Darth Maul.jpg",
  "Bib Fortuna": "/Bib Fortuna.jpg",
  "Ayla Secura": "/Ayla Secura.jpg",
  "Ratts Tyerel": "/Ratts Tyerell.jpg",
  "Dud Bolt": "/Dud Bolt.jpg",
  Gasgano: "/Gasgano.jpg",
  "Ben Quadinaros": "/Ben Quadinaros.jpg",
  "Mace Windu": "/Mace Windu.jpg",
  "Ki-Adi-Mundi": "/Ki-Adi-Mundi.jpg",
  "Kit Fisto": "/Kit Fisto.jpg",
  "Eeth Koth": "/Eeth Koth.jpg",
  "Adi Gallia": "/Adi Gallia.jpg",
  "Saesee Tiin": "/Saesee Tiin.jpg",
  "Yarael Poof": "/Yarael Poof.jpg",
  "Plo Koon": "/Plo Koon.jpg",
  "Mas Amedda": "/Mas Amedda.jpg",
  "Gregar Typho": "/Gregar Typho.jpg",
  Cordé: "/Cordé.jpg",
  "Cliegg Lars": "/Cliegg Lars.jpg",
  "Poggle the Lesser": "/Poggle the Lesser.jpg",
  "Luminara Unduli": "/Luminara Unduli.jpg",
  "Barriss Offee": "/Barriss Offee.jpg",
};

export default function Personagens() {
  const [people, setPersonagens] = useState<IPeople[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalImageUrl, setModalImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchInitialCharacters = async () => {
      try {
        const response = await api.get("/people");
        const initialCharacters = response.data.results.slice(0, 12);
        setPersonagens(initialCharacters);

        let allCharacters = [...initialCharacters];
        let nextPage = response.data.next;

        while (nextPage) {
          const nextResponse = await api.get(nextPage);
          allCharacters = [...allCharacters, ...nextResponse.data.results];
          nextPage = nextResponse.data.next;
        }

        setPersonagens(allCharacters);
        setLoading(false);
      } catch (err) {
        console.error("Erro ao carregar personagens:", err);
        setError("Falha ao carregar personagens");
        setLoading(false);
      }
    };

    fetchInitialCharacters();
  }, []);

  const closeModal = () => setModalImageUrl(null);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <img
          src="/icons8-baby-yoda (1).svg"
          alt="Carregando"
          className="animate-spin h-16 w-16"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-red-600 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {people.map((person, index) => {
            const imageUrl =
              characterImages[person.name] || "/src/assets/images/default.jpg";

            return (
              <Link
                to={`/personagens/${index + 1}`}
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              >
                <div className="h-48 bg-gradient-to-br from-slate-800 to-slate-900 relative group">
                  <img
                    src={imageUrl}
                    alt={person.name}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setModalImageUrl(imageUrl);
                    }}
                    className="w-full h-full object-cover opacity-75 group-hover:opacity-100 transition-opacity duration-300 cursor-zoom-in"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2">{person.name}</h2>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Altura</p>
                      <p className="font-medium">{person.height} cm</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Peso</p>
                      <p className="font-medium">{person.mass} kg</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Ano de Nascimento</p>
                      <p className="font-medium">{person.birth_year}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Gênero</p>
                      <p className="font-medium capitalize">{person.gender}</p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </main>

      {/* Modal de Imagem */}
      {modalImageUrl && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="relative w-[400px] h-[400px] bg-white rounded-lg shadow-lg flex items-center justify-center overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-white bg-red-500 bg-opacity-50 hover:bg-opacity-75 rounded-full px-3 py-1 text-lg z-10"
              onClick={closeModal}
            >
              &times;
            </button>

            <img
              src={modalImageUrl}
              alt="Character"
              className="w-[400px] h-[400px] object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
}
