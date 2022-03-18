import { LogoutIcon } from "@heroicons/react/outline";
import {
  Dropdown,
  DropdownItem,
  DropdownLink,
  Heading4,
  Image,
} from "@material-tailwind/react";
import DropdownS from "@material-tailwind/react/DropdownS";
import React from "react";
import { useNavigate } from "react-router-dom";
import account from "../../assets/account.png";
const NavigationBar = () => {
  const nama = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  let nav = useNavigate();

  const logout = () => {
    localStorage.clear();
    nav("/login", { replace: true });
  };
  return (
    <div>
      <nav className="w-full py-2 px-4">
        <div className="flex justify-end items-center">
          <div className="text-gray-600 text-right">
            <h3 className="font-semibold">{nama}</h3>
            <p className="text-sm">{email}</p>
          </div>
          <DropdownS
            className="h-20"
            color="transparent"
            placement="top-end"
            buttonText={
              <Image src={account} raised={true} rounded={true} width="50" />
            }
            buttonType="link"
            size="regular"
            ripple="light"
            rounded={true}
          >
            <DropdownLink
              href="#"
              color="cyan"
              ripple="light"
              onClick={(e) => {
                e.preventDefault();
                logout();
              }}
            >
              <div className="flex items-center">
                <LogoutIcon className="w-7" />
                <p className="ml-2">Logout</p>
              </div>
            </DropdownLink>
          </DropdownS>
        </div>
      </nav>
    </div>
  );
};

export default NavigationBar;
