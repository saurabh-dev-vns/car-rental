import React, {
  useState,
  useMemo,
  useCallback,
  Fragment,
  useEffect
} from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Users,
  Briefcase,
  Fuel,
  Star,
  ChevronRight,
  Search,
  Filter
} from "lucide-react";
import CarDetailModal from "../components/default/CarDetailModal";

/* =====================================================
   App Constants
===================================================== */
const PRICE_CONFIG = Object.freeze({
  MIN: 50,
  MAX: 300,
  STEP: 10,
});

const FILTER_DEFAULTS = Object.freeze({
  CATEGORY: "All",
  FUEL: "All",
  PRICE: PRICE_CONFIG.MAX,
});

const CATEGORY_OPTIONS = Object.freeze([
  "All",
  "Sedan",
  "SUV",
  "Luxury",
  "Sports",
]);

const FUEL_OPTIONS = Object.freeze([
  "All",
  "Petrol",
  "Diesel",
  "Hybrid",
  "Electric",
]);

const SORT_OPTIONS = Object.freeze({
  NONE: "none",
  PRICE_ASC: "price_asc",
  PRICE_DESC: "price_desc",
});


/* =====================================================
   Dataset
===================================================== */
const cars = [
  {
    id: 1,
    name: "Tesla Model 3",
    category: "Sedan",
    price: 89,
    image: "https://media.zigcdn.com/media/model/2024/Jun/bmw-m5-2025.jpg",
    rating: 4.9,
    features: {
      seats: "5",
      luggage: "3",
      fuel: "Electric",
    },
  },
  {
    id: 2,
    name: "BMW X5",
    category: "SUV",
    price: 129,
    image: "https://www.carhelpcanada.com/wp-content/uploads/2019/02/2019-BMW-X5-2.jpg",
    rating: 4.8,
    features: {
      seats: "7",
      luggage: "5",
      fuel: "Hybrid",
    },
  },
  {
    id: 3,
    name: "Mercedes S-Class",
    category: "Luxury",
    price: 250,
    image: "https://hips.hearstapps.com/hmg-prod/images/mercedes-benz-s-class-50-1608218514.jpg",
    rating: 4.9,
    features: {
      seats: "5",
      luggage: "4",
      fuel: "Hybrid",
    },
  },
  {
    id: 4,
    name: "Porsche 911",
    category: "Sports",
    price: 300,
    image:
      "https://prs.porsche.com/iod/image/CA/992452/1/N4Igxg9gdgZglgcxALlAQynAtmgLnaAZxQG0BdAGnDSwFMAnNFUOAExRFoA9cBaAGwgB3XjHrQ+-WjFwgqEAA74izEADc09OBlnIQWCACM4UkAF8zVWlDVxxUOlF0t2egPJpCcYvKUEoxKgWVPyIABb4UEioIGwcACIAggCaciCKygHMwSAK4qwArmDOsa4gAJzlAEwALACsVWkZ-oGgkAVO9ACeAMIQrLQcPYlpBgP8ybSaKFUADFUAbL6ZgSQgAIwAEml1ABwAWmkAMgDiACrxAEpHIGQWliCEtLiRCK0gMBD0OLogAFYKWhIKi4RgBBSaay6GBofhPCxAA",
    rating: 4.9,
    features: {
      seats: "2",
      luggage: "1",
      fuel: "Petrol",
    },
  },
];

/* =====================================================
   Utility Helpers
===================================================== */
const normalize = (value = "") => value.toLowerCase().trim();

const safeIncludes = (source, target) =>
  normalize(source).includes(normalize(target));

const isAll = (value) => value === "All";

const byCategory = (car, category) =>
  isAll(category) || car.category === category;

const byFuel = (car, fuel) =>
  isAll(fuel) || car.features.fuel === fuel;

const byPrice = (car, max) => car.price <= max;

const bySearch = (car, term) => {
  if (!term) return true;
  const normalizedTerm = normalize(term);
  
  return (
    safeIncludes(car.name, term) ||
    safeIncludes(car.category, term) ||
    safeIncludes(car.features.fuel, term) ||
    safeIncludes(car.features.seats, term) ||
    safeIncludes(car.features.luggage, term) ||
    (normalizedTerm.includes('seater') && car.features.seats === normalizedTerm.replace(/\D/g, '')) ||
    (normalizedTerm.includes('seat') && car.features.seats === normalizedTerm.replace(/\D/g, ''))
  );
};

/* =====================================================
   Skeleton Loader Component
===================================================== */
const SkeletonLoader = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 overflow-hidden shadow-sm">
        {/* Image skeleton */}
        <div className="relative h-56 bg-gray-200 dark:bg-zinc-800"></div>

        <div className="p-6">
          {/* Top section skeleton */}
          <div className="flex justify-between mb-4">
            <div className="space-y-2">
              <div className="h-4 w-16 bg-gray-200 dark:bg-zinc-800 rounded"></div>
              <div className="h-6 w-32 bg-gray-200 dark:bg-zinc-800 rounded"></div>
            </div>
            <div className="text-right space-y-1">
              <div className="h-7 w-20 bg-gray-200 dark:bg-zinc-800 rounded ml-auto"></div>
              <div className="h-3 w-16 bg-gray-200 dark:bg-zinc-800 rounded ml-auto"></div>
            </div>
          </div>

          {/* Features skeleton */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-8 h-8 bg-gray-200 dark:bg-zinc-800 rounded-lg mb-1"></div>
                <div className="h-3 w-12 bg-gray-200 dark:bg-zinc-800 rounded"></div>
              </div>
            ))}
          </div>

          {/* Rating skeleton */}
          <div className="absolute top-4 right-4 w-16 h-6 bg-gray-200 dark:bg-zinc-800 rounded-full"></div>

          {/* Button skeleton */}
          <div className="h-12 bg-gray-200 dark:bg-zinc-800 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
};

/* =====================================================
   Skeleton Filter Bar
===================================================== */
const SkeletonFilterBar = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12 animate-pulse">
      {/* Search skeleton */}
      <div className="relative md:col-span-2">
        <div className="w-full h-12 bg-gray-200 dark:bg-zinc-800 rounded-xl"></div>
      </div>
      
      {/* Price filter skeleton */}
      <div>
        <div className="h-4 w-32 bg-gray-200 dark:bg-zinc-800 rounded mb-2"></div>
        <div className="h-2 bg-gray-200 dark:bg-zinc-800 rounded"></div>
      </div>
      
      {/* Fuel filter skeleton */}
      <div className="h-12 bg-gray-200 dark:bg-zinc-800 rounded-xl"></div>
    </div>
  );
};

/* =====================================================
   Skeleton Categories
===================================================== */
const SkeletonCategories = () => {
  return (
    <div className="flex flex-wrap gap-2 mb-10 animate-pulse">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="w-20 h-9 bg-gray-200 dark:bg-zinc-800 rounded-full"></div>
      ))}
    </div>
  );
};

/* =====================================================
   UI Helpers
===================================================== */
const FeatureItem = ({ icon: Icon, label }) => (
  <div className="flex flex-col items-center gap-1">
    <Icon className="w-4 h-4" />
    <span>{label}</span>
  </div>
);

const EmptyState = () => (
  <div className="text-center mt-20 py-12">
    <div className="text-5xl mb-4">🚗</div>
    <p className="text-gray-600 dark:text-zinc-400 text-lg">
      No cars found matching your filters.
    </p>
    <p className="text-gray-500 dark:text-zinc-500 text-sm mt-2">
      Try adjusting your search criteria
    </p>
  </div>
);

/* =====================================================
   Main Component
===================================================== */
const Models = () => {
  /* ---------------- State ---------------- */
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState(SORT_OPTIONS.NONE);

  const [activeCategory, setActiveCategory] = useState(
    FILTER_DEFAULTS.CATEGORY
  );
  const [fuelType, setFuelType] = useState(
    FILTER_DEFAULTS.FUEL
  );
  const [maxPrice, setMaxPrice] = useState(
    FILTER_DEFAULTS.PRICE
  );
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /* ---------------- Simulate Data Loading ---------------- */
  useEffect(() => {
    // Simulate API call to MongoDB
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 1.5 second loading simulation

    return () => clearTimeout(timer);
  }, []);

  /* ---------------- Callbacks ---------------- */
const handleSort = useCallback((e) => {
  setSortBy(e.target.value);
}, []);


  const handleSearch = useCallback(
    (e) => setSearchTerm(e.target.value),
    []
  );

  const handleCategory = useCallback(
    (value) => setActiveCategory(value),
    []
  );

  const handleFuel = useCallback(
    (e) => setFuelType(e.target.value),
    []
  );

  const handlePrice = useCallback(
    (e) => setMaxPrice(Number(e.target.value)),
    []
  );

  /* ---------------- Derived Data ---------------- */
  const filteredCars = useMemo(() => {
  const result = cars.filter((car) =>
    bySearch(car, searchTerm) &&
    byCategory(car, activeCategory) &&
    byFuel(car, fuelType) &&
    byPrice(car, maxPrice)
  );

  if (sortBy === SORT_OPTIONS.PRICE_ASC) {
    return [...result].sort((a, b) => a.price - b.price);
  }

  if (sortBy === SORT_OPTIONS.PRICE_DESC) {
    return [...result].sort((a, b) => b.price - a.price);
  }

  return result;
}, [searchTerm, activeCategory, fuelType, maxPrice, sortBy]);



  /* ---------------- Render ---------------- */
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 pt-24 pb-20">
      <div className="container mx-auto px-4">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Our Vehicle <span className="text-orange-500">Fleet</span>
          </motion.h1>
          <p className="text-gray-600 dark:text-zinc-400">
            Browse premium vehicles tailored to your needs.
          </p>
        </div>

        {/* FILTER BAR - Show skeleton while loading */}
        {isLoading ? (
          <SkeletonFilterBar />
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12">
              {/* Search */}
              <div className="relative md:col-span-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  value={searchTerm}
                  onChange={handleSearch}
                  placeholder="Search by name, category, fuel, seats..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-zinc-900 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                />
              </div>

              {/* Price */}
              <div>
                <label className="text-sm flex items-center gap-2 mb-1 text-gray-600 dark:text-zinc-400">
                  <Filter className="w-4 h-4" />
                  Max Price (${maxPrice})
                </label>
                <input
                  type="range"
                  min={PRICE_CONFIG.MIN}
                  max={PRICE_CONFIG.MAX}
                  step={PRICE_CONFIG.STEP}
                  value={maxPrice}
                  onChange={handlePrice}
                  className="w-full h-2 bg-gray-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer
        [&::-webkit-slider-thumb]:appearance-none
        [&::-webkit-slider-thumb]:h-4
        [&::-webkit-slider-thumb]:w-4
        [&::-webkit-slider-thumb]:rounded-full
        [&::-webkit-slider-thumb]:bg-orange-500"
                />
              </div>

              {/* Fuel */}
              <select
                value={fuelType}
                onChange={handleFuel}
                className="p-3 rounded-xl bg-gray-50 dark:bg-zinc-900 border focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
              >
                {FUEL_OPTIONS.map((fuel) => (
                  <option key={fuel}>{fuel}</option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={handleSort}
                className="p-3 rounded-xl bg-gray-50 dark:bg-zinc-900 border focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
              >
                <option value={SORT_OPTIONS.NONE}>Sort By</option>
                <option value={SORT_OPTIONS.PRICE_ASC}>Price: Low → High</option>
                <option value={SORT_OPTIONS.PRICE_DESC}>Price: High → Low</option>
              </select>
            </div>

        )}

        <div className="flex justify-end mb-6">
          <button
            onClick={() => {
              setSearchTerm("");
              setActiveCategory(FILTER_DEFAULTS.CATEGORY);
              setFuelType(FILTER_DEFAULTS.FUEL);
              setMaxPrice(FILTER_DEFAULTS.PRICE);
              setSortBy(SORT_OPTIONS.NONE);
            }}
            className="text-sm px-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
          >
            Clear Filters
          </button>
        </div>


        {/* CATEGORY FILTERS - Show skeleton while loading */}
        {isLoading ? (
          <SkeletonCategories />
        ) : (
          <div className="flex flex-wrap gap-2 mb-10">
            {CATEGORY_OPTIONS.map((category) => (
              <button
                key={category}
                onClick={() => handleCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200
                  ${activeCategory === category
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                    : "bg-gray-100 dark:bg-zinc-900 hover:bg-gray-200 dark:hover:bg-zinc-800"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* CAR GRID - Show skeleton while loading */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Show skeleton loaders
            Array.from({ length: 6 }).map((_, index) => (
              <SkeletonLoader key={index} />
            ))
          ) : filteredCars.length > 0 ? (
            // Show actual car cards
            filteredCars.map((car, index) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => {
                  setSelectedCar(car);
                  setIsModalOpen(true);
                }}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-bold">{car.rating}</span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between mb-4">
                    <div>
                      <span className="text-xs text-orange-500 font-bold uppercase tracking-wide">
                        {car.category}
                      </span>
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white mt-1">
                        {car.name}
                      </h3>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-orange-500">
                        ${car.price}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-zinc-500">per day</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-6 text-xs text-gray-500 dark:text-zinc-400">
                    <FeatureItem
                      icon={Users}
                      label={`${car.features.seats} Seats`}
                    />
                    <FeatureItem
                      icon={Briefcase}
                      label={`${car.features.luggage} Bags`}
                    />
                    <FeatureItem
                      icon={Fuel}
                      label={car.features.fuel}
                    />
                  </div>

                  <Link
                    to={`/booking/${car.id}`}
                    className="flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-bold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                  >
                    Book Now <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              </motion.div>
            ))
          ) : (
            // Show empty state
            <div className="col-span-3">
              <EmptyState />
            </div>
          )}
        </div>

        {/* Loading indicator during transition */}
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-12 text-sm text-gray-500 dark:text-zinc-400"
          >
            Showing {filteredCars.length} car{filteredCars.length !== 1 ? 's' : ''}
          </motion.div>
        )}
      </div>

      {/* Car Detail Modal */}
      {isModalOpen && selectedCar && (
        <CarDetailModal 
          car={selectedCar} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
};

export default Models;