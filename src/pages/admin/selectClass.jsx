import {
  Tab,
  TabList,
  TabItem,
  Image,
  TabContent,
  TabPane,
} from "@material-tailwind/react";
import axios from "axios";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { urlKelas, urlMapel } from "../../url";
import Mapel from "./mapel";

const SelectClass = () => {
  const [kelas, setKelas] = React.useState([]);
  const [mapel, setMapel] = React.useState();
  const [openTab, setOpenTab] = React.useState('x');

  // const getKelas = async () => {
  //   await axios
  //     .get(urlKelas, {
  //       headers: {
  //         Authorization: "Bearer " + localStorage.getItem("token"),
  //       },
  //     })
  //     .then(function (response) {
  //       const data = response;
  //       setKelas(data.data.data);
  //     });
  // };
  // const getMapel = async (slug) => {
  //   await axios.get(urlMapel + `/${slug}`).then(function (response) {
  //     const data = response;
  //     setMapel(data.data.data);
  //   });
  // };
  // const getAllMapel = async () => {
  //   await axios.get(urlMapel).then(function (response) {
  //     const data = response;
  //     setMapel(data.data.data);
  //   });
  // };
  // useEffect(() => {
  //   getKelas();
  //   getAllMapel();
  // }, []);
  return (
    <div>
      <Tab>
        <TabList color="cyan" className="scroll-smooth">
        <TabItem
              className="cursor-pointer"
              onClick={() => {
                setOpenTab('x');
                // getAllMapel();
              }}
              ripple="light"
              active={openTab === 'x' ? true : false}
            >
              Semua
            </TabItem>
          {kelas.map((item, i) => (
            <TabItem
              className="cursor-pointer"
              onClick={() => {
                setOpenTab(i);
                // getMapel(item.slug);
              }}
              ripple="light"
              active={openTab === i ? true : false}
            >
              {item.nama_kelas}
            </TabItem>
          ))}
          <div className="flex gap-1 rounded-lg text-sm font-medium py-4 px-6 leading-normal text-white">
            <Image />
          </div>
        </TabList>
        <TabContent>
          <TabPane active>
            <Mapel mapel={mapel} kelas={kelas}/>
          </TabPane>
        </TabContent>
      </Tab>
    </div>
  );
};

export default SelectClass;
