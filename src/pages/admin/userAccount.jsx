import { useToast } from "@chakra-ui/react";
import {
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
  urlDeleteUser,
  urlRegister,
  urlRegisterAdmin,
  urlUser,
} from "../../url";

const UserAccount = () => {
  const [user, setUser] = React.useState();
  const [name, setName] = React.useState();
  const [id, setId] = React.useState();
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
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
        <Button
          color="red"
          buttonType="link"
          size="regular"
          rounded={false}
          block={false}
          iconOnly={true}
          ripple="dark"
          onClick={(e) => handleDelete(e, row["id"])}
        >
          <TrashIcon className="h-8" />
        </Button>
      ),
    },
  ];

  const getUser = async () => {
    await axios.get(urlUser).then(function (response) {
      const data = response;
      setUser(data.data.data);
    });
  };

  const handleDelete = (e, id) => {
    setModal(true);
    setId(id);
    setAction("delete");
  };

  const deleteUser = async (i) => {
    await axios
      .post(urlDeleteUser + `/${i}`)
      .then(function (response) {
        window.location.reload();
        toast({
          title: "Account deleted.",
          description: "We've deleted your account for you.",
          position: "top",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
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
      });
  };

  const addUser = async (e) => {
    e.preventDefault()
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
        window.location.reload();
        toast({
          title: "Account created.",
          description: "We've created your account for you.",
          position: "top",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
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
    e.preventDefault()
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
        window.location.reload();
        toast({
          title: "Account created.",
          description: "We've created your account for you.",
          position: "top",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
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
      });
  };

  useEffect(() => {
    getUser();
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
      <Modal size="regular" active={modal} toggler={() => setModal(false)}>
        <ModalHeader toggler={() => setModal(false)}>
          {action === "admin"
            ? "Add Admin"
            : action === "user"
            ? "Add User"
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
                onClick={(e) => deleteUser(id)}
              >
                Save Changes
              </Button>
            </ModalFooter>
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

              <Button color="green" type="submit" onClick={action === 'admin' ? addAdmin : addUser} ripple="light">
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
