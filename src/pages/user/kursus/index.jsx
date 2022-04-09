import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/outline";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardImage,
  Heading5,
  Paragraph,
} from "@material-tailwind/react";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { urlAccess, urlKursus } from "../../../url";

const Kursus = () => {
  let nav = useNavigate();
  const [course, setCourse] = React.useState([]);

  const getCourse = async () => {
    if (localStorage.getItem("role") === "admin") {
      await axios
        .get(urlKursus)
        .then(function (response) {
          const data = response;
          setCourse(data.data.data);
        })
        .catch();
    } else {
      await axios
        .post(urlAccess, {
          email: localStorage.getItem("email"),
        })
        .then(function (response) {
          const data = response;
          setCourse(data.data.data);
        })
        .catch();
    }
  };

  useState(() => {
    getCourse();
  }, []);
  return (
    <div>
      {course.length === 0 ? (
        <div className="flex items-center space-x-2 justify-center w-1/2 mx-auto mt-5 py-5 text-lg text-white rounded-lg shadow-md bg-gradient-to-r to-purple-700 from-indigo-600">
          <ExclamationCircleIcon className="h-7" />
          <p>anda tidak terdaftar dikelas manapun</p>
        </div>
      ) : (
        <div>
          {localStorage.getItem("role") === "admin" ? (
            <div className="grid grid-cols-4 mt-8">
              {course.map((item, i) => (
                <div className="p-5 col-span-4 md:col-span-2 lg:col-span-1 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-95">
                  <Card key={i} className=" h-full">
                    <CardImage className="aspect-video" src={item.gambar} />
                    <CardBody>
                      <Heading5>{item.judul}</Heading5>
                      <Paragraph
                        dangerouslySetInnerHTML={{ __html: item.deskripsi }}
                      ></Paragraph>
                    </CardBody>
                    <CardFooter>
                      <Button
                        ripple="light"
                        color="cyan"
                        onClick={(e) => {
                          e.preventDefault();
                          nav("/user/lesson", { state: { id: item.id } });
                        }}
                      >
                        Learn <ArrowRightIcon className="h-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-4 mt-8 ">
              {course.map((item, i) => (
                <div className=" p-5 col-span-4 md:col-span-2 lg:col-span-1 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-95 h-full">
                  <Card key={i} className=" h-full">
                    <CardImage
                      className="aspect-video"
                      src={item.kursus[0].gambar}
                    />
                    <CardBody className="">
                      <Heading5>{item.kursus[0].judul}</Heading5>
                      <Paragraph
                        dangerouslySetInnerHTML={{
                          __html: item.kursus[0].deskripsi,
                        }}
                      ></Paragraph>
                    </CardBody>
                    <CardFooter>
                      <Button
                        ripple="light"
                        color="cyan"
                        onClick={(e) => {
                          e.preventDefault();
                          nav("/user/lesson", {
                            state: { id: item.kursus[0].id },
                          });
                        }}
                      >
                        Learn <ArrowRightIcon className="h-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Kursus;
