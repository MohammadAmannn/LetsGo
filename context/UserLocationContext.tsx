import { createContext, useState } from "react";

export const userLocationContext = createContext<any>(null);

export const UserLocationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userLocation, setUserLocation] = useState(null);
  const [pickupLocation, setPickupLocation] = useState(null);
  const [dropoffLocation, setDropoffLocation] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);

  return (
    <userLocationContext.Provider
      value={{
        userLocation,
        setUserLocation,
        pickupLocation,
        setPickupLocation,
        dropoffLocation,
        setDropoffLocation,
        selectedCar,
        setSelectedCar,
      }}
    >
      {children}
    </userLocationContext.Provider>
  );
};
