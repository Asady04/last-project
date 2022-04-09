import { Divider, Stack, Text, useMediaQuery } from "@chakra-ui/react";
import {
  Heading2,
  Heading5,
  Heading6,
  Image,
  Paragraph,
} from "@material-tailwind/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import study from "../../../assets/study.jpg";

const Kelas = () => {
  let nav = useNavigate();
  return (
    <div>
      <div className="flex bg-gradient-to-tr from-cyan-600 to-cyan-300 pt-72 relative">
        <div className="absolute flex -bottom-16">
          <Image
            src={study}
            alt="study"
            className="shadow-lg rounded-xl w-1/2 md:w-1/3 lg:w-1/4 ml-5"
          />
          <div className="ml-5 flex items-start">
            <Heading2 color="white" className="">
              Linux
            </Heading2>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 mt-24 md:ml-7 h-full">
        <div className="h-full col-span-4 sm:col-span-4 md:col-span-1">
          <div className="shadow-md p-5 rounded-xl h-full ">
            <Paragraph>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
              similique non rem laborum aliquam, enim magnam quo explicabo aut,
              voluptas perspiciatis veniam distinctio eligendi incidunt quam
              totam. Iste, veritatis qui.
            </Paragraph>
          </div>
        </div>
        <div className="md:ml-20 col-span-4 md:col-span-3 md:pr-10 mt-7 md:mt-0 mx-5">
          <Link
            to="/user/lesson"
            onClick={(e) => localStorage.setItem("tab", "0")}
          >
            <div className="shadow py-3 px-6 w-full rounded-xl hover:scale-95 hover:shadow-xl trasition duration-150 delay-100 ease-in-out cursor-pointer">
              <p className="text-cyan-700 hover:text-cyan-500 text-xl font-semibold">
                Pengenalan Tentang Linux
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Kelas;
