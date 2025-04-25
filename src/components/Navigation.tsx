
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  return (
    <nav className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
      <Link to="/" className="flex items-center space-x-2">
        <span className="text-2xl font-extrabold text-rideeasy-purple">RideEasy</span>
      </Link>
      
      <div className="hidden md:flex items-center space-x-6">
        <Link to="/about" className="text-gray-600 hover:text-rideeasy-purple transition-colors">
          About
        </Link>
        <Link to="/how-it-works" className="text-gray-600 hover:text-rideeasy-purple transition-colors">
          How It Works
        </Link>
        <Link to="/contact" className="text-gray-600 hover:text-rideeasy-purple transition-colors">
          Contact
        </Link>
        <div className="flex space-x-2">
          <Link to="/login/passenger">
            <Button variant="outline" className="border-rideeasy-purple text-rideeasy-purple hover:bg-rideeasy-purple hover:text-white">
              Passenger Login
            </Button>
          </Link>
          <Link to="/login/rider">
            <Button className="bg-rideeasy-purple hover:bg-rideeasy-darkpurple text-white">
              Rider Login
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Mobile menu button - expand in a real app */}
      <div className="md:hidden">
        <Button variant="ghost" className="text-rideeasy-purple">
          Menu
        </Button>
      </div>
    </nav>
  );
};

export default Navigation;
