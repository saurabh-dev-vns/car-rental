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
const isValidDateRange = (start, end) => {
  if (!start || !end) return true; // Allow empty dates during selection
  return new Date(start) < new Date(end);
};

// Format date to mm/dd/yyyy format
const formatDateForDisplay = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

// Parse mm/dd/yyyy to Date object
const parseDateFromInput = (dateString) => {
  if (!dateString) return null;
  const [month, day, year] = dateString.split('/').map(Number);
  return new Date(year, month - 1, day);
};

/* ================= Custom Date Input Component ================= */
const DateInput = ({ label, value, onChange, minDate, error, placeholder = "mm/dd/yyyy" }) => {
  const [displayValue, setDisplayValue] = useState("");
  
  useEffect(() => {
    if (value) {
      setDisplayValue(formatDateForDisplay(value));
    } else {
      setDisplayValue("");
    }
  }, [value]);

  const handleChange = (e) => {
    const input = e.target.value;
    setDisplayValue(input);
    
    // Only validate if we have a complete date
    if (input.length === 10 && input.includes('/')) {
      const date = parseDateFromInput(input);
      if (date && !isNaN(date.getTime())) {
        onChange(date.toISOString());
      }
    } else if (input === "") {
      onChange("");
    }
  };

  const handleBlur = () => {
    if (displayValue && displayValue.includes('/')) {
      const date = parseDateFromInput(displayValue);
      if (date && !isNaN(date.getTime())) {
        // Format it properly
        const formatted = formatDateForDisplay(date.toISOString());
        setDisplayValue(formatted);
        onChange(date.toISOString());
      }
    }
  };

  // Create a date string for the HTML date picker
  const getHTMLDateValue = () => {
    if (!value) return "";
    const date = new Date(value);
    return date.toISOString().split('T')[0];
  };

  const handleHTMLDateChange = (e) => {
    if (e.target.value) {
      const date = new Date(e.target.value);
      onChange(date.toISOString());
    } else {
      onChange("");
    }
  };

  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-600 dark:text-zinc-400 mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type="text"
          value={displayValue}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={`p-3 bg-white dark:bg-zinc-800 border ${
            error ? 'border-red-500 ring-2 ring-red-200 dark:ring-red-900' : 'border-gray-200 dark:border-zinc-700'
          } rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none transition-all w-full`}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <label htmlFor={`${label.replace(/\s+/g, '-')}-native`} className="cursor-pointer">
            <svg className="w-5 h-5 text-gray-400 hover:text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </label>
          <input
            id={`${label.replace(/\s+/g, '-')}-native`}
            type="date"
            value={getHTMLDateValue()}
            onChange={handleHTMLDateChange}
            min={minDate ? new Date(minDate).toISOString().split('T')[0] : undefined}
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
          />
        </div>
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
        Format: {placeholder}
      </div>
    </div>
  );
};

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
          className="w-full p-3 border border-gray-300 dark:border-zinc-700 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-zinc-800 placeholder-gray-400 dark:placeholder-zinc-500 outline-none focus:ring-2 focus:ring-orange-500"
        />
        {suggestions.length > 0 && (
          <ul
            ref={suggestionsRef}
            className="absolute top-full left-0 right-0 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-b-lg max-h-40 overflow-auto shadow-lg z-[9999]"
          >
            {suggestions.map((s, idx) => (
              <li
                key={idx}
                className="p-3 hover:bg-orange-500 hover:text-white cursor-pointer transition border-b border-gray-100 dark:border-zinc-700 last:border-b-0"
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
        className="mt-3 p-3 border border-gray-300 dark:border-zinc-700 rounded-lg w-full text-gray-900 dark:text-white bg-white dark:bg-zinc-800 placeholder-gray-400 dark:placeholder-zinc-500 resize-none overflow-auto focus:ring-2 focus:ring-orange-500"
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
  const [dateError, setDateError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const resolved = resolveCarById(cars, id);
    setSelectedCar(resolved);
  }, [id]);

  const handleDateChange = (name, value) => {
    const updatedDetails = { ...rentalDetails, [name]: value };
    setRentalDetails(updatedDetails);

    // Validate dates
    if (updatedDetails.pickUpDate && updatedDetails.dropOffDate) {
      const pickUp = new Date(updatedDetails.pickUpDate);
      const dropOff = new Date(updatedDetails.dropOffDate);
      
      if (dropOff <= pickUp) {
        setDateError("❌ Drop-off date must be after pick-up date");
      } else if ((dropOff - pickUp) < 86400000) { // Less than 1 day (24 hours)
        setDateError("❌ Minimum rental period is 1 day");
      } else {
        setDateError("");
      }
    } else {
      setDateError(""); // Clear error if one date is empty
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "pickUpDate" || name === "dropOffDate") {
      handleDateChange(name, value);
    } else {
      setRentalDetails((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate dates before submission
    if (!isValidDateRange(rentalDetails.pickUpDate, rentalDetails.dropOffDate)) {
      setDateError("❌ Drop-off date must be after pick-up date");
      return;
    }

    if (!rentalDetails.location) {
      alert("⚠️ Please select a location on the map!");
      return;
    }

    if (dateError) {
      return; // Don't proceed if there's an error
    }

    setIsSubmitting(true);
    
    // Calculate total price
    const pickUp = new Date(rentalDetails.pickUpDate);
    const dropOff = new Date(rentalDetails.dropOffDate);
    const days = Math.ceil((dropOff - pickUp) / (1000 * 60 * 60 * 24));
    const totalPrice = days * selectedCar.price;
    
    // Simulate API call
    setTimeout(() => {
      alert(`✅ Booking Confirmed!\n\n🚗 Car: ${selectedCar.name}\n📅 Pick-up: ${formatDateForDisplay(rentalDetails.pickUpDate)}\n📅 Drop-off: ${formatDateForDisplay(rentalDetails.dropOffDate)}\n📍 Location: ${rentalDetails.location}\n💰 Total: $${totalPrice} (${days} days × $${selectedCar.price}/day)`);
      setIsSubmitting(false);
      
      // Reset form (optional)
      setRentalDetails({
        pickUpDate: "",
        dropOffDate: "",
        location: "",
      });
      setDateError("");
    }, 1500);
  };

  const getMinDropOffDate = () => {
    if (!rentalDetails.pickUpDate) return "";
    const pickUpDate = new Date(rentalDetails.pickUpDate);
    // Add minimum 1 day gap for drop-off
    pickUpDate.setDate(pickUpDate.getDate() + 1);
    return pickUpDate.toISOString();
  };

  const isFormValid = () => {
    return rentalDetails.pickUpDate && 
           rentalDetails.dropOffDate && 
           rentalDetails.location && 
           !dateError;
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
            className="w-full max-w-xl h-80 object-cover rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.02] hover:brightness-105 transition-all duration-500"
          />
        </div>

        {/* Right: Form + Map */}
        <div className="w-full md:w-1/2 bg-white dark:bg-zinc-900 shadow-2xl rounded-2xl p-8 transition-colors">
          <h2 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">{selectedCar.name}</h2>
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
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-zinc-800 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-700 transition">
              <div className="text-2xl mb-2">🪑</div>
              <span className="text-sm font-medium text-gray-700 dark:text-zinc-300">{selectedCar.features.seats} seats</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-zinc-800 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-700 transition">
              <div className="text-2xl mb-2">🧳</div>
              <span className="text-sm font-medium text-gray-700 dark:text-zinc-300">{selectedCar.features.luggage} luggage</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-zinc-800 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-700 transition">
              <div className="text-2xl mb-2">⛽</div>
              <span className="text-sm font-medium text-gray-700 dark:text-zinc-300">{selectedCar.features.fuel} fuel</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DateInput
                label="Pick-up Date"
                value={rentalDetails.pickUpDate}
                onChange={(value) => handleDateChange("pickUpDate", value)}
                minDate={new Date().toISOString()}
                placeholder="mm/dd/yyyy"
              />
              <DateInput
                label="Drop-off Date"
                value={rentalDetails.dropOffDate}
                onChange={(value) => handleDateChange("dropOffDate", value)}
                minDate={getMinDropOffDate()}
                error={dateError}
                placeholder="mm/dd/yyyy"
              />
            </div>

            {/* Date Error Message - More Prominent */}
            {dateError && (
              <div className="p-4 bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 rounded-r-lg animate-pulse">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-red-700 dark:text-red-300">Invalid Date Selection</h4>
                    <p className="text-red-600 dark:text-red-400 mt-1">{dateError}</p>
                    <p className="text-sm text-red-500 dark:text-red-400/80 mt-2">
                      ⚠️ Please select a drop-off date that is <strong>after</strong> the pick-up date (minimum 1 day).
                    </p>
                  </div>
                </div>
              </div>
            )}

            <BookingMap
              location={rentalDetails.location}
              setLocation={(loc) =>
                setRentalDetails({ ...rentalDetails, location: loc })
              }
            />

            <button
              type="submit"
              disabled={!isFormValid() || isSubmitting}
              className={`mt-2 w-full py-4 font-bold rounded-xl shadow-lg transition-all transform ${
                isFormValid() && !isSubmitting
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-orange-500/30 hover:shadow-orange-500/50 active:scale-[0.98] text-white'
                  : 'bg-gray-300 dark:bg-zinc-700 text-gray-500 dark:text-zinc-400 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing Booking...
                </div>
              ) : (
                isFormValid() ? '🚗 Confirm Booking Now' : 'Fill All Fields to Book'
              )}
            </button>

            {/* Validation Summary */}
            <div className="mt-4 space-y-3 text-sm">
              <div className={`flex items-center gap-3 p-3 rounded-lg ${rentalDetails.pickUpDate ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' : 'bg-gray-50 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${rentalDetails.pickUpDate ? 'bg-green-500 text-white' : 'bg-gray-300 dark:bg-zinc-700'}`}>
                  {rentalDetails.pickUpDate ? '✓' : '○'}
                </div>
                <span>Pick-up date selected: {rentalDetails.pickUpDate ? formatDateForDisplay(rentalDetails.pickUpDate) : 'Not selected'}</span>
              </div>
              <div className={`flex items-center gap-3 p-3 rounded-lg ${rentalDetails.dropOffDate && !dateError ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' : 'bg-gray-50 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${rentalDetails.dropOffDate && !dateError ? 'bg-green-500 text-white' : 'bg-gray-300 dark:bg-zinc-700'}`}>
                  {rentalDetails.dropOffDate && !dateError ? '✓' : '○'}
                </div>
                <span>Drop-off date: {rentalDetails.dropOffDate ? formatDateForDisplay(rentalDetails.dropOffDate) : 'Not selected'} {dateError && <span className="text-red-500">- Invalid</span>}</span>
              </div>
              <div className={`flex items-center gap-3 p-3 rounded-lg ${rentalDetails.location ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' : 'bg-gray-50 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${rentalDetails.location ? 'bg-green-500 text-white' : 'bg-gray-300 dark:bg-zinc-700'}`}>
                  {rentalDetails.location ? '✓' : '○'}
                </div>
                <span>Location selected</span>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* More Cars */}
      <div className="mt-16">
        <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">More Cars You May Like</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedCars.map((car) => (
            <div
              key={car.id}
              onClick={() => navigate(`/booking/${car.id}`)}
              className="group p-5 rounded-xl bg-white dark:bg-zinc-900 shadow-lg hover:shadow-2xl hover:scale-[1.02] cursor-pointer transition-all duration-300 border border-gray-100 dark:border-zinc-800"
            >
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-40 object-cover rounded-lg mb-4 group-hover:brightness-110 transition"
              />
              <h4 className="font-semibold text-gray-800 dark:text-white">{car.name}</h4>
              <p className="text-sm text-gray-500 dark:text-zinc-400">{car.category}</p>
              <p className="mt-2 font-bold text-orange-500">${car.price}/day</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="mt-16">
        <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Rental Tips & Highlights</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tips.map((tip, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-gradient-to-br from-gray-50 to-white dark:from-zinc-800 dark:to-zinc-900 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border border-gray-100 dark:border-zinc-700 flex flex-col items-center justify-center text-center"
            >
              <div className="text-3xl mb-3">{tip.icon}</div>
              <p className="text-gray-700 dark:text-zinc-200 font-medium">{tip.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center min-h-screen text-gray-500 dark:text-zinc-400">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-lg">Loading car details...</p>
      </div>
    </div>
  );
};

export default CarDetailPage;