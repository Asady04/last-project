import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/outline";
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
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import study from "../../assets/study.jpg";

const Kursus = () => {
  let nav = useNavigate();
  const kursus = [
    {
      nama: "Linux",
      desc: "Minim aliquip enim non ea adipisicing nisi velit ex et dolore aliquip laboris ad. Nostrud officia velit nulla amet laborum amet enim. Laborum cillum esse qui duis veniam cillum. Tempor sint cupidatat consequat qui enim do. Officia aute et elit pariatur commodo nostrud velit in. Amet officia laborum ipsum excepteur duis ipsum enim consectetur.",
    },
    {
      nama: "Linux",
      desc: "Minim aliquip enim non ea adipisicing nisi velit ex et dolore aliquip laboris ad. Nostrud officia velit nulla amet laborum amet enim. Laborum cillum esse qui duis veniam cillum. Tempor sint cupidatat consequat qui enim do. Officia aute et elit pariatur commodo nostrud velit in. Amet officia laborum ipsum excepteur duis ipsum enim consectetur.",
    },
  ];
  return (
    <div>
      <div className="grid grid-cols-4 mt-8">
        {kursus.map((item, i) => (
          <div className="p-5 col-span-4 md:col-span-2 lg:col-span-1 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-95">
            <Card key={i}>
              <CardImage src={study} />
              <CardBody>
                <Heading5>{item.nama}</Heading5>
                <Paragraph>{item.desc}</Paragraph>
              </CardBody>
              <CardFooter>
                <Link to="/user/section">
                  <Button ripple="light" color="cyan">
                    Learn <ArrowRightIcon className="h-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Kursus;
