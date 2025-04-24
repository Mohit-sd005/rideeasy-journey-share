
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Mock data
const mockRides = [
  {
    id: "ride-001",
    from: "Mumbai",
    to: "Pune",
    date: "2025-05-01",
    time: "08:00",
    seats: 3,
    price: 500,
    status: "active",
    passengers: []
  },
  {
    id: "ride-002",
    from: "Delhi",
    to: "Agra",
    date: "2025-05-05",
    time: "09:30",
    seats: 2,
    price: 600,
    status: "active",
    passengers: [
      {
        id: "user-005",
        name: "Priya Shah",
        status: "pending"
      }
    ]
  },
  {
    id: "ride-003",
    from: "Bangalore",
    to: "Mysore",
    date: "2025-04-30",
    time: "16:00",
    seats: 4,
    price: 450,
    status: "completed",
    passengers: [
      {
        id: "user-002",
        name: "Rahul Verma",
        status: "confirmed"
      },
      {
        id: "user-003",
        name: "Anjali Patel",
        status: "confirmed"
      }
    ]
  }
];

const mockRequests = [
  {
    id: "req-001",
    rideId: "ride-002",
    from: "Delhi",
    to: "Agra",
    date: "2025-05-05",
    passengerName: "Priya Shah",
    passengerRating: 4.8,
    status: "pending"
  }
];

const RiderDashboard = () => {
  const [rides, setRides] = useState(mockRides);
  const [requests, setRequests] = useState(mockRequests);
  const { toast } = useToast();
  
  const handleConfirmRequest = (requestId: string) => {
    // Update the request status
    setRequests(prevRequests => 
      prevRequests.map(req => 
        req.id === requestId ? { ...req, status: "confirmed" } : req
      )
    );
    
    // Update the passenger status in the associated ride
    setRides(prevRides => 
      prevRides.map(ride => {
        const request = requests.find(req => req.id === requestId);
        if (request && ride.id === request.rideId) {
          return {
            ...ride,
            passengers: ride.passengers.map(passenger => 
              passenger.id === request.passengerName ? 
                { ...passenger, status: "confirmed" } : 
                passenger
            )
          };
        }
        return ride;
      })
    );
    
    toast({
      title: "Request confirmed!",
      description: "You've accepted the passenger's request.",
    });
  };
  
  const handleRejectRequest = (requestId: string) => {
    // Remove the request
    setRequests(prevRequests => 
      prevRequests.filter(req => req.id !== requestId)
    );
    
    // Remove the passenger from the associated ride
    setRides(prevRides => 
      prevRides.map(ride => {
        const request = requests.find(req => req.id === requestId);
        if (request && ride.id === request.rideId) {
          return {
            ...ride,
            passengers: ride.passengers.filter(passenger => 
              passenger.id !== request.passengerName
            )
          };
        }
        return ride;
      })
    );
    
    toast({
      title: "Request rejected",
      description: "You've rejected the passenger's request.",
    });
  };

  const handleCompleteRide = (rideId: string) => {
    setRides(prevRides => 
      prevRides.map(ride => 
        ride.id === rideId ? { ...ride, status: "payment_pending" } : ride
      )
    );
    
    toast({
      title: "Ride completed!",
      description: "Please process the payment to finalize the ride.",
    });
  };
  
  const handleProcessPayment = (rideId: string) => {
    // Simulate payment processing
    toast({
      title: "Processing payment...",
      description: "Please wait while we process your payment.",
    });
    
    setTimeout(() => {
      setRides(prevRides => 
        prevRides.map(ride => 
          ride.id === rideId ? { ...ride, status: "completed" } : ride
        )
      );
      
      toast({
        title: "Payment successful!",
        description: "Your ride has been marked as completed.",
      });
    }, 2000);
  };
  
  const activeRides = rides.filter(ride => ride.status === "active");
  const pendingPaymentRides = rides.filter(ride => ride.status === "payment_pending");
  const completedRides = rides.filter(ride => ride.status === "completed");
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-extrabold text-rideeasy-purple">RideEasy</span>
              </Link>
              <span className="ml-6 text-gray-400">|</span>
              <span className="ml-6 text-xl font-medium text-gray-900">Rider Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="border-rideeasy-purple text-rideeasy-purple">
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
              <CardTitle className="text-sm font-medium text-gray-500">Active Rides</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{activeRides.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Pending Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{requests.filter(req => req.status === "pending").length}</div>
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
        
        {/* Create ride button */}
        <div className="mb-8">
          <Link to="/rider/create-ride">
            <Button className="bg-rideeasy-purple hover:bg-rideeasy-darkpurple text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Create New Ride
            </Button>
          </Link>
        </div>
        
        {/* Passenger requests section */}
        {requests.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Passenger Requests</h2>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="divide-y divide-gray-200">
                {requests.map(request => (
                  <div key={request.id} className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-rideeasy-purple/20 text-rideeasy-purple flex items-center justify-center font-bold">
                            {request.passengerName.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <h3 className="text-lg font-medium text-gray-900">{request.passengerName}</h3>
                            <div className="flex items-center mt-1">
                              <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, index) => (
                                  <svg 
                                    key={index}
                                    className={`h-4 w-4 ${index < Math.floor(request.passengerRating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                    fill="currentColor" 
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                                <span className="ml-1 text-sm text-gray-600">{request.passengerRating}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-sm text-gray-600">
                          Request for ride: {request.from} to {request.to}
                        </p>
                        <p className="text-sm text-gray-600">
                          Date: {new Date(request.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end space-x-4">
                      <Button 
                        variant="outline" 
                        className="border-red-500 text-red-500 hover:bg-red-50"
                        onClick={() => handleRejectRequest(request.id)}
                      >
                        Reject
                      </Button>
                      <Button 
                        className="bg-green-500 hover:bg-green-600 text-white"
                        onClick={() => handleConfirmRequest(request.id)}
                      >
                        Accept
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Rides section */}
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active">Active Rides</TabsTrigger>
            <TabsTrigger value="pending">Payment Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="mt-6">
            {activeRides.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">You don't have any active rides.</p>
                <Link to="/rider/create-ride">
                  <Button className="mt-4 bg-rideeasy-purple hover:bg-rideeasy-darkpurple">
                    Create a Ride
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeRides.map(ride => (
                  <Card key={ride.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="p-6 border-b border-gray-200">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">
                              {ride.from} to {ride.to}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {new Date(ride.date).toLocaleDateString()} at {ride.time}
                            </p>
                          </div>
                          <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                            Active
                          </div>
                        </div>
                        
                        <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Price</p>
                            <p className="font-medium">₹{ride.price}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Available Seats</p>
                            <p className="font-medium">{ride.seats}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Passengers</p>
                            <p className="font-medium">
                              {ride.passengers.filter(p => p.status === "confirmed").length}/{ride.seats}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-6 flex justify-between items-center">
                        <Link to={`/rider/ride/${ride.id}`}>
                          <Button variant="outline">View Details</Button>
                        </Link>
                        <Button 
                          className="bg-rideeasy-purple hover:bg-rideeasy-darkpurple"
                          onClick={() => handleCompleteRide(ride.id)}
                        >
                          Complete Ride
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="pending" className="mt-6">
            {pendingPaymentRides.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">You don't have any rides pending payment.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pendingPaymentRides.map(ride => (
                  <Card key={ride.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="p-6 border-b border-gray-200">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">
                              {ride.from} to {ride.to}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {new Date(ride.date).toLocaleDateString()} at {ride.time}
                            </p>
                          </div>
                          <div className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
                            Payment Pending
                          </div>
                        </div>
                        
                        <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Price</p>
                            <p className="font-medium">₹{ride.price}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Seats</p>
                            <p className="font-medium">{ride.seats}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Passengers</p>
                            <p className="font-medium">
                              {ride.passengers.filter(p => p.status === "confirmed").length}/{ride.seats}
                            </p>
                          </div>
                        </div>
                        
                        <div className="mt-4 p-4 bg-yellow-50 rounded-md">
                          <p className="text-sm text-yellow-700">
                            <span className="font-medium">Note:</span> Please process the payment to complete this ride.
                            Our commission is calculated based on distance and journey details.
                          </p>
                        </div>
                      </div>
                      
                      <div className="p-6 flex justify-end">
                        <Button 
                          className="bg-rideeasy-purple hover:bg-rideeasy-darkpurple"
                          onClick={() => handleProcessPayment(ride.id)}
                        >
                          Process Payment
                        </Button>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {completedRides.map(ride => (
                  <Card key={ride.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="p-6">
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
                        
                        <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Price</p>
                            <p className="font-medium">₹{ride.price}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Seats</p>
                            <p className="font-medium">{ride.seats}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Passengers</p>
                            <p className="font-medium">
                              {ride.passengers.filter(p => p.status === "confirmed").length}/{ride.seats}
                            </p>
                          </div>
                        </div>
                        
                        {ride.passengers.length > 0 && (
                          <div className="mt-4">
                            <p className="text-gray-600 text-sm">Passengers:</p>
                            <div className="mt-2 space-y-2">
                              {ride.passengers.map((passenger, index) => (
                                <div key={index} className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <div className="h-8 w-8 rounded-full bg-rideeasy-purple/20 text-rideeasy-purple flex items-center justify-center font-bold text-sm">
                                      {passenger.name.charAt(0)}
                                    </div>
                                    <span className="ml-2 text-sm">{passenger.name}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
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

export default RiderDashboard;
