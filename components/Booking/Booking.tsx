"use client";

import React, { useContext } from "react";
import AutocompleteAddress from "./AutocompleteAddress";
import Cars from "./Cars";
import { userLocationContext } from "@/context/UserLocationContext";

function Booking() {
  const { pickupLocation, dropoffLocation, selectedCar, setSelectedCar } = useContext(userLocationContext);

  const handleBooking = () => {
    if (!pickupLocation || !dropoffLocation || selectedCar === null) {
      alert("Please select pickup, dropoff, and a car before booking.");
      return;
    }
    // Handle the booking logic here
    console.log("Booking confirmed with the following details:");
    console.log("Pickup Location:", pickupLocation);
    console.log("Dropoff Location:", dropoffLocation);
    console.log("Selected Car:", selectedCar);
  };

  return (
    <div className="p-5">
      <h2 className="text-[20px] font-semibold">Booking</h2>
      <div className="border-[2px] border-black-200 rounded-md p-5">
        <AutocompleteAddress />
        <Cars />
        <button
          onClick={handleBooking}
          className="mt-5 w-full bg-yellow-400 p-2 rounded-md text-white font-semibold"
        >
          Book Cab
        </button>
      </div>
    </div>
  );
}

export default Booking;
