import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardRow,
  CardStatus,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Input,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  urlDeleteKursus,
  urlKursus,
  urlSaveKursus,
  urlUpdateKursus,
} from "../../../url";
import DataTable from "react-data-table-component";
import {
  PencilAltIcon,
  PhotographIcon,
  PlusCircleIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { UserGroupIcon } from "@heroicons/react/solid";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftjsToHtml from "draftjs-to-html";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Kursus = () => {
  const [kursus, setKursus] = React.useState([]);
  const [modal, setModal] = React.useState(false);
  const [action, setAction] = React.useState();
  const [judul, setJudul] = React.useState();
  const [desc, setDesc] = React.useState();
  const [pict, setPict] = React.useState();
  const [img, setImg] = React.useState();
  const [btn, setBtn] = React.useState(false);
  const [id, setId] = React.useState();
  let editorState = EditorState.createEmpty();
  const [state, setState] = React.useState(editorState);
  let formData = new FormData();
  let toast = useToast();
  let nav = useNavigate();
  const column = [
    {
      name: "Nama",
      selector: (row) => row["judul"],
      sortable: true,
    },
    {
      name: "Deskripsi",
      selector: (row) => (
        <div dangerouslySetInnerHTML={{ __html: row["deskripsi"] }} />
      ),
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="flex justify-between">
          <Button
            color="teal"
            buttonType="link"
            size="regular"
            rounded={false}
            block={false}
            iconOnly={true}
            ripple="dark"
            onClick={(e) => {
              editKursus(e, row);
            }}
          >
            <PencilAltIcon className="h-8" />
          </Button>
          <Button
            color="pink"
            buttonType="link"
            size="regular"
            rounded={false}
            block={false}
            iconOnly={true}
            ripple="dark"
            onClick={(e) => {
              deleteHandle(e, row["id"]);
            }}
          >
            <TrashIcon className="h-8" />
          </Button>
          <Button
            color="cyan"
            buttonType="link"
            size="regular"
            rounded={false}
            block={false}
            iconOnly={true}
            ripple="dark"
            onClick={(e) => {
              nav("/admin/bab", { state: { id: row["id"] } });
            }}
          >
            <PlusCircleIcon className="h-8" />
          </Button>
          <Button
            color="gray"
            buttonType="link"
            size="regular"
            rounded={false}
            block={false}
            iconOnly={true}
            ripple="dark"
            onClick={(e) => {
              imgHandle(e, row["gambar"]);
            }}
          >
            <PhotographIcon className="h-8" />
          </Button>
        </div>
      ),
      sortable: true,
    },
  ];

  const deleteHandle = (e, id) => {
    setModal(true);
    setId(id);
    setAction("delete");
  };

  const imgHandle = (e, img) => {
    setModal(true);
    setAction("img");
    setImg(img);
  };

  const descChange = (e) => {
    setState(e);
  };

  const getKursus = async () => {
    await axios
      .get(urlKursus, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(function (response) {
        const data = response;
        setKursus(data.data.data);
      });
  };

  const addKursus = async (e) => {
    e.preventDefault();
    setBtn(true);
    formData.append("gambar", pict);
    formData.append("judul", judul);
    formData.append("deskripsi", desc.value);
    await axios
      .post(urlSaveKursus, formData)
      .then(function (response) {
        getKursus();
        setModal(false);
        setBtn(false);
        toast({
          title: "Course created.",
          description: "We've created a course for you.",
          position: "top",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((e) => {
        const message = e.response.data.message;
        setBtn(false);
        if (message === "Call to a member function getRealPath() on null") {
          toast({
            description: "please insert an image",
            status: "error",
            position: "top",
            duration: 9000,
            isClosable: true,
          });
        } else {
          toast({
            description: message,
            status: "error",
            position: "top",
            duration: 9000,
            isClosable: true,
          });
        }
      });
  };

  const updateKursus = async (e) => {
    e.preventDefault();
    setBtn(true);
    formData.append("gambar", pict);
    formData.append("judul", judul);
    formData.append("deskripsi", desc.value);
    formData.append("id", id);
    await axios
      .post(urlUpdateKursus, formData)
      .then(function (response) {
        getKursus();
        setBtn(false);
        setModal(false);
        setState(editorState);
        toast({
          title: "Course updated.",
          description: "We've change the course for you.",
          position: "top",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((e) => {
        const message = e.response.data.message;
        setBtn(false);
        toast({
          description: message,
          status: "error",
          position: "top",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const editKursus = (e, row) => {
    setJudul(row.judul);
    setAction("edit");
    setId(row.id);
    setPict(row.gambar);
    setDesc(row.deskripsi);
    setModal(true);
  };

  const deleteKursus = async (i) => {
    setBtn(true);
    await axios
      .post(urlDeleteKursus + `/${i}`)
      .then(function (response) {
        getKursus();
        setModal(false);
        setBtn(false);
        toast({
          title: "Course deleted.",
          description: "We've deleted the course for you.",
          position: "top",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((e) => {
        const message = e.response.data.message;
        setBtn(false);
        toast({
          description: message,
          status: "error",
          position: "top",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const closeModal = () => {
    setModal(false);
    setJudul("");
    setState(editorState);
  };

  useEffect(() => {
    getKursus();
  }, []);
  return (
    <div>
      <Card className="mt-6">
        <CardBody>
          <DataTable
            title={
              <div className="flex justify-end py-3 mb-6">
                <Button
                  color="cyan"
                  size="sm"
                  rounded={false}
                  block={false}
                  iconOnly={false}
                  ripple="dark"
                  onClick={(e) => {
                    setModal(true);
                    setJudul("");
                    setState(editorState);
                    setAction("add");
                  }}
                >
                  <PlusCircleIcon className="h-6" />
                  Tambah
                </Button>
              </div>
            }
            columns={column}
            data={kursus}
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
          {action === "add"
            ? "Add Course"
            : action === "edit"
            ? "Edit Course"
            : action === "img"
            ? "Course Image"
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
                onClick={(e) => deleteKursus(id)}
              >
                Save Changes
              </Button>
            </ModalFooter>
          </div>
        ) : action === "img" ? (
          <div>
            <ModalBody>
              <div className="py-6">
                <img src={img} alt="" />
              </div>
            </ModalBody>
          </div>
        ) : (
          <div>
            <ModalBody>
              <div>
                <Input
                  placeholder="judul"
                  value={judul}
                  onInput={(e) => setJudul(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <input
                  accept="image/*"
                  type="file"
                  onChange={(e) => setPict(e.target.files[0])}
                />
              </div>
              <div className="mt-4 border h-full p-3 rounded-lg">
                <Editor
                  placeholder="deskripsi"
                  editorState={state}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={descChange}
                />
                <textarea
                  className="hidden"
                  disabled
                  ref={(e) => setDesc(e)}
                  value={draftjsToHtml(convertToRaw(state.getCurrentContent()))}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="red"
                buttonType="link"
                onClick={(e) => {
                  e.preventDefault();
                  closeModal();
                }}
                ripple="dark"
              >
                Close
              </Button>
              <Button
                color="green"
                type="submit"
                ripple="light"
                disabled={btn}
                onClick={action === "add" ? addKursus : updateKursus}
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
export default Kursus;
