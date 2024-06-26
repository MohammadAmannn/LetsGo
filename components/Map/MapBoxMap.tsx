"use client";

import React, { useContext, useEffect, useState } from "react";
import { Map, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { userLocationContext } from "@/context/UserLocationContext";

function MapBoxMap() {
  const { userLocation, setUserLocation, pickupLocation, dropoffLocation } = useContext(userLocationContext);
  const [viewport, setViewport] = useState({
    latitude: 26.912434, // Default to San Francisco
    longitude: 75.787270, // Default to San Francisco
    zoom: 14,
  });

  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ lat: latitude, lng: longitude });
            setViewport({ latitude, longitude, zoom: 14 });
          },
          (error) => {
            console.error("Error getting user location:", error);
            // Optionally handle error states here
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        // Optionally handle unsupported geolocation here
      }
    };

    getUserLocation();
  }, [setUserLocation]);

  useEffect(() => {
    // Update viewport when pickupLocation changes
    if (pickupLocation) {
      setViewport({
        latitude: pickupLocation.lat,
        longitude: pickupLocation.lng,
        zoom: 14,
      });
    }
  }, [pickupLocation]);

  return (
    <div className="h-screen w-screen">
      <h2 className="text-[20px] font-semibold">Map</h2>
      <div className="w-full h-full">
        <Map
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
          initialViewState={viewport}
          style={{ width: "100%", height: "100%" }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        >
          {userLocation && (
            <Marker longitude={userLocation.lng} latitude={userLocation.lat} anchor="bottom">
              <img src="/pin.png" alt="pin" className="w-10 h-10" />
            </Marker>
          )}
          {pickupLocation && (
            <Marker longitude={pickupLocation.lng} latitude={pickupLocation.lat} anchor="bottom">
              <img src="/pickup.png" alt="pickup" className="w-10 h-10" />
            </Marker>
          )}
          {dropoffLocation && (
            <Marker longitude={dropoffLocation.lng} latitude={dropoffLocation.lat} anchor="bottom">
              <img src="/dropoff.png" alt="dropoff" className="w-10 h-10" />
            </Marker>
          )}
        </Map>
      </div>
    </div>
  );
}

export default MapBoxMap;
