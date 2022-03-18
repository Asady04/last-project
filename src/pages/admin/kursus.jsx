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
} from "../../url";
import DataTable from "react-data-table-component";
import {
  PencilAltIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { UserGroupIcon } from "@heroicons/react/solid";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftjsToHtml from "draftjs-to-html";
import convertFromHTMLToContentBlocks from "draft-js/lib/convertFromHTMLToContentBlocks";
import { useToast } from "@chakra-ui/react";

const Kursus = () => {
  const [kursus, setKursus] = React.useState([]);
  const [modal, setModal] = React.useState(false);
  const [action, setAction] = React.useState();
  const [judul, setJudul] = React.useState();
  const [desc, setDesc] = React.useState();
  const [pict, setPict] = React.useState();
  const [select, setSelect] = React.useState();
  let editorState = EditorState.createEmpty();
  const [state, setState] = React.useState(editorState);
  let formData = new FormData();
  let toast = useToast();
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
            color="green"
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
    formData.append("gambar", pict);
    formData.append("judul", judul);
    formData.append("deskripsi", desc.value);
    await axios
      .post(urlSaveKursus, formData)
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
        toast({
          description: "An system error occured",
          status: "error",
          position: "top",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  // const updateKursus = async (e, id) => {
  //   e.preventDefault();
  //   await axios
  //     .post(urlUpdateKursus + `/${id}`, {
  //       nama: nama,
  //     })
  //     .then(function (response) {
  //       window.location.reload();
  //     });
  // };

  const editKursus = (e, row) => {
    setJudul(row.judul);
    setAction("edit");
    setDesc(row.deskripsi);
    setModal(true);
  };
  console.log('ini yg state', draftjsToHtml(convertToRaw(state.getCurrentContent())))

  const closeModal = () => {
    setModal(false);
    setJudul('')
    setState(editorState)
  }

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
          {action === "add" ? "Add Course" : ""}
        </ModalHeader>
        <form onSubmit={action === "add" ? addKursus : ""}>
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
                closeModal()
              }}
              ripple="dark"
            >
              Close
            </Button>
            <Button color="green" type="submit" ripple="light">
              Save Changes
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  );
};
export default Kursus;
