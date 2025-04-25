
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-800 to-purple-700">
      <div className="absolute inset-0 opacity-20">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="3" cy="3" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>
      
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-purple-900 transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                <span className="block">Seamless travel</span>{" "}
                <span className="block text-purple-200">across India</span>
              </h1>
              <p className="mt-3 text-base text-purple-100 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Share rides, save money, and make new connections. Join our
                community of riders and passengers for convenient, affordable,
                and sustainable travel.
              </p>
              <div className="mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link to="/login/passenger">
                    <Button className="w-full flex items-center justify-center px-8 py-6 border border-transparent text-base font-medium rounded-md text-purple-900 bg-white hover:bg-gray-100 md:py-4 md:text-lg md:px-10">
                      Find a Ride
                    </Button>
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link to="/login/rider">
                    <Button variant="outline" className="w-full flex items-center justify-center px-8 py-6 border border-white text-base font-medium rounded-md text-white bg-transparent hover:bg-purple-800 md:py-4 md:text-lg md:px-10">
                      Offer a Ride
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://images.unsplash.com/photo-1464219222984-216ebffaaf85?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          alt="People traveling in a car"
        />
      </div>
    </div>
  );
};

export default Hero;
