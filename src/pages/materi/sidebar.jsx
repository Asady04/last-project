import {
  AcademicCapIcon,
  BookOpenIcon,
  UsersIcon,
} from "@heroicons/react/outline";
import { Tab, TabItem, TabList } from "@material-tailwind/react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import text from "../../assets/text.png";

const Sidebar = ({ setIsi, setTipe, setId, id, setLength }) => {
  const click = (i, isi, tipe) => {
    localStorage.setItem("tab", i);
    localStorage.setItem("isi", isi);
    localStorage.setItem("tipe", tipe);
    setId(localStorage.getItem("tab"));
    setIsi(localStorage.getItem("isi"));
    setTipe(localStorage.getItem("tipe"));
  };

  const materi = [
    {
      judul: "Pengertian",
      isi: "Irure aliquip in cupidatat proident ad voluptate. Eu consectetur velit consequat dolor qui nulla ut sit. Ea dolore ipsum proident commodo sunt. In officia qui et ex exercitation ullamco irure.",
      tipe: 1,
    },
    {
      judul: "Instalasi",
      isi: "Reprehenderit laborum duis ea incididunt cillum duis dolore quis ex anim ea. Deserunt veniam velit ad aliquip aliqua amet officia cupidatat incididunt ea consequat. Consequat incididunt duis sunt mollit laborum nostrud.",
      tipe: 1,
    },
    {
      judul: "Blablabla",
      isi: "Aute incididunt qui et consectetur elit adipisicing aliqua nostrud mollit. Ad non ipsum culpa aliquip nulla adipisicing amet commodo cupidatat esse incididunt ea in commodo. Minim anim irure deserunt minim dolor.",
      tipe: 2,
    },
    {
      judul: "Lorem ipsum",
      isi: "Lorem magna consectetur sint qui eiusmod sunt reprehenderit duis dolore magna minim. Reprehenderit veniam exercitation adipisicing veniam officia ipsum nulla do aute consequat est. Sint tempor magna quis occaecat. Commodo proident laborum ad nostrud reprehenderit ipsum. Nisi ad irure aute ipsum eiusmod duis deserunt qui dolore duis dolor deserunt. Ea sunt voluptate reprehenderit dolore.",
      tipe: 2,
    },
  ];

  useEffect(() => {
    setIsi(materi[0].isi);
    setTipe(materi[0].tipe.toString());
    setLength(materi.length);
  }, []);

  return (
    <div>
      <div className="h-screen fixed top-0 md:left-0 -left-80 overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl bg-white w-80 pb-4 pt-24 px-6 transition-all duration-300">
        <div className="flex-col items-stretch min-h-full flex-nowrap px-0 relative">
          <div className="flex flex-col">
            <hr className="my-4 min-w-full" />
            <ul className="flex-col min-w-full flex list-none">
              {materi.map((tab, i) => (
                <li key={i} className="rounded-lg mb-4">
                  <div className="w-full cursor-pointer">
                    <p
                      onClick={(e) => {
                        click(i, tab.isi, tab.tipe);
                      }}
                      className={`${
                        parseInt(id) === i
                          ? "bg-gradient-to-tr from-cyan-500 to-sky-300 text-white shadow-md"
                          : "text-gray-700 hover:text-cyan-600"
                      } flex items-center font-semibold px-4 py-3 rounded-lg text-md uppercase`}
                    >
                      {tab.judul}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
