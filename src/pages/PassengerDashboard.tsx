
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import DashboardHeader from "@/components/DashboardHeader";

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

// Sample data - In a real app, this would come from an API
const availableRides = [
  {
    id: "ride1",
    from: "Mumbai",
    to: "Pune",
    date: "2023-07-15T08:00:00",
    price: 450,
    seats: 3,
    rider: {
      id: "rider1",
      name: "Amit Kumar",
      rating: 4.8,
      trips: 124,
      avatar: "https://i.pravatar.cc/150?u=amit",
      verified: true,
      vehicle: {
        make: "Honda",
        model: "City",
        year: 2020,
        color: "Silver",
        image: "https://i.pravatar.cc/300?u=hondacity",
      },
    },
    route: [
      { point: "Mumbai Central", time: "08:00 AM" },
      { point: "Dadar", time: "08:30 AM" },
      { point: "Thane", time: "09:15 AM" },
      { point: "Panvel", time: "10:00 AM" },
      { point: "Lonavala", time: "11:30 AM" },
      { point: "Pune", time: "01:00 PM" },
    ],
  },
  {
    id: "ride2",
    from: "Bangalore",
    to: "Chennai",
    date: "2023-07-16T07:30:00",
    price: 650,
    seats: 2,
    rider: {
      id: "rider2",
      name: "Priya Singh",
      rating: 4.9,
      trips: 87,
      avatar: "https://i.pravatar.cc/150?u=priya",
      verified: true,
      vehicle: {
        make: "Toyota",
        model: "Innova",
        year: 2021,
        color: "White",
        image: "https://i.pravatar.cc/300?u=toyotainnova",
      },
    },
    route: [
      { point: "Bangalore Electronic City", time: "07:30 AM" },
      { point: "Hosur", time: "08:15 AM" },
      { point: "Krishnagiri", time: "09:30 AM" },
      { point: "Vellore", time: "11:00 AM" },
      { point: "Chennai", time: "01:30 PM" },
    ],
  },
  {
    id: "ride3",
    from: "Delhi",
    to: "Jaipur",
    date: "2023-07-17T06:45:00",
    price: 550,
    seats: 4,
    rider: {
      id: "rider3",
      name: "Rajesh Verma",
      rating: 4.7,
      trips: 56,
      avatar: "https://i.pravatar.cc/150?u=rajesh",
      verified: true,
      vehicle: {
        make: "Maruti Suzuki",
        model: "Ertiga",
        year: 2022,
        color: "Blue",
        image: "https://i.pravatar.cc/300?u=marutiertiga",
      },
    },
    route: [
      { point: "Delhi Connaught Place", time: "06:45 AM" },
      { point: "Gurgaon", time: "07:30 AM" },
      { point: "Manesar", time: "08:15 AM" },
      { point: "Neemrana", time: "09:45 AM" },
      { point: "Jaipur", time: "12:00 PM" },
    ],
  },
];

const bookedRides = [
  {
    id: "book1",
    from: "Hyderabad",
    to: "Warangal",
    date: "2023-07-20T09:15:00",
    status: "confirmed",
    price: 350,
    rider: {
      id: "rider4",
      name: "Karthik Reddy",
      rating: 4.6,
      trips: 43,
      avatar: "https://i.pravatar.cc/150?u=karthik",
      contact: "+91 9876543210",
    },
  },
  {
    id: "book2",
    from: "Kolkata",
    to: "Siliguri",
    date: "2023-07-25T07:00:00",
    status: "pending",
    price: 850,
    rider: {
      id: "rider5",
      name: "Anjali Das",
      rating: 4.9,
      trips: 112,
      avatar: "https://i.pravatar.cc/150?u=anjali",
    },
  },
];

const rideHistory = [
  {
    id: "hist1",
    from: "Ahmedabad",
    to: "Vadodara",
    date: "2023-06-10T10:00:00",
    price: 250,
    rider: {
      id: "rider6",
      name: "Nikhil Patel",
      rating: 4.8,
      avatar: "https://i.pravatar.cc/150?u=nikhil",
    },
    userRated: true,
  },
  {
    id: "hist2",
    from: "Lucknow",
    to: "Kanpur",
    date: "2023-06-05T14:30:00",
    price: 180,
    rider: {
      id: "rider7",
      name: "Vikram Singh",
      rating: 4.7,
      avatar: "https://i.pravatar.cc/150?u=vikram",
    },
    userRated: false,
  },
  {
    id: "hist3",
    from: "Chandigarh",
    to: "Shimla",
    date: "2023-05-22T07:15:00",
    price: 600,
    rider: {
      id: "rider8",
      name: "Manpreet Kaur",
      rating: 4.9,
      avatar: "https://i.pravatar.cc/150?u=manpreet",
    },
    userRated: true,
  },
];

const PassengerDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeRide, setActiveRide] = useState<any>(null);
  const [showRideDetails, setShowRideDetails] = useState(false);
  const [showRiderProfile, setShowRiderProfile] = useState(false);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [ratingDialogOpen, setRatingDialogOpen] = useState(false);
  const [ratingValue, setRatingValue] = useState(5);
  const [rideToRate, setRideToRate] = useState<any>(null);

  const handleViewRide = (ride: any) => {
    setActiveRide(ride);
    setShowRideDetails(true);
  };

  const handleViewRider = (ride: any) => {
    setActiveRide(ride);
    setShowRiderProfile(true);
  };

  const handleBookRide = (ride: any) => {
    setActiveRide(ride);
    setBookingDialogOpen(true);
  };

  const confirmBooking = () => {
    toast({
      title: "Ride Booked!",
      description: `Your ride from ${activeRide.from} to ${activeRide.to} has been requested. Waiting for rider confirmation.`,
    });
    setBookingDialogOpen(false);
  };

  const handleRateRide = (ride: any) => {
    setRideToRate(ride);
    setRatingDialogOpen(true);
  };

  const submitRating = () => {
    toast({
      title: "Thank you for your feedback!",
      description: `You rated ${rideToRate.rider.name} with ${ratingValue} stars.`,
    });
    setRatingDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader
        type="passenger"
        name="John Doe"
        avatar="https://i.pravatar.cc/150?u=johndoe"
      />

      <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Tabs defaultValue="available" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="available">Available Rides</TabsTrigger>
            <TabsTrigger value="booked">Booked Rides</TabsTrigger>
            <TabsTrigger value="history">Ride History</TabsTrigger>
          </TabsList>

          {/* Available Rides Tab */}
          <TabsContent value="available" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableRides.map((ride) => (
                <Card
                  key={ride.id}
                  className="ride-card overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="bg-rideeasy-purple text-white p-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-bold">{ride.from} → {ride.to}</h3>
                      <p className="text-sm opacity-90">{formatDate(ride.date)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold">₹{ride.price}</p>
                      <p className="text-sm">{ride.seats} seats</p>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3 mb-4">
                      <Avatar>
                        <AvatarImage src={ride.rider.avatar} alt={ride.rider.name} />
                        <AvatarFallback>{ride.rider.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center">
                          <h4 className="font-medium">{ride.rider.name}</h4>
                          {ride.rider.verified && (
                            <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <span className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 text-yellow-500 mr-1"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            {ride.rider.rating}
                          </span>
                          <span className="mx-2">•</span>
                          <span>{ride.rider.trips} trips</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleViewRide(ride)}
                      >
                        View Details
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleViewRider(ride)}
                      >
                        View Profile
                      </Button>
                      <Button
                        className="w-full mt-2 bg-rideeasy-purple hover:bg-rideeasy-darkpurple"
                        onClick={() => handleBookRide(ride)}
                      >
                        Book Ride
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Booked Rides Tab */}
          <TabsContent value="booked" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bookedRides.map((ride) => (
                <Card key={ride.id} className="ride-card">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-lg">{ride.from} → {ride.to}</h3>
                        <p className="text-sm text-gray-500">{formatDate(ride.date)}</p>
                      </div>
                      <Badge
                        className={
                          ride.status === "confirmed"
                            ? "bg-green-100 text-green-800 border-green-200"
                            : "bg-yellow-100 text-yellow-800 border-yellow-200"
                        }
                      >
                        {ride.status === "confirmed" ? "Confirmed" : "Pending"}
                      </Badge>
                    </div>

                    <div className="flex items-center space-x-3 mb-4">
                      <Avatar>
                        <AvatarImage src={ride.rider.avatar} alt={ride.rider.name} />
                        <AvatarFallback>{ride.rider.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{ride.rider.name}</h4>
                        <div className="flex items-center text-sm text-gray-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-yellow-500 mr-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          {ride.rider.rating}
                        </div>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="flex justify-between items-center">
                      <div className="text-lg font-bold">₹{ride.price}</div>
                      {ride.status === "confirmed" && ride.rider.contact && (
                        <Button
                          onClick={() => {
                            // This is the line that needs to be fixed - we'll use window.location.href instead of .click()
                            window.location.href = `tel:${ride.rider.contact}`;
                          }}
                          variant="outline"
                          className="text-rideeasy-purple border-rideeasy-purple"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 8V5z"
                            />
                          </svg>
                          Call Rider
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Ride History Tab */}
          <TabsContent value="history" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {rideHistory.map((ride) => (
                <Card key={ride.id} className="ride-card">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-lg">{ride.from} → {ride.to}</h3>
                        <p className="text-sm text-gray-500">{formatDate(ride.date)}</p>
                      </div>
                      <div className="text-lg font-bold">₹{ride.price}</div>
                    </div>

                    <div className="flex items-center space-x-3 mb-4">
                      <Avatar>
                        <AvatarImage src={ride.rider.avatar} alt={ride.rider.name} />
                        <AvatarFallback>{ride.rider.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{ride.rider.name}</h4>
                        <div className="flex items-center text-sm text-gray-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-yellow-500 mr-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          {ride.rider.rating}
                        </div>
                      </div>
                    </div>

                    {!ride.userRated && (
                      <Button
                        className="w-full mt-2 bg-rideeasy-purple hover:bg-rideeasy-darkpurple"
                        onClick={() => handleRateRide(ride)}
                      >
                        Rate this Ride
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Ride Details Dialog */}
      {activeRide && (
        <Dialog open={showRideDetails} onOpenChange={setShowRideDetails}>
          <DialogContent className="max-w-md mx-auto">
            <DialogHeader>
              <DialogTitle>Ride Details</DialogTitle>
              <DialogDescription>
                From {activeRide.from} to {activeRide.to} on{" "}
                {formatDate(activeRide.date)}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">Route Information</h3>
                  <Badge className="bg-rideeasy-purple">
                    {activeRide.route?.length} stops
                  </Badge>
                </div>
                <div className="space-y-3 relative pl-6">
                  <div className="absolute left-0 top-1 bottom-1 w-0.5 bg-gray-200"></div>
                  {activeRide.route?.map((stop: any, index: number) => (
                    <div key={index} className="relative">
                      <div
                        className={`absolute -left-6 top-1 w-4 h-4 rounded-full ${
                          index === 0
                            ? "bg-green-500"
                            : index === activeRide.route.length - 1
                            ? "bg-red-500"
                            : "bg-blue-500"
                        }`}
                      ></div>
                      <div className="flex justify-between">
                        <span
                          className={`font-medium ${
                            index === 0 || index === activeRide.route.length - 1
                              ? "text-gray-700"
                              : ""
                          }`}
                        >
                          {stop.point}
                        </span>
                        <span className="text-gray-500 text-sm">{stop.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold text-lg mb-2">Price Details</h3>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span>Base fare</span>
                    <span>₹{Math.round(activeRide.price * 0.9)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Service fee</span>
                    <span>₹{Math.round(activeRide.price * 0.1)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>₹{activeRide.price}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Vehicle Information</h3>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex mb-2">
                    <span className="w-24 text-gray-500">Make</span>
                    <span>{activeRide.rider.vehicle?.make}</span>
                  </div>
                  <div className="flex mb-2">
                    <span className="w-24 text-gray-500">Model</span>
                    <span>{activeRide.rider.vehicle?.model}</span>
                  </div>
                  <div className="flex mb-2">
                    <span className="w-24 text-gray-500">Year</span>
                    <span>{activeRide.rider.vehicle?.year}</span>
                  </div>
                  <div className="flex">
                    <span className="w-24 text-gray-500">Color</span>
                    <span>{activeRide.rider.vehicle?.color}</span>
                  </div>
                </div>
                {activeRide.rider.vehicle?.image && (
                  <img
                    src={activeRide.rider.vehicle.image}
                    alt="Vehicle"
                    className="w-full h-40 object-cover rounded-lg mt-3"
                  />
                )}
              </div>
            </div>
            <DialogFooter>
              <Button
                className="w-full bg-rideeasy-purple hover:bg-rideeasy-darkpurple"
                onClick={() => {
                  setShowRideDetails(false);
                  handleBookRide(activeRide);
                }}
              >
                Book this Ride
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Rider Profile Dialog */}
      {activeRide && (
        <Dialog open={showRiderProfile} onOpenChange={setShowRiderProfile}>
          <DialogContent className="max-w-md mx-auto">
            <DialogHeader>
              <DialogTitle>Rider Profile</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <div className="flex items-center space-x-4 mb-6">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={activeRide.rider.avatar} alt={activeRide.rider.name} />
                  <AvatarFallback>{activeRide.rider.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-bold">{activeRide.rider.name}</h2>
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-yellow-500 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="mr-2">{activeRide.rider.rating}</span>
                    <span className="text-gray-500">
                      {activeRide.rider.trips} trips
                    </span>
                  </div>
                </div>
              </div>

              {activeRide.rider.verified && (
                <div className="mb-6 p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center text-green-800">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    <div>
                      <span className="font-medium">Verified Rider</span>
                      <p className="text-sm text-green-700">
                        Identity and documents verified by RideEasy
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-3">About {activeRide.rider.name}</h3>
                <p className="text-gray-700">
                  {activeRide.rider.name} has been a trusted RideEasy rider for many
                  years, completing {activeRide.rider.trips} trips with an average
                  rating of {activeRide.rider.rating} stars.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3">Reviews</h3>
                <div className="space-y-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-yellow-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-yellow-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-yellow-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-yellow-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-yellow-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm ml-2">1 month ago</span>
                    </div>
                    <p className="text-sm">
                      Great driver! Very professional and on time. The car was clean
                      and comfortable. Would definitely ride with them again.
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-yellow-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-yellow-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-yellow-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-yellow-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-300"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm ml-2">3 months ago</span>
                    </div>
                    <p className="text-sm">
                      Had a pleasant journey. Driver was courteous and the ride was
                      comfortable.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                className="w-full bg-rideeasy-purple hover:bg-rideeasy-darkpurple"
                onClick={() => {
                  setShowRiderProfile(false);
                  handleBookRide(activeRide);
                }}
              >
                Book this Ride
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Booking Dialog */}
      {activeRide && (
        <Dialog open={bookingDialogOpen} onOpenChange={setBookingDialogOpen}>
          <DialogContent className="max-w-md mx-auto">
            <DialogHeader>
              <DialogTitle>Confirm Booking</DialogTitle>
              <DialogDescription>
                You are about to book a ride from {activeRide.from} to{" "}
                {activeRide.to}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="mb-4">
                <h3 className="font-semibold text-lg mb-2">Trip Summary</h3>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">From</span>
                    <span className="font-medium">{activeRide.from}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">To</span>
                    <span className="font-medium">{activeRide.to}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Date & Time</span>
                    <span className="font-medium">{formatDate(activeRide.date)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Seats</span>
                    <span className="font-medium">1</span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold text-lg mb-2">Price Breakdown</h3>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span>Ride fare</span>
                    <span>₹{Math.round(activeRide.price * 0.9)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Service fee</span>
                    <span>₹{Math.round(activeRide.price * 0.1)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>₹{activeRide.price}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  You'll only pay once the rider confirms your booking request
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Cancellation Policy</h3>
                <p className="text-sm text-gray-700 mb-3">
                  Free cancellation up to 24 hours before the ride. After that, a
                  cancellation fee of 30% will apply.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button
                className="w-full bg-rideeasy-purple hover:bg-rideeasy-darkpurple"
                onClick={confirmBooking}
              >
                Confirm Booking
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Rating Dialog */}
      {rideToRate && (
        <Dialog open={ratingDialogOpen} onOpenChange={setRatingDialogOpen}>
          <DialogContent className="max-w-md mx-auto">
            <DialogHeader>
              <DialogTitle>Rate Your Experience</DialogTitle>
              <DialogDescription>
                How was your ride with {rideToRate.rider.name}?
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="flex justify-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRatingValue(star)}
                    className="focus:outline-none mx-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-8 w-8 ${
                        star <= ratingValue
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                ))}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="feedback"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Your feedback (optional)
                </label>
                <textarea
                  id="feedback"
                  className="w-full h-24 p-2 border border-gray-300 rounded-md focus:ring-rideeasy-purple focus:border-rideeasy-purple"
                  placeholder="Tell us about your experience..."
                ></textarea>
              </div>
            </div>
            <DialogFooter>
              <Button
                className="w-full bg-rideeasy-purple hover:bg-rideeasy-darkpurple"
                onClick={submitRating}
              >
                Submit Rating
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default PassengerDashboard;
