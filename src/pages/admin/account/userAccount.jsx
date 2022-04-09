import { Select, useToast } from "@chakra-ui/react";
import {
  CheckCircleIcon,
  PencilAltIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/outline";

import { UserGroupIcon } from "@heroicons/react/solid";
import {
  Button,
  Card,
  CardBody,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Paragraph,
} from "@material-tailwind/react";
import axios from "axios";
import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import { act } from "react-dom/test-utils";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import {
  urlAccess,
  urlCreateAccess,
  urlDeleteAccess,
  urlDeleteUser,
  urlKursus,
  urlRegister,
  urlRegisterAdmin,
  urlUser,
} from "../../../url";

const UserAccount = () => {
  const [user, setUser] = React.useState();
  const [name, setName] = React.useState();
  const [access, setAccess] = React.useState([]);
  const [id, setId] = React.useState();
  const [courseid, setCourseid] = React.useState();
  const [course, setCourse] = React.useState([]);
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [btn, setBtn] = React.useState(false);
  const [cpassword, setCpassword] = React.useState();
  const [action, setAction] = React.useState();
  const [modal, setModal] = React.useState();
  let toast = useToast();

  const column = [
    {
      name: "Nama",
      selector: (row) => row["name"],
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row["email"],
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="flex">
          <Button
            color="teal"
            buttonType="link"
            size="regular"
            rounded={false}
            block={false}
            iconOnly={true}
            ripple="dark"
            onClick={(e) => accessHandle(e, row["id"], row["email"])}
          >
            <CheckCircleIcon className="h-8" />
          </Button>
          <Button
            color="pink"
            buttonType="link"
            size="regular"
            rounded={false}
            block={false}
            iconOnly={true}
            ripple="dark"
            onClick={(e) => deleteHandle(e, row["id"])}
          >
            <TrashIcon className="h-8" />
          </Button>
        </div>
      ),
    },
  ];

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
      setCourseid(data.data.data[0].id);
    });
  };

  const courseAccess = async (email) => {
    await axios
      .post(urlAccess, {
        email: email,
      })
      .then(function (response) {
        const data = response;
        setAccess(data.data.data);
      });
  };

  const deleteHandle = (e, id) => {
    setModal(true);
    setId(id);
    setAction("delete");
  };

  const accessHandle = (e, id, email) => {
    setEmail(email);
    courseAccess(email);
    setModal(true);
    setId(id);
    setAction("access");
  };

  const addAccess = async () => {
    setBtn(true);
    await axios
      .post(urlCreateAccess, {
        user_id: id,
        kursus_id: courseid,
      })
      .then(function (response) {
        setBtn(false);
        courseAccess(email);
      })
      .catch((e) => {
        setBtn(false);
      });
  };

  const deleteAccess = async (idKursus) => {
    setBtn(true);
    await axios
      .post(urlDeleteAccess + `/${id}/${idKursus}`)
      .then(function (response) {
        courseAccess(email);
        setBtn(false);
      })
      .catch((e) => {
        setBtn(false);
      });
  };

  const deleteUser = async (i) => {
    setBtn(true);
    await axios
      .post(urlDeleteUser + `/${i}`)
      .then(function (response) {
        toast({
          title: "Account deleted.",
          description: "We've deleted the account for you.",
          position: "top",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        getUser();
        setModal(false);
        setBtn(false);
      })
      .catch((e) => {
        const message = e.response.data.message;

        toast({
          description: message,
          status: "error",
          position: "top",
          duration: 9000,
          isClosable: true,
        });
        setBtn(false);
      });
  };

  const addUser = async (e) => {
    e.preventDefault();
    setBtn(true);
    await axios
      .post(urlRegister, {
        name: name,
        email: email,
        password: password,
        password_confirmation: cpassword,
        gambar:
          "https://res.cloudinary.com/dfkoknpii/image/upload/v1646532385/lastproject/account_jzb2mv.png",
      })
      .then(function (response) {
        toast({
          title: "Account created.",
          description: "We've created your account for you.",
          position: "top",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        getUser();
        setModal(false);
        setBtn(false);
      })
      .catch((e) => {
        const message = e.response.data.message;

        toast({
          description: message,
          status: "error",
          position: "top",
          duration: 9000,
          isClosable: true,
        });
        setBtn(false);
      });
  };

  const openModal = (itu) => {
    setModal(true);
    setName("");
    setPassword("");
    setCpassword("");
    setEmail("");
    setAction(itu);
  };

  const addAdmin = async (e) => {
    e.preventDefault();
    setBtn(true);
    await axios
      .post(urlRegisterAdmin, {
        name: name,
        email: email,
        password: password,
        password_confirmation: cpassword,
        gambar:
          "https://res.cloudinary.com/dfkoknpii/image/upload/v1646532385/lastproject/account_jzb2mv.png",
      })
      .then(function (response) {
        toast({
          title: "Account created.",
          description: "We've created the account for you.",
          position: "top",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setBtn(false);
        getUser();
        setModal(false);
      })
      .catch((e) => {
        const message = e.response.data.message;

        toast({
          description: message,
          status: "error",
          position: "top",
          duration: 9000,
          isClosable: true,
        });
        setBtn(false);
      });
  };

  useEffect(() => {
    getUser();
    getCourse();
  }, []);
  return (
    <div>
      <Card className="mt-6">
        <CardBody>
          <DataTable
            title={
              <div className="flex justify-end py-3 mb-6">
                <div className="flex">
                  <Button
                    className="mr-3"
                    color="cyan"
                    size="sm"
                    rounded={false}
                    block={false}
                    iconOnly={false}
                    ripple="dark"
                    onClick={(e) => {
                      openModal("user");
                    }}
                  >
                    <PlusCircleIcon className="h-6" />
                    Add User
                  </Button>
                  <Button
                    color="cyan"
                    size="sm"
                    rounded={false}
                    block={false}
                    iconOnly={false}
                    ripple="dark"
                    onClick={(e) => {
                      openModal("admin");
                    }}
                  >
                    <PlusCircleIcon className="h-6" />
                    Add Admin
                  </Button>
                </div>
              </div>
            }
            columns={column}
            data={user}
            pagination={""}
            subHeader={""}
            selectableRows={""}
            persistTableHead
            dense
          />
        </CardBody>
      </Card>
      <Modal size="lg" active={modal} toggler={() => setModal(false)}>
        <ModalHeader toggler={() => setModal(false)}>
          {action === "admin"
            ? "Add Admin"
            : action === "user"
            ? "Add User"
            : action === "access"
            ? "Course Access"
            : "Delete Account"}
        </ModalHeader>
        {action === "delete" ? (
          <div>
            <ModalBody>
              <div className="py-6">
                <p className="text-center text-xl text-red-600 font-semibold">
                  Are You Sure?
                </p>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="red"
                buttonType="link"
                onClick={(e) => setModal(false)}
                ripple="dark"
              >
                Close
              </Button>

              <Button
                color="green"
                ripple="light"
                disabled={btn}
                onClick={(e) => deleteUser(id)}
              >
                Save Changes
              </Button>
            </ModalFooter>
          </div>
        ) : action === "access" ? (
          <div>
            <ModalBody>
              <div className="flex justify-between space-x-2 items-center">
                <div className="flex-nowrap flex space-x-2 items-center">
                  <p className="text-lg">Tambah akses:</p>
                  <Select
                    value={courseid}
                    onChange={(e) => setCourseid(e.target.value)}
                  >
                    {course.map((item, i) => (
                      <option key={i} value={item.id}>
                        {item.judul}
                      </option>
                    ))}
                  </Select>
                </div>
                <Button disabled={btn} color="lightGreen" onClick={addAccess}>
                  tambah
                </Button>
              </div>
              <div>
                {access === undefined ? (
                  <div></div>
                ) : (
                  <div>
                    {access.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between rounded-lg bg-cyan-500 text-white py-4 px-2 mt-3"
                      >
                        <p className="font-semibold">{item.kursus[0].judul}</p>
                        <Button
                          color="pink"
                          disabled={btn}
                          onClick={(e) => deleteAccess(item.kursus[0].id)}
                        >
                          <TrashIcon className="h-6" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </ModalBody>
          </div>
        ) : (
          <div>
            <ModalBody>
              <div>
                <Input
                  placeholder="name"
                  value={name}
                  onInput={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <Input
                  placeholder="email"
                  value={email}
                  onInput={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <Input
                  placeholder="password"
                  value={password}
                  onInput={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <Input
                  placeholder="password confirmation"
                  value={cpassword}
                  onInput={(e) => setCpassword(e.target.value)}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <div>
                <Button
                  color="red"
                  buttonType="link"
                  onClick={(e) => setModal(false)}
                  ripple="dark"
                >
                  Close
                </Button>
              </div>

              <Button
                color="green"
                type="submit"
                disabled={btn}
                onClick={action === "admin" ? addAdmin : addUser}
                ripple="light"
              >
                Save Changes
              </Button>
            </ModalFooter>
          </div>
        )}
      </Modal>
    </div>
  );
};
export default UserAccount;
