
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

// Mock data
const mockRides = [
  {
    id: "ride-001",
    driverId: "driver-001",
    driverName: "Rohit Sharma",
    driverRating: 4.8,
    from: "Mumbai",
    to: "Pune",
    date: "2025-05-01",
    time: "08:00",
    availableSeats: 3,
    totalSeats: 4,
    price: 500,
    vehicle: "Honda City",
    vehicleImage: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
  },
  {
    id: "ride-002",
    driverId: "driver-002",
    driverName: "Ananya Desai",
    driverRating: 4.6,
    from: "Delhi",
    to: "Agra",
    date: "2025-05-05",
    time: "09:30",
    availableSeats: 2,
    totalSeats: 4,
    price: 600,
    vehicle: "Hyundai Creta",
    vehicleImage: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: "ride-003",
    driverId: "driver-003",
    driverName: "Karan Patel",
    driverRating: 4.9,
    from: "Bangalore",
    to: "Mysore",
    date: "2025-04-30",
    time: "16:00",
    availableSeats: 4,
    totalSeats: 4,
    price: 450,
    vehicle: "Maruti Suzuki Swift",
    vehicleImage: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  }
];

const mockMyRides = [
  {
    id: "booking-001",
    rideId: "ride-004",
    driverId: "driver-004",
    driverName: "Vikram Singh",
    driverRating: 4.7,
    from: "Chennai",
    to: "Pondicherry",
    date: "2025-05-10",
    time: "10:00",
    price: 550,
    status: "confirmed",
    vehicle: "Toyota Innova",
    driverPhone: "9876543210"
  }
];

const mockCompletedRides = [
  {
    id: "booking-002",
    rideId: "ride-005",
    driverId: "driver-005",
    driverName: "Meera Kapoor",
    driverRating: 4.9,
    userRated: true,
    userRating: 5,
    from: "Jaipur",
    to: "Udaipur",
    date: "2025-04-20",
    time: "07:30",
    price: 800,
    status: "completed",
    vehicle: "Mahindra XUV500"
  }
];

const PassengerDashboard = () => {
  const [availableRides, setAvailableRides] = useState(mockRides);
  const [myRides, setMyRides] = useState(mockMyRides);
  const [completedRides, setCompletedRides] = useState(mockCompletedRides);
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const { toast } = useToast();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would filter from the database
    toast({
      title: "Searching for rides",
      description: `Looking for rides from ${fromLocation} to ${toLocation}${searchDate ? ` on ${searchDate}` : ''}`,
    });
    
    // Simulate filtered results
    // In real app, this would be API call to filter rides
    setTimeout(() => {
      if (fromLocation.toLowerCase() === "mumbai" && toLocation.toLowerCase() === "pune") {
        setAvailableRides([mockRides[0]]);
      } else if (fromLocation.toLowerCase() === "delhi" && toLocation.toLowerCase() === "agra") {
        setAvailableRides([mockRides[1]]);
      } else if (fromLocation.toLowerCase() === "bangalore" && toLocation.toLowerCase() === "mysore") {
        setAvailableRides([mockRides[2]]);
      } else {
        setAvailableRides([]);
        toast({
          title: "No rides found",
          description: "We couldn't find any rides matching your criteria.",
        });
      }
    }, 1000);
  };
  
  const handleResetSearch = () => {
    setFromLocation("");
    setToLocation("");
    setSearchDate("");
    setAvailableRides(mockRides);
  };
  
  const handleBookRide = (rideId: string) => {
    // Find the ride to book
    const rideToBook = availableRides.find(ride => ride.id === rideId);
    
    if (!rideToBook) return;
    
    // Create a booking
    const booking = {
      id: `booking-${Date.now()}`,
      rideId: rideId,
      driverId: rideToBook.driverId,
      driverName: rideToBook.driverName,
      driverRating: rideToBook.driverRating,
      from: rideToBook.from,
      to: rideToBook.to,
      date: rideToBook.date,
      time: rideToBook.time,
      price: rideToBook.price,
      status: "pending",
      vehicle: rideToBook.vehicle,
      driverPhone: ""
    };
    
    // Add to my rides
    setMyRides(prev => [...prev, booking]);
    
    // Remove one seat from available rides
    setAvailableRides(prev => 
      prev.map(ride => 
        ride.id === rideId 
          ? { ...ride, availableSeats: ride.availableSeats - 1 }
          : ride
      )
    );
    
    toast({
      title: "Ride booked!",
      description: "Your booking request has been sent to the rider.",
    });
  };
  
  const handleCancelRide = (bookingId: string) => {
    // Find the booking to cancel
    const bookingToCancel = myRides.find(ride => ride.id === bookingId);
    
    if (!bookingToCancel) return;
    
    // Remove from my rides
    setMyRides(prev => prev.filter(ride => ride.id !== bookingId));
    
    // Add the seat back to available rides if the ride still exists
    setAvailableRides(prev => 
      prev.map(ride => 
        ride.id === bookingToCancel.rideId 
          ? { ...ride, availableSeats: ride.availableSeats + 1 }
          : ride
      )
    );
    
    toast({
      title: "Ride cancelled",
      description: "Your booking has been cancelled.",
    });
  };
  
  const handleRateRide = (bookingId: string, rating: number) => {
    setCompletedRides(prev => 
      prev.map(ride => 
        ride.id === bookingId 
          ? { ...ride, userRated: true, userRating: rating }
          : ride
      )
    );
    
    toast({
      title: "Thank you for your rating!",
      description: `You rated ${completedRides.find(ride => ride.id === bookingId)?.driverName} ${rating} stars.`,
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-extrabold text-rideeasy-blue">RideEasy</span>
              </Link>
              <span className="ml-6 text-gray-400">|</span>
              <span className="ml-6 text-xl font-medium text-gray-900">Passenger Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="border-rideeasy-blue text-rideeasy-blue">
                Profile
              </Button>
              <Button variant="ghost">Logout</Button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Stats section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Available Rides</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{availableRides.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">My Active Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{myRides.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Completed Rides</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{completedRides.length}</div>
            </CardContent>
          </Card>
        </div>
        
        {/* Search section */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Find a Ride</h2>
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-1">
                  From
                </label>
                <Input
                  id="from"
                  type="text"
                  placeholder="e.g. Mumbai"
                  value={fromLocation}
                  onChange={(e) => setFromLocation(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-1">
                  To
                </label>
                <Input
                  id="to"
                  type="text"
                  placeholder="e.g. Pune"
                  value={toLocation}
                  onChange={(e) => setToLocation(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  Date (Optional)
                </label>
                <Input
                  id="date"
                  type="date"
                  value={searchDate}
                  onChange={(e) => setSearchDate(e.target.value)}
                />
              </div>
              <div className="flex items-end space-x-2">
                <Button 
                  type="submit" 
                  className="bg-rideeasy-blue hover:bg-rideeasy-darkblue"
                >
                  Search
                </Button>
                {(fromLocation || toLocation || searchDate) && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleResetSearch}
                  >
                    Reset
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
        
        {/* Rides section */}
        <Tabs defaultValue="available" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="available">Available Rides</TabsTrigger>
            <TabsTrigger value="my-rides">My Rides</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="available" className="mt-6">
            {availableRides.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No rides available for your search criteria.</p>
                <Button 
                  className="mt-4 bg-rideeasy-blue hover:bg-rideeasy-darkblue"
                  onClick={handleResetSearch}
                >
                  View All Rides
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {availableRides.map(ride => (
                  <Card key={ride.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="md:flex">
                        <div className="md:w-1/3 h-48 md:h-auto relative">
                          <img
                            src={ride.vehicleImage}
                            alt={ride.vehicle}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                            <p className="text-white font-medium">{ride.vehicle}</p>
                          </div>
                        </div>
                        
                        <div className="p-6 md:w-2/3">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">
                                {ride.from} to {ride.to}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {new Date(ride.date).toLocaleDateString()} at {ride.time}
                              </p>
                            </div>
                            <div className="text-lg font-bold text-rideeasy-darkpurple">
                              ₹{ride.price}
                            </div>
                          </div>
                          
                          <div className="mt-4 flex items-center">
                            <div className="h-10 w-10 rounded-full bg-rideeasy-blue/20 text-rideeasy-blue flex items-center justify-center font-bold">
                              {ride.driverName.charAt(0)}
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium">{ride.driverName}</p>
                              <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, index) => (
                                  <svg 
                                    key={index}
                                    className={`h-4 w-4 ${index < Math.floor(ride.driverRating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                    fill="currentColor" 
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                                <span className="ml-1 text-sm text-gray-600">{ride.driverRating}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex justify-between items-center">
                            <div>
                              <p className="text-sm text-gray-600">
                                {ride.availableSeats} of {ride.totalSeats} seats available
                              </p>
                            </div>
                            <Button 
                              className="bg-rideeasy-blue hover:bg-rideeasy-darkblue"
                              onClick={() => handleBookRide(ride.id)}
                              disabled={ride.availableSeats === 0}
                            >
                              {ride.availableSeats === 0 ? 'Full' : 'Book Seat'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="my-rides" className="mt-6">
            {myRides.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">You haven't booked any rides yet.</p>
                <Button 
                  className="mt-4 bg-rideeasy-blue hover:bg-rideeasy-darkblue"
                  onClick={() => document.querySelector('[data-value="available"]')?.click()}
                >
                  Browse Available Rides
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {myRides.map(ride => (
                  <Card key={ride.id} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            {ride.from} to {ride.to}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {new Date(ride.date).toLocaleDateString()} at {ride.time}
                          </p>
                        </div>
                        <div 
                          className={`text-xs font-medium px-2.5 py-0.5 rounded ${
                            ride.status === 'confirmed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
                        </div>
                      </div>
                      
                      <div className="mt-4 flex items-center">
                        <div className="h-10 w-10 rounded-full bg-rideeasy-blue/20 text-rideeasy-blue flex items-center justify-center font-bold">
                          {ride.driverName.charAt(0)}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium">{ride.driverName}</p>
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, index) => (
                              <svg 
                                key={index}
                                className={`h-4 w-4 ${index < Math.floor(ride.driverRating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                fill="currentColor" 
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                            <span className="ml-1 text-sm text-gray-600">{ride.driverRating}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Price</p>
                          <p className="font-medium">₹{ride.price}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Vehicle</p>
                          <p className="font-medium">{ride.vehicle}</p>
                        </div>
                        {ride.status === 'confirmed' && (
                          <div>
                            <p className="text-gray-500">Driver Phone</p>
                            <p className="font-medium">{ride.driverPhone || "Not available yet"}</p>
                          </div>
                        )}
                      </div>
                      
                      {ride.status === 'pending' && (
                        <div className="mt-4 p-4 bg-yellow-50 rounded-md">
                          <p className="text-sm text-yellow-700">
                            <span className="font-medium">Note:</span> Your booking request is pending approval 
                            from the rider. You'll receive a notification once it's confirmed.
                          </p>
                        </div>
                      )}
                      
                      <div className="mt-6 flex justify-end">
                        {ride.status === 'pending' && (
                          <Button 
                            variant="outline" 
                            className="border-red-500 text-red-500 hover:bg-red-50"
                            onClick={() => handleCancelRide(ride.id)}
                          >
                            Cancel Booking
                          </Button>
                        )}
                        {ride.status === 'confirmed' && (
                          <Link to={`/passenger/ride/${ride.id}`}>
                            <Button className="bg-rideeasy-blue hover:bg-rideeasy-darkblue">
                              View Details
                            </Button>
                          </Link>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="completed" className="mt-6">
            {completedRides.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">You don't have any completed rides yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {completedRides.map(ride => (
                  <Card key={ride.id} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            {ride.from} to {ride.to}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {new Date(ride.date).toLocaleDateString()} at {ride.time}
                          </p>
                        </div>
                        <div className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          Completed
                        </div>
                      </div>
                      
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-rideeasy-blue/20 text-rideeasy-blue flex items-center justify-center font-bold">
                            {ride.driverName.charAt(0)}
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium">{ride.driverName}</p>
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, index) => (
                                <svg 
                                  key={index}
                                  className={`h-4 w-4 ${index < Math.floor(ride.driverRating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                  fill="currentColor" 
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                              <span className="ml-1 text-sm text-gray-600">{ride.driverRating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-lg font-bold text-rideeasy-darkpurple">
                          ₹{ride.price}
                        </div>
                      </div>
                      
                      {!ride.userRated && (
                        <div className="mt-6">
                          <p className="text-sm font-medium text-gray-700 mb-2">Rate your experience:</p>
                          <div className="flex space-x-2">
                            {[1, 2, 3, 4, 5].map((rating) => (
                              <button
                                key={rating}
                                type="button"
                                onClick={() => handleRateRide(ride.id, rating)}
                                className="p-1 rounded-full hover:bg-gray-100"
                              >
                                <svg 
                                  className="h-8 w-8 text-gray-300 hover:text-yellow-400" 
                                  fill="currentColor" 
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {ride.userRated && (
                        <div className="mt-6">
                          <p className="text-sm font-medium text-gray-700 mb-2">Your rating:</p>
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, index) => (
                              <svg 
                                key={index}
                                className={`h-6 w-6 ${index < ride.userRating ? 'text-yellow-400' : 'text-gray-300'}`}
                                fill="currentColor" 
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default PassengerDashboard;
