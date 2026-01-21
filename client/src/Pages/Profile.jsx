import React, { useState } from 'react';
import { 
  User, Mail, Phone, MapPin, CreditCard, 
  Calendar, CheckCircle, AlertCircle, Clock, 
  Car, ShieldCheck, ChevronRight, Camera, Save, X 
} from 'lucide-react';

/* =============================================================================
   MOCK DATA (Cars & History)
   (This data usually comes from a separate API endpoint like /api/bookings)
============================================================================= */
const MOCK_HISTORY = [
  {
    id: 1,
    car: "Tesla Model 3 Performance",
    image: "https://images.unsplash.com/photo-1536700503339-1e4b06520771?auto=format&fit=crop&q=80&w=300",
    startDate: "2024-02-10",
    endDate: "2024-02-12",
    price: 240,
    status: "active"
  },
  {
    id: 2,
    car: "Ford Mustang GT",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ed5d6?auto=format&fit=crop&q=80&w=300",
    startDate: "2023-12-20",
    endDate: "2023-12-25",
    price: 650,
    status: "completed"
  },
  {
    id: 3,
    car: "Toyota RAV4 Hybrid",
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3968e3bb?auto=format&fit=crop&q=80&w=300",
    startDate: "2023-11-05",
    endDate: "2023-11-06",
    price: 85,
    status: "completed"
  }
];

const Profile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);

  // ================= STATE FOR USER DATA =================
  const [user, setUser] = useState({
    fullName: "Alex Rivera",
    email: "alex.rivera@example.com",
    phone: "+1 (555) 012-3456",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    memberSince: "Aug 2023",
    address: "123 Coastal Hwy, Los Angeles, CA",
    license: {
      status: "verified",
      number: "D8732-****-9921",
      expiry: "12/2028"
    },
    stats: {
      trips: 14,
      spent: 4250,
      rating: 4.9
    }
  });

  // Temp state for editing
  const [tempUser, setTempUser] = useState(user);

  // Handle Edit Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempUser({ ...tempUser, [name]: value });
  };

  // Save Changes
  const handleSave = () => {
    setUser(tempUser);
    setIsEditing(false);
    // TODO: Add API call here
  };

  // Cancel Editing
  const handleCancel = () => {
    setTempUser(user);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 transition-colors duration-300 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* ================= HEADER SECTION (EDITABLE) ================= */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-zinc-800 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            
            {/* Avatar */}
            <div className="relative group">
              <img 
                src={user.avatarUrl} 
                alt="Profile" 
                className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-zinc-800 shadow-md"
              />
              <div className="absolute bottom-1 right-1 bg-green-500 p-1.5 rounded-full border-2 border-white dark:border-zinc-900 z-10">
                <CheckCircle size={14} className="text-white" />
              </div>
              
              {/* Camera Icon Overlay (Edit Mode Only) */}
              {isEditing && (
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center cursor-pointer">
                  <Camera className="text-white" size={24} />
                </div>
              )}
            </div>
            
            {/* User Details */}
            <div className="flex-1 w-full">
              {isEditing ? (
                // EDIT MODE INPUTS
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-500 font-semibold uppercase">Full Name</label>
                    <input 
                      type="text" name="fullName" value={tempUser.fullName} onChange={handleChange}
                      className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-zinc-800 dark:border-zinc-700 focus:ring-2 focus:ring-blue-500 outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 font-semibold uppercase">Email</label>
                    <input 
                      type="email" name="email" value={tempUser.email} onChange={handleChange}
                      className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-zinc-800 dark:border-zinc-700 focus:ring-2 focus:ring-blue-500 outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 font-semibold uppercase">Phone</label>
                    <input 
                      type="text" name="phone" value={tempUser.phone} onChange={handleChange}
                      className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-zinc-800 dark:border-zinc-700 focus:ring-2 focus:ring-blue-500 outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 font-semibold uppercase">Address</label>
                    <input 
                      type="text" name="address" value={tempUser.address} onChange={handleChange}
                      className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-zinc-800 dark:border-zinc-700 focus:ring-2 focus:ring-blue-500 outline-none transition"
                    />
                  </div>
                </div>
              ) : (
                // VIEW MODE
                <>
                  <h1 className="text-2xl font-bold">{user.fullName}</h1>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500 dark:text-zinc-400">
                    <div className="flex items-center gap-1">
                      <Mail size={16} /> {user.email}
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone size={16} /> {user.phone}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={16} /> {user.address}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={16} /> Joined {user.memberSince}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Edit/Save Buttons */}
            <div className="flex gap-3 mt-4 md:mt-0 self-start">
              {isEditing ? (
                <>
                  <button 
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition shadow-sm"
                  >
                    <Save size={16} /> Save
                  </button>
                  <button 
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-zinc-700 transition"
                  >
                    <X size={16} /> Cancel
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => { setTempUser(user); setIsEditing(true); }}
                  className="px-4 py-2 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-zinc-700 transition shadow-sm"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* ================= LEFT SIDEBAR ================= */}
          <div className="space-y-6">
            
            {/* Stats Card */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-zinc-800">
              <h3 className="font-semibold mb-4 text-gray-500 dark:text-zinc-400 text-sm uppercase tracking-wider">Driving Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{user.stats.trips}</div>
                  <div className="text-xs text-gray-500 dark:text-zinc-400">Total Trips</div>
                </div>
                <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">${user.stats.spent}</div>
                  <div className="text-xs text-gray-500 dark:text-zinc-400">Total Spent</div>
                </div>
              </div>
            </div>

            {/* License Verification Card */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-zinc-800 relative overflow-hidden">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">Driver's License</h3>
                  <p className="text-xs text-gray-500 dark:text-zinc-400">Required for rentals</p>
                </div>
                {user.license.status === 'verified' ? (
                  <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                    <ShieldCheck size={12} /> VERIFIED
                  </span>
                ) : (
                  <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-bold">PENDING</span>
                )}
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm py-2 border-b dark:border-zinc-800">
                  <span className="text-gray-500">License No.</span>
                  <span className="font-mono">{user.license.number}</span>
                </div>
                <div className="flex justify-between text-sm py-2 border-b dark:border-zinc-800">
                  <span className="text-gray-500">Expires</span>
                  <span>{user.license.expiry}</span>
                </div>
              </div>
            </div>

          </div>

          {/* ================= RIGHT MAIN CONTENT ================= */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Tabs */}
            <div className="flex gap-6 border-b border-gray-200 dark:border-zinc-800">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`pb-3 text-sm font-medium transition-colors relative ${activeTab === 'overview' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Overview
                {activeTab === 'overview' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400"></div>}
              </button>
              <button 
                onClick={() => setActiveTab('history')}
                className={`pb-3 text-sm font-medium transition-colors relative ${activeTab === 'history' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 hover:text-gray-700'}`}
              >
                History
                {activeTab === 'history' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400"></div>}
              </button>
            </div>

            {/* TAB CONTENT: ACTIVE RENTAL */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Car size={20} className="text-blue-500" /> Active Rental
                </h3>
                
                {MOCK_HISTORY.filter(h => h.status === 'active').length > 0 ? (
                  MOCK_HISTORY.filter(h => h.status === 'active').map((booking) => (
                    <div key={booking.id} className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-xl p-4 flex gap-4 items-center">
                      <img src={booking.image} alt={booking.car} className="w-24 h-16 object-cover rounded-lg" />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-lg">{booking.car}</h4>
                            <p className="text-sm text-blue-600 dark:text-blue-300 font-medium">Return by {booking.endDate}</p>
                          </div>
                          <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 text-xs px-2 py-1 rounded font-bold uppercase">
                            Ongoing
                          </span>
                        </div>
                        <div className="mt-2 w-full bg-gray-200 dark:bg-zinc-700 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-blue-500 h-full w-2/3"></div>
                        </div>
                        <p className="text-xs text-right mt-1 text-gray-500">Time remaining: 1 day</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500 text-sm italic">No active rentals at the moment.</div>
                )}
              </div>
            )}

            {/* TAB CONTENT: HISTORY LIST (Always visible in History Tab, or Below active in Overview) */}
            <div className="space-y-4">
              {activeTab === 'history' || activeTab === 'overview' ? (
                <>
                  <h3 className="text-lg font-semibold flex items-center gap-2 mt-4">
                    <Clock size={20} className="text-gray-400" /> 
                    {activeTab === 'history' ? "Full History" : "Recent Activity"}
                  </h3>
                  
                  {MOCK_HISTORY.map((booking) => (
                    <div key={booking.id} className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-gray-100 dark:border-zinc-800 flex flex-col sm:flex-row gap-4 hover:shadow-md transition-shadow">
                      <img src={booking.image} alt={booking.car} className="w-full sm:w-32 h-20 object-cover rounded-lg" />
                      
                      <div className="flex-1 flex justify-between">
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-zinc-100">{booking.car}</h4>
                          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-zinc-400 mt-1">
                            <Calendar size={14} />
                            <span>{booking.startDate} - {booking.endDate}</span>
                          </div>
                          <p className="text-sm font-semibold mt-2">${booking.price}</p>
                        </div>

                        <div className="flex flex-col items-end justify-between">
                          {booking.status === 'active' ? (
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">Active</span>
                          ) : (
                            <span className="px-2 py-1 bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400 text-xs rounded-full font-medium">Completed</span>
                          )}
                          
                          <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
                            Invoice <ChevronRight size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : null}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;