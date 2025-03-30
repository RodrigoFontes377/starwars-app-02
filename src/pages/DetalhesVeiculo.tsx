import { useEffect, useState } from "react";
import { useParams, Link, To } from "react-router-dom";
import { api } from "../services/api";
import Header from "../components/Header";
import { Car, Ruler, Gauge } from "lucide-react";
import { IVehicle } from "../assets/@types";

export default function DetalhesVeiculo() {
  const { id } = useParams();
  const [vehicle, setVeiculo] = useState<IVehicle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/vehicles/${id}/`)
      .then((res) => {
        setVeiculo(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching vehicle details:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading || !vehicle) {
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
          ← Back to Vehicles
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-8 text-white">
            <h1 className="text-4xl font-bold mb-2">{vehicle.name}</h1>
            <p className="text-slate-300">{vehicle.model}</p>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-lg">
                <Car className="text-blue-600" size={24} />
                <div>
                  <p className="text-sm text-gray-600">Vehicle Class</p>
                  <p className="font-medium capitalize">
                    {vehicle.vehicle_class}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-lg">
                <Ruler className="text-blue-600" size={24} />
                <div>
                  <p className="text-sm text-gray-600">Length</p>
                  <p className="font-medium">{vehicle.length} meters</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-lg">
                <Gauge className="text-blue-600" size={24} />
                <div>
                  <p className="text-sm text-gray-600">Max Speed</p>
                  <p className="font-medium">
                    {vehicle.max_atmosphering_speed} km/h
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Manufacturer</p>
                  <p className="font-medium">{vehicle.manufacturer}</p>
                </div>

                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Cost</p>
                  <p className="font-medium">
                    {vehicle.cost_in_credits} credits
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Cargo Capacity</p>
                  <p className="font-medium">{vehicle.cargo_capacity} kg</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Crew</p>
                  <p className="font-medium">{vehicle.crew}</p>
                </div>

                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Passengers</p>
                  <p className="font-medium">{vehicle.passengers}</p>
                </div>

                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Consumables</p>
                  <p className="font-medium">{vehicle.consumables}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
