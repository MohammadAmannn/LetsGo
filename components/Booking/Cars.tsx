import carlist from "@/data/carlist";
import React, { useState, useContext } from "react";
import { userLocationContext } from "@/context/UserLocationContext";

function Cars() {
  const { selectedCar, setSelectedCar } = useContext(userLocationContext);

  return (
    <div className="mt-3">
      <h2 className="font-semibold">Select car</h2>
      <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 ">
        {carlist.map((item, index) => (
          <div
            key={index}
            className={`m-2 p-2 border-[1px] rounded-md hover:border-yellow-400 cursor-pointer ${
              index == selectedCar ? "border-yellow-400 border-[2px]" : null
            }`}
            onClick={() => setSelectedCar(index)}
          >
            <img
              src={item.image}
              alt={item.name}
              width={75}
              height={90}
              className="w-full md:width={50px}"
            />
            <h2 className="text-[12px] text-gray-500">
              {item.name}{" "}
              <span className="float-right text-black">{item.price}</span>
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cars;
