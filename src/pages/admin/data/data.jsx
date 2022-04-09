import { BookOpenIcon, UserGroupIcon } from "@heroicons/react/solid";
import {
  Card,
  CardHeader,
  CardRow,
  CardStatus,
} from "@material-tailwind/react";
import axios from "axios";
import React, { useEffect } from "react";
import { urlKursus, urlUser } from "../../../url";

const Data = () => {
  const [user, setUser] = React.useState([]);
  const [course, setCourse] = React.useState([]);
  const getUser = async () => {
    await axios.get(urlUser).then(function (response) {
      const data = response;
      setUser(data.data.data);
    });
  };
  const getCourse = async () => {
    await axios.get(urlKursus).then(function (response) {
      const data = response;
      setCourse(data.data.data);
    });
  };

  useEffect(() => {
    getUser();
    getCourse();
  }, []);
  return (
    <div>
      <div className="flex justify-between">
        <Card className="mt-7 w-96">
          <CardRow>
            <CardHeader color="lightBlue" size="lg" iconOnly>
              <UserGroupIcon className="w-16" />
            </CardHeader>
            <CardStatus title="Users" amount={user.length} />
          </CardRow>
        </Card>
        <Card className="mt-7 w-96">
          <CardRow>
            <CardHeader color="lightBlue" size="lg" iconOnly>
              <BookOpenIcon className="w-16" />
            </CardHeader>
            <CardStatus title="Course" amount={course.length} />
          </CardRow>
        </Card>
      </div>
    </div>
  );
};
export default Data;
