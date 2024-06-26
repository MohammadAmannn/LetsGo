"use client";

import Booking from "@/components/Booking/Booking";
import MapBoxMap from "@/components/Map/MapBoxMap";
import { useEffect, useState } from "react";
import { userLocationContext, UserLocationProvider } from "@/context/UserLocationContext";

export default function Home() {
  const [userLocation, setUserLocation] = useState<any>(null);

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => {
        console.error("Error getting user location: ", err);
      }
    );
  };

  return (
    <UserLocationProvider>
      <div className="flex flex-col md:flex-row w-full h-screen overflow-y-hidden">
        <div className="md:w-1/3 w-full h-1/2 md:h-full">
          <Booking />
        </div>
        <div className="md:w-2/3 w-full h-1/2 md:h-full overflow-hidden">
          <MapBoxMap />
        </div>
      </div>
    </UserLocationProvider>
  );
}
