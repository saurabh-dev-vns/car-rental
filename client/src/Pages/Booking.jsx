import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* ================= Cars Data ================= */
const cars = [
  {
    id: 1,
    name: "Tesla Model 3",
    category: "Sedan",
    price: 89,
    image: "https://media.zigcdn.com/media/model/2024/Jun/bmw-m5-2025.jpg",
    features: { seats: "5", luggage: "3", fuel: "Electric" },
    rating: 4.9,
    reviews: 128,
  },
  {
    id: 2,
    name: "BMW X5",
    category: "SUV",
    price: 129,
    image: "https://imgd.aeplcdn.com/1920x1080/n/cw/ec/152681/x5-exterior-right-front-three-quarter-6.jpeg?isig=0&q=80&q=80",
    features: { seats: "7", luggage: "5", fuel: "Hybrid" },
    rating: 4.8,
    reviews: 96,
  },
  {
    id: 3,
    name: "Audi A6",
    category: "Luxury Sedan",
    price: 109,
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2",
    features: { seats: "5", luggage: "4", fuel: "Petrol" },
    rating: 4.7,
    reviews: 84,
  },
  {
    id: 4,
    name: "Range Rover Sport",
    category: "Premium SUV",
    price: 159,
    image: "https://di-uploads-pod3.dealerinspire.com/landroversanantonio/uploads/2024/01/range-rover-sport-autobiography-p510e-2023-im-test.webp",
    features: { seats: "7", luggage: "6", fuel: "Diesel" },
    rating: 4.9,
    reviews: 142,
  },
];

/* ================= Tips Data ================= */
const tips = [
  { text: "Always check fuel type before booking.", icon: "⛽" },
  { text: "Pick-up early to avoid traffic delays.", icon: "⏰" },
  { text: "Inspect car condition before departure.", icon: "🔍" },
  { text: "Use your preferred navigation app.", icon: "🗺️" },
];

/* ================= Helper ================= */
const resolveCarById = (collection, id) =>
  collection.find((item) => item.id === parseInt(id));
const excludeActiveCar = (collection, activeId) =>
  collection.filter((item) => item.id !== activeId);
const isValidDateRange = (start, end) => start < end;

/* ================= Map Component ================= */
const BookingMap = ({ location, setLocation }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);
  const mapInstance = useRef(null);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    mapInstance.current = L.map(mapRef.current, {
      center: [22.9734, 78.6569],
      zoom: 5,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(mapInstance.current);

    mapInstance.current.on("click", async (e) => {
      const { lat, lng } = e.latlng;
      setMarker(lat, lng);
    });

    return () => mapInstance.current.remove();
  }, []);

  const setMarker = async (lat, lng) => {
    if (markerRef.current) markerRef.current.setLatLng([lat, lng]);
    else {
      markerRef.current = L.marker([lat, lng], {
        icon: L.icon({
          iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
          iconSize: [32, 32],
          iconAnchor: [16, 32],
        }),
      }).addTo(mapInstance.current);
    }
    mapInstance.current.setView([lat, lng], 10, { animate: true });

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&accept-language=en`
      );
      const data = await res.json();
      const address = data.address || {};
      const city = address.city || address.town || address.village || "";
      const state = address.state || "";
      setLocation(`${city}, ${state} — Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`);
    } catch {
      setLocation(`Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`);
    }
  };

  const handleSearchChange = async () => {
    const query = searchRef.current.value;
    if (!query) return setSuggestions([]);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&accept-language=en&limit=5`
      );
      const data = await res.json();
      setSuggestions(data);
    } catch {
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (item) => {
    const lat = parseFloat(item.lat);
    const lon = parseFloat(item.lon);
    setMarker(lat, lon);
    setSuggestions([]);
    searchRef.current.value = item.display_name;
  };

  return (
    <div className="mb-4">
      <div className="relative mb-2">
        <input
          type="text"
          ref={searchRef}
          placeholder="Search location..."
          onChange={handleSearchChange}
          className="w-full p-2 border border-gray-300 dark:border-zinc-700 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-zinc-800 placeholder-gray-400 dark:placeholder-zinc-500 outline-none"
        />
        {suggestions.length > 0 && (
          <ul
            ref={suggestionsRef}
            className="absolute top-full left-0 right-0 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-b-lg max-h-40 overflow-auto z-50"
          >
            {suggestions.map((s, idx) => (
              <li
                key={idx}
                className="p-2 hover:bg-orange-500 hover:text-white cursor-pointer transition"
                onClick={() => handleSelectSuggestion(s)}
              >
                {s.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div
        ref={mapRef}
        className="w-full rounded-lg shadow-md border border-gray-300 dark:border-zinc-700"
        style={{ height: "300px" }}
      ></div>

      <textarea
        value={location}
        readOnly
        placeholder="Selected location will appear here"
        className="mt-2 p-2 border border-gray-300 dark:border-zinc-700 rounded w-full text-gray-900 dark:text-white bg-white dark:bg-zinc-800 placeholder-gray-400 dark:placeholder-zinc-500 resize-none overflow-auto"
        rows={2}
      />
    </div>
  );
};

/* ================= Main Component ================= */
const CarDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedCar, setSelectedCar] = useState(null);
  const [rentalDetails, setRentalDetails] = useState({
    pickUpDate: "",
    dropOffDate: "",
    location: "",
  });

  useEffect(() => {
    const resolved = resolveCarById(cars, id);
    setSelectedCar(resolved);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRentalDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidDateRange(rentalDetails.pickUpDate, rentalDetails.dropOffDate)) {
      alert("Drop-off date must be after pickup date!");
      return;
    }
    alert(`Booking confirmed at ${rentalDetails.location}!`);
  };

  const relatedCars = selectedCar
    ? excludeActiveCar(cars, selectedCar.id)
    : [];

  return selectedCar ? (
    <div className="container mx-auto p-6 pt-28 transition-colors duration-300">
      <div className="flex flex-col md:flex-row md:space-x-10">
        {/* Left: Car Image */}
        <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
          <img
            src={selectedCar.image}
            alt={selectedCar.name}
            className="w-full max-w-xl h-80 object-cover rounded-xl shadow-md hover:shadow-xl hover:scale-[1.03] hover:brightness-105 transition-all duration-500"
          />
        </div>

        {/* Right: Form + Map */}
        <div className="w-full md:w-1/2 bg-white dark:bg-zinc-900 shadow-xl rounded-xl p-8 transition-colors">
          <h2 className="text-3xl font-bold mb-2">{selectedCar.name}</h2>
          <p className="text-xl text-gray-600 dark:text-zinc-400 mb-4">
            {selectedCar.category} —{" "}
            <span className="text-orange-500 font-bold">${selectedCar.price}/day</span>
          </p>

          {/* Rating */}
          <div className="flex items-center space-x-3 mb-6">
            <div className="flex items-center space-x-1">
              <span className="text-2xl font-semibold text-gray-500 dark:text-zinc-400">{selectedCar.rating}</span>
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, idx) => (
                  <svg
                    key={idx}
                    xmlns="http://www.w3.org/2000/svg"
                    fill={idx < Math.floor(selectedCar.rating) ? "currentColor" : "none"}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 17.25l-6.403 3.377 1.233-7.264L1.43 7.642l7.361-.734L12 1.5l3.522 5.377 7.361.734-5.733 5.721 1.233 7.264L12 17.25z"
                    />
                  </svg>
                ))}
              </div>
            </div>
            <span className="text-sm text-gray-500 dark:text-zinc-500">({selectedCar.reviews} reviews)</span>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-zinc-800 rounded-lg">
              <div className="text-xl mb-1">🪑</div>
              <span className="text-xs text-gray-500 dark:text-zinc-400">{selectedCar.features.seats} seats</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-zinc-800 rounded-lg">
              <div className="text-xl mb-1">🧳</div>
              <span className="text-xs text-gray-500 dark:text-zinc-400">{selectedCar.features.luggage} luggage</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-zinc-800 rounded-lg">
              <div className="text-xl mb-1">⛽</div>
              <span className="text-xs text-gray-500 dark:text-zinc-400">{selectedCar.features.fuel} fuel</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 dark:text-zinc-400 mb-1">Pick-up Date</label>
                <input
                  type="datetime-local"
                  name="pickUpDate"
                  value={rentalDetails.pickUpDate}
                  onChange={handleChange}
                  className="p-3 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 dark:text-zinc-400 mb-1">Drop-off Date</label>
                <input
                  type="datetime-local"
                  name="dropOffDate"
                  value={rentalDetails.dropOffDate}
                  onChange={handleChange}
                  className="p-3 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                  required
                />
              </div>
            </div>

            <BookingMap
              location={rentalDetails.location}
              setLocation={(loc) =>
                setRentalDetails({ ...rentalDetails, location: loc })
              }
            />

            <button
              type="submit"
              className="mt-4 w-full py-4 bg-orange-500 text-white font-bold rounded-lg shadow-lg shadow-orange-500/30 hover:bg-orange-600 transition-all transform active:scale-95"
            >
              Confirm Booking Now
            </button>
          </form>
        </div>
      </div>

      {/* More Cars */}
      <div className="mt-16">
        <h3 className="text-2xl font-bold mb-6">More Cars You May Like</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedCars.map((car) => (
            <div
              key={car.id}
              onClick={() => navigate(`/booking/${car.id}`)}
              className="p-4 rounded-xl bg-white dark:bg-zinc-900 shadow-sm hover:shadow-xl hover:scale-[1.02] cursor-pointer transition-all duration-300"
            >
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h4 className="font-semibold">{car.name}</h4>
              <p className="text-sm text-gray-500">{car.category}</p>
              <p className="mt-2 font-bold text-orange-500">${car.price}/day</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="mt-16">
        <h3 className="text-2xl font-bold mb-6">Rental Tips & Highlights</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tips.map((tip, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-gray-50 dark:bg-zinc-800 shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex flex-col items-center justify-center text-center"
            >
              <div className="text-3xl mb-2">{tip.icon}</div>
              <p className="text-gray-700 dark:text-zinc-200 font-medium">{tip.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center min-h-screen text-gray-500 dark:text-zinc-400">
      Loading car details...
    </div>
  );
};

export default CarDetailPage;
