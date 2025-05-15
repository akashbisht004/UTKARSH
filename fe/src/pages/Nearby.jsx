import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, ChevronRight, Navigation, Crosshair, Calendar, Loader2 } from 'lucide-react';
import axios from 'axios';
import {BASE} from '@/url/baseurl';

function Nearby() {
  const [searchQueryPin, setSearchQueryPin] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [isValidPincode, setIsValidPincode] = useState(true);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handlePincodeChange = (e) => {
    const value = e.target.value;
    // Only allow numbers and limit to 6 digits
    if (/^\d*$/.test(value) && value.length <= 6) {
      setSearchQueryPin(value);
      setIsValidPincode(value.length === 6);
    }
  };

  const getCurrentLocation = () => {
    setIsLocating(true);
    setLocationError(null);
    
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log(latitude, longitude);
        setUserLocation({ latitude, longitude });
        setIsLocating(false);
        
        async function getHospitals() {
            let response = await axios.get(`${BASE}/getHospitals/${latitude}/${longitude}`,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })

            if(response.data!=null) {
                setHospitals(response.data)
                console.log(response.data)
            }
        }
        getHospitals()
      },
      (error) => {
        setLocationError("Unable to retrieve your location. Please try again or enter pincode manually.");
        setIsLocating(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
    
  };

  const pincodeToCoordinates = async (pincode) => {
    let response = await axios.get(`https://nominatim.openstreetmap.org/search?postalcode=${pincode}&country=India&format=json`)
    const data = response.data
    
    if(data.length > 0) {
        console.log(data)
        return {
            latitude: data[0].lat,
            longitude: data[0].lon
        }
    }
    return null
  }

  const handleLocationSearch = async() => {
    if (searchQueryPin.length !== 6) {
      setIsValidPincode(false);
      return;
    }
    setIsSearching(true);
    try {
      let coordinates = await pincodeToCoordinates(searchQueryPin)
      if (!coordinates) {
        setLocationError("Invalid pincode or location not found");
        setIsSearching(false);
        return;
      }

      //get hospitals from the api
      async function getHospitals() {
          let response = await axios.get(`${BASE}/getHospitals/${coordinates.latitude}/${coordinates.longitude}`,{
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem('token')}`
              }
          })

          if(response.data!=null) {
              setHospitals(response.data)
              console.log(response.data)
          }
      }
      await getHospitals();
    } catch (error) {
      console.error('Error searching hospitals:', error);
      setLocationError("Error searching hospitals. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };



  const handleBookAppointment = async (hospital) => {
    try {
      console.log(hospital)
      let response = await axios.get(`${BASE}/bookAppointment/${hospital.id}`,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })

      if(response.data===true) {
        setShowSuccessPopup(true);
        setTimeout(() => setShowSuccessPopup(false), 3000);
      }
      else{
        console.log(response.data)
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Find Nearby Hospitals
          </h1>
          <p className="text-muted-foreground">
            Enter your pincode or use current location
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card p-4 rounded-lg border border-primary/20 shadow-sm mb-6"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                placeholder="Enter 6-digit pincode"
                value={searchQueryPin}
                onChange={handlePincodeChange}
                className={`w-full pl-9 pr-4 py-2 rounded-lg bg-background border ${
                  isValidPincode ? 'border-primary/20' : 'border-red-500'
                } focus:border-primary focus:outline-none text-sm`}
              />
              
              {!isValidPincode && searchQueryPin.length > 0 && (
                <p className="text-red-500 text-xs mt-1">
                  Please enter a valid 6-digit pincode
                </p>
              )}
              {locationError && (
                <p className="text-red-500 text-xs mt-1">
                  {locationError}
                </p>
              )}
            </div>
            
            <div className="flex gap-3">
              <motion.button
                onClick={handleLocationSearch}
                disabled={!isValidPincode || searchQueryPin.length !== 6 || isSearching}
                className={`bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm ${
                  (!isValidPincode || searchQueryPin.length !== 6 || isSearching) 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-primary/90'
                } transition-colors flex items-center gap-2 min-w-[100px] justify-center`}
                whileHover={!isSearching ? { scale: 1.02 } : {}}
                whileTap={!isSearching ? { scale: 0.98 } : {}}
              >
                {isSearching ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <MapPin className="w-4 h-4" />
                    <span>Search</span>
                  </>
                )}
              </motion.button>
              <button 
                onClick={getCurrentLocation}
                disabled={isLocating}
                className={`bg-background text-foreground px-4 py-2 rounded-lg text-sm ${
                  isLocating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/5'
                } transition-colors flex items-center gap-2 border border-primary/20`}
              >
                <Crosshair className={`w-4 h-4 ${isLocating ? 'animate-spin' : ''}`} />
                {isLocating ? 'Locating...' : 'Current Location'}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Hospitals List or Empty State */}
        <AnimatePresence mode="wait">
          {hospitals.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-card p-8 rounded-lg border border-primary/20 shadow-sm text-center"
            >
              <div className="text-muted-foreground mb-4">
                No hospitals found, Enter your pincode or use current location
              </div>
              <button
                onClick={handleLocationSearch}
                className="text-primary hover:text-primary/80 transition-colors text-sm py-2 px-4 rounded-lg bg-primary/10 hover:bg-primary/20"
              >
                Try again
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {hospitals.map((hospital, index) => (
                <motion.div
                  key={hospital.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.3 + index * 0.1,
                    duration: 0.5,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                  className="bg-gradient-to-br from-primary/5 to-background rounded-xl border border-primary/20 shadow-md overflow-hidden"
                >
                  <div className="p-5">
                    <motion.div 
                      className="flex items-center justify-between mb-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      <h2 className="text-xl font-semibold text-foreground">
                        {hospital.tags.name}
                      </h2>
                      {hospital.tags.emergency === "yes" && (
                        <motion.span 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ 
                            type: "spring",
                            stiffness: 200,
                            delay: 0.5 + index * 0.1
                          }}
                          className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-medium shadow-sm"
                        >
                          Emergency
                        </motion.span>
                      )}
                    </motion.div>
                    
                    <motion.div 
                      className="space-y-3 text-sm text-muted-foreground"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="text-foreground">{hospital.tags["addr:full"]}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <motion.span 
                          whileHover={{ scale: 1.05 }}
                          className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium"
                        >
                          {hospital.tags["addr:postcode"]}
                        </motion.span>
                        <motion.span 
                          whileHover={{ scale: 1.05 }}
                          className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium"
                        >
                          {hospital.tags["addr:state"]}
                        </motion.span>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="mt-6 flex gap-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          window.open(`https://www.google.com/maps?q=${hospital.lat},${hospital.lon}`, '_blank');
                        }}
                        className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shadow-sm"
                      >
                        <Navigation className="w-4 h-4" />
                        Directions
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedHospital(hospital)}
                        className="flex-1 bg-background text-foreground px-4 py-2 rounded-lg text-sm hover:bg-primary/5 transition-colors flex items-center justify-center gap-2 border border-primary/20 shadow-sm"
                      >
                        Details
                        <ChevronRight className="w-4 h-4" />
                      </motion.button>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* Success Popup */}
        <AnimatePresence>
          {showSuccessPopup && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-4 right-4 z-[100]"
            >
              <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-xl flex items-center gap-2 backdrop-blur-0">
                <Calendar className="w-5 h-5" />
                <span>Appointment booked successfully!</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hospital Details Modal */}
        <AnimatePresence>
          {selectedHospital && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedHospital(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="bg-gradient-to-br from-primary/5 to-background rounded-xl border border-primary/20 shadow-lg max-w-md w-full p-5"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-5">
                  <h2 className="text-xl font-semibold text-foreground">
                    {selectedHospital.tags.name}
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedHospital(null)}
                    className="text-muted-foreground hover:text-foreground text-sm"
                  >
                    ✕
                  </motion.button>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <motion.div 
                      className="space-y-1"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <p className="text-muted-foreground">Address</p>
                      <p className="text-foreground">{selectedHospital.tags["addr:full"]}</p>
                    </motion.div>
                    <motion.div 
                      className="space-y-1"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <p className="text-muted-foreground">Pincode</p>
                      <p className="text-foreground">{selectedHospital.tags["addr:postcode"]}</p>
                    </motion.div>
                    <motion.div 
                      className="space-y-1"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <p className="text-muted-foreground">State</p>
                      <p className="text-foreground">{selectedHospital.tags["addr:state"]}</p>
                    </motion.div>
                    <motion.div 
                      className="space-y-1"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <p className="text-muted-foreground">District</p>
                      <p className="text-foreground">{selectedHospital.tags["addr:district"]}</p>
                    </motion.div>
                  </div>
                  <motion.div 
                    className="pt-4 space-y-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        window.open(`https://www.google.com/maps?q=${selectedHospital.lat},${selectedHospital.lon}`, '_blank');
                      }}
                      className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shadow-sm"
                    >
                      <Navigation className="w-4 h-4" />
                      Open in Maps
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleBookAppointment(selectedHospital)}
                      className="w-full bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600 transition-colors flex items-center justify-center gap-2 shadow-sm"
                    >
                      <Calendar className="w-4 h-4" />
                      Book Appointment
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Nearby;
