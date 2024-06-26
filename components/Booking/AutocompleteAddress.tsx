"use client";

import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { userLocationContext } from "@/context/UserLocationContext";

// Type definitions for the address suggestion and location features
type AddressSuggestion = {
  full_address: string;
  mapbox_id: string;
};

type LocationFeature = {
  geometry: {
    coordinates: [number, number];
  };
};

// Constants
const session_token = "07f0a833-0eda-4f18-8e7f-e765b90d52cc";
const MAPBOX_RETRIEVE_URL = "https://api.mapbox.com/search/searchbox/v1/retrieve/";

function AutocompleteAddress() {
  const [source, setSource] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [sourceAddressList, setSourceAddressList] = useState<AddressSuggestion[]>([]);
  const [destinationAddressList, setDestinationAddressList] = useState<AddressSuggestion[]>([]);
  const { setPickupLocation, setDropoffLocation } = useContext(userLocationContext);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (source.trim().length > 0) getSourceAddressList();
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [source]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (destination.trim().length > 0) getDestinationAddressList();
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [destination]);

  const getSourceAddressList = async () => {
    try {
      const res = await fetch(`/api/search-address?q=${encodeURIComponent(source)}`);
      const result = await res.json();
      if (result && result.suggestions) {
        setSourceAddressList(result.suggestions);
      } else {
        setSourceAddressList([]);
      }
    } catch (error) {
      console.error("Error fetching source address list:", error);
    }
  };

  const getDestinationAddressList = async () => {
    try {
      const res = await fetch(`/api/search-address?q=${encodeURIComponent(destination)}`);
      const result = await res.json();
      if (result && result.suggestions) {
        setDestinationAddressList(result.suggestions);
      } else {
        setDestinationAddressList([]);
      }
    } catch (error) {
      console.error("Error fetching destination address list:", error);
    }
  };

  const handleSourceSelection = async (item: AddressSuggestion) => {
    setSource(item.full_address);
    setSourceAddressList([]);
    try {
      const res = await fetch(`${MAPBOX_RETRIEVE_URL}${item.mapbox_id}?session_token=${session_token}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`);
      const result = await res.json();
      if (result && result.features && result.features.length > 0) {
        const feature: LocationFeature = result.features[0];
        setPickupLocation({ lat: feature.geometry.coordinates[1], lng: feature.geometry.coordinates[0] });
      } else {
        console.error("No location found for selected source address.");
      }
    } catch (error) {
      console.error("Error retrieving location details:", error);
    }
  };

  const handleDestinationSelection = async (item: AddressSuggestion) => {
    setDestination(item.full_address);
    setDestinationAddressList([]);
    try {
      const res = await fetch(`${MAPBOX_RETRIEVE_URL}${item.mapbox_id}?session_token=${session_token}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`);
      const result = await res.json();
      if (result && result.features && result.features.length > 0) {
        const feature: LocationFeature = result.features[0];
        setDropoffLocation({ lat: feature.geometry.coordinates[1], lng: feature.geometry.coordinates[0] });
      } else {
        console.error("No location found for selected destination address.");
      }
    } catch (error) {
      console.error("Error retrieving location details:", error);
    }
  };

  return (
    <div className="mt-5">
      <div className="flex items-center">
        <Image src="/pin.png" alt="Location Pin" width={20} height={20} className="mr-2" />
        <label className="text-black-400"><b>From where?</b></label>
      </div>
      <input
        type="text"
        className="bg-white p-1 border-[1px] w-full rounded-md outline-none focus:border-yellow-300"
        placeholder="Enter pickup location"
        value={source}
        onChange={(e) => setSource(e.target.value)}
      />
      {sourceAddressList.length > 0 && (
        <div className="shadow-md p-1 rounded-md absolute bg-white w-full overflow-y-hidden">
          {sourceAddressList.map((item, index) => (
            <h2 key={index} className="p-3 hover:bg-gray-400 cursor-pointer" onClick={() => handleSourceSelection(item)}>
              {item.full_address}
            </h2>
          ))}
        </div>
      )}
      <div className="mt-3 flex items-center">
        <Image src="/distance.png" alt="Distance Icon" width={20} height={20} className="mr-2" />
        <label className="text-black-400"><b>To where?</b></label>
      </div>
      <input
        type="text"
        className="bg-white p-1 border-[1px] w-full rounded-md outline-none focus:border-yellow-300"
        placeholder="Enter drop location"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />
      {destinationAddressList.length > 0 && (
        <div className="shadow-md p-1 rounded-md absolute bg-white w-full overflow-y-hidden">
          {destinationAddressList.map((item, index) => (
            <h2 key={index} className="p-3 hover:bg-gray-400 cursor-pointer" onClick={() => handleDestinationSelection(item)}>
              {item.full_address}
            </h2>
          ))}
        </div>
      )}
    </div>
  );
}

export default AutocompleteAddress;
