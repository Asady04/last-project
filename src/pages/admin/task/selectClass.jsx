import { Select } from "@chakra-ui/react";
import { Card, CardBody, Heading5 } from "@material-tailwind/react";
import axios from "axios";
import React, { useEffect } from "react";
import { urlKursus } from "../../../url";
import Bab from "./bab";

const SelectClass = () => {
  const [course, setCourse] = React.useState([]);
  const [idCourse, setIdCourse] = React.useState("");

  const getKursus = async () => {
    await axios
      .get(urlKursus, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(function (response) {
        const data = response;
        setCourse(data.data.data);
      });
  };

  useEffect(() => {
    getKursus();
  }, []);

  return (
    <div>
      {/* <div className="w-1/4">
        <Select value={idCourse} onChange={(e) => setIdCourse(e.target.value)}>
          <option value="">semua</option>
          {course.map((item, i) => (
            <option value={item.id} key={i}>
              {item.judul}
            </option>
          ))}
        </Select>
      </div> */}
      <div className="mt-5">
        <Card>
          <CardBody>
            {course.map((item, i) => (
              <div key={i} className="mt-5">
                <div className="border-b-2 border-cyan-700 py-4 px-4 hover:border-cyan-100 hover:rounded-lg hover:bg-cyan-100 duration-100">
                  <h1 className="text-3xl font-semibold text-cyan-700">
                    {item.judul}
                  </h1>
                </div>

                <div className="mt-3">
                  <Bab idKursus={item.id} />
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default SelectClass;
