
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  title: string;
  userRole: "rider" | "passenger";
}

const DashboardHeader = ({ title, userRole }: DashboardHeaderProps) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-extrabold text-rideeasy-purple">RideEasy</span>
            </Link>
            <span className="ml-6 text-gray-400">|</span>
            <span className="ml-6 text-xl font-medium text-gray-900">{title}</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="border-rideeasy-purple text-rideeasy-purple">
              Profile
            </Button>
            <Link to="/">
              <Button variant="ghost" className="hover:text-rideeasy-purple">Logout</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
