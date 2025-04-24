
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CreateRide = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [seats, setSeats] = useState("4");
  const [price, setPrice] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // This would be replaced with API call to create a ride
    setTimeout(() => {
      toast({
        title: "Ride created!",
        description: "Your ride has been successfully posted.",
      });
      setLoading(false);
      navigate("/rider/dashboard");
    }, 1500);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-extrabold text-rideeasy-purple">RideEasy</span>
              </Link>
              <span className="ml-6 text-gray-400">|</span>
              <span className="ml-6 text-xl font-medium text-gray-900">Create a Ride</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/rider/dashboard">
                <Button variant="outline">Back to Dashboard</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="from">From</Label>
                  <Input
                    id="from"
                    placeholder="e.g. Mumbai"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="to">To</Label>
                  <Input
                    id="to"
                    placeholder="e.g. Pune"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Departure Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="seats">Available Seats</Label>
                  <Select defaultValue={seats} onValueChange={setSeats}>
                    <SelectTrigger id="seats">
                      <SelectValue placeholder="Select available seats" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Seat</SelectItem>
                      <SelectItem value="2">2 Seats</SelectItem>
                      <SelectItem value="3">3 Seats</SelectItem>
                      <SelectItem value="4">4 Seats</SelectItem>
                      <SelectItem value="5">5 Seats</SelectItem>
                      <SelectItem value="6">6 Seats</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price per Seat (₹)</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="e.g. 500"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="vehicle">Vehicle Details</Label>
                <Input
                  id="vehicle"
                  placeholder="e.g. Honda City, White, KA01AB1234"
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Additional Information (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Share any additional details about the ride..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="vehicle-images">Vehicle Images (Optional)</Label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="vehicle-images"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG (MAX. 5MB)</p>
                    </div>
                    <input id="vehicle-images" type="file" className="hidden" multiple accept="image/*" />
                  </label>
                </div>
              </div>
              
              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full bg-rideeasy-purple hover:bg-rideeasy-darkpurple"
                  disabled={loading}
                >
                  {loading ? "Creating Ride..." : "Create Ride"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CreateRide;
