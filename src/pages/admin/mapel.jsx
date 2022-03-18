import axios from "axios";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { urlDeleteMapel, urlMapel, urlUpdateMapel } from "../../url";
import DataTable from "react-data-table-component";
import SelectClass from "./selectClass";
import {
  Button,
  Checkbox,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@material-tailwind/react";
import {
  PencilAltIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/outline";

const Mapel = ({ mapel, kelas }) => {
  const [showModal, setShowModal] = React.useState(false);
  const [select, setSelect] = React.useState("");
  const [action, setAction] = React.useState();
  const [pelajaran, setPelajaran] = React.useState();
  const [guru, setGuru] = React.useState();
  const [check, setCheck] = React.useState(false);
  const [kelasM, setKelasM] = React.useState([]);
  const column = [
    {
      name: "Nama Pelajaran",
      selector: (row) => row["nama"],
      sortable: true,
    },
    {
      name: "Slug",
      selector: (row) => row["slug"],
      sortable: true,
    },
    {
      name: "Kelas",
      selector: (row) => row["kelas_slug"],
      sortable: true,
    },
    {
      name: "Guru",
      selector: (row) => row["guru"],
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="flex justify-between">
          <Button
            color="green"
            buttonType="link"
            size="regular"
            rounded={false}
            block={false}
            iconOnly={true}
            ripple="dark"
            // onClick={(e) => {
            //   editMapel(e, row);
            // }}
          >
            <PencilAltIcon className="h-8" />
          </Button>
          <Button
            color="red"
            buttonType="link"
            size="regular"
            rounded={false}
            block={false}
            iconOnly={true}
            ripple="dark"
            // onClick={(e) => {
            //   askdModal(e, row);
            // }}
          >
            <TrashIcon className="h-8" />
          </Button>
        </div>
      ),
      sortable: true,
    },
  ];

  // const saveMapel = async () => {
  //   await axios.post
  // }

  // const updateMapel = async (id) => {
  //   await axios.post(urlUpdateMapel + `/${id}`);
  // };

  // const editMapel = async (e, row) => {
  //   await setSelect(row);
  //   setShowModal(true);
  //   setAction("edit");
  // };

  // const askdModal = (e, row) => {
  //   setShowModal(true);
  //   setSelect(row);
  //   setAction("delete");
  // };

  // const deleteMapel = async (e, row) => {
  //   await axios.get(urlDeleteMapel + `/${row.id}`);
  //   window.location.reload();
  // };

  // const checkHandle = (i, slug) => {
  //   console.log(kelasM);
  // };

  // const handleRemoveItem = (e) => {
  //   const value = e.target.getAttribute("value");
  //   setKelasM(kelasM.filter((item) => item !== value));
  // };

  return (
    <div>
      <DataTable
        title={
          <div className="flex justify-between">
            <h1>Mapel</h1>
            <Button
              color="blue"
              buttonType="link"
              size="regular"
              rounded={false}
              block={false}
              iconOnly={false}
              ripple="dark"
              onClick={(e) => {
                e.preventDefault();
                setShowModal(true);
                setAction("add");
                setKelasM('')
              }}
            >
              <PlusCircleIcon className="h-8" />
              Tambah
            </Button>
          </div>
        }
        columns={column}
        data={mapel}
        pagination={``}
        subHeader={``}
        selectableRows={``}
        persistTableHead
        dense
      />
      <Modal size="lg" active={showModal} toggler={() => setShowModal(false)}>
        <ModalHeader toggler={() => setShowModal(false)}>
          {action === "delete"
            ? "Delete"
            : action === "edit"
            ? "Edit"
            : "Add New"}
        </ModalHeader>
        <form>
          <ModalBody>
            {action === "delete" ? (
              <div>
                <h5 className="text-3xl text-red-400">Are You Sure?</h5>
              </div>
            ) : action === "add" ? (
              <div>
                <div className="mt-7">
                  <Input
                    type="text"
                    color="cyan"
                    size="regular"
                    outline={true}
                    placeholder="Nama Pelajaran"
                    value={pelajaran}
                    onInput={(e) => {
                      setPelajaran(e.target.value);
                    }}
                  />
                </div>
                <div className="mt-7">
                  <Input
                    type="text"
                    color="cyan"
                    size="regular"
                    placeholder="Nama Guru"
                    outline={true}
                    value={guru}
                    onInput={(e) => {
                      setGuru(e.target.value);
                    }}
                  />
                </div>
                <div className="mt-7">
                  {kelas.map((item, i) => (
                    <Checkbox
                      key={i}
                      color="cyan"
                      text={item.nama_kelas}
                      id={i}
                      value={item.slug}
                      onClick={(e) => {
                        if (e.target.checked) {
                          setKelasM([...kelasM, item.slug]);
                        } else {
                          // handleRemoveItem();
                        }
                      }}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              color="red"
              buttonType="link"
              onClick={(e) => {
                e.preventDefault();
                setShowModal(false);
              }}
              ripple="dark"
            >
              Close
            </Button>
            {action === "delete" ? (
              <Button
                color="green"
                onClick={(e) => {
                  setShowModal(false);
                  // deleteMapel(select.id);
                }}
                ripple="light"
              >
                Save Changes
              </Button>
            ) : (
              <Button
                // type="submit"
                color="green"
                onClick={(e) => {
                  // setShowModal(false);
                  e.preventDefault();
                  console.log(kelasM);
                }}
                ripple="light"
              >
                Save Changes
              </Button>
            )}
          </ModalFooter>
        </form>
      </Modal>
    </div>
  );
};
export default Mapel;
