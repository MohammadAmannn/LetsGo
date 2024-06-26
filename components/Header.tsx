import React from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";

function Header() {
  const headerMenu = [
    {
      id: 1,
      name: "Ride",
      icon: "/taxi.png",
    },
    {
      id: 2,
      name: "Package",
      icon: "/box.png",
    },
  ];

  return (
    <div className="p-5 pb-3 pl-10 border-b-[4px] border-gray-200 flex items-center justify-between ">
      <div className="flex gap-24 items-center">
        <Image src="/logo.jpg" width={70} height={70} alt="image" />
        <div className="flex gap-6 items-center">
          {headerMenu.map((item) => (
            <div className="flex 2 items-center" key={item.id}>
              <Image src={item.icon} width={17} height={17} alt={""} />
              <h2 className="text-[14px] font-medium">{item.name}</h2>
            </div>
          ))}
        </div>
      </div>
      <UserButton />
    </div>
  );
}

export default Header;
