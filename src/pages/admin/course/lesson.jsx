import { AccordionPanel, useToast, Select } from "@chakra-ui/react";
import {
  DotsVerticalIcon,
  PencilIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Input,
  DropdownLink,
  Label,
} from "@material-tailwind/react";
import axios from "axios";
import React, { useEffect } from "react";
import {
  urlDeleteBab,
  urlDeleteMateri,
  urlMateri,
  urlSaveMateri,
  urlUpdateBab,
  urlUpdateMateri,
} from "../../../url";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftjsToHtml from "draftjs-to-html";
import DropdownS from "@material-tailwind/react/DropdownS";

const Lesson = ({ bab, getBab }) => {
  const [judul, setJudul] = React.useState();
  const [isi, setIsi] = React.useState();
  const [tipe, setTipe] = React.useState(1);
  const [id, setId] = React.useState();
  const [modal, setModal] = React.useState(false);
  const [btn, setBtn] = React.useState(false);
  const [action, setAction] = React.useState();
  let editorState = EditorState.createEmpty();
  const [editor, setEditor] = React.useState(editorState);
  let toast = useToast();

  const isiChange = (e) => {
    setEditor(e);
  };

  const closeModal = () => {
    setModal(false);
    setJudul("");
    setEditor(editorState);
  };

  const saveLesson = async () => {
    setBtn(true)
    await axios
      .post(urlSaveMateri, {
        judul: judul,
        idKursus: bab.kursus_id,
        idBab: bab.id,
        isi: isi.value,
        tipe: tipe,
      })
      .then(function (response) {
        getBab();
        setBtn(false)
        setModal(false)
        toast({
          title: "Lesson created.",
          description: "We've created a lesson in this section",
          position: "top",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((e) => {
        const message = e.response.data.message;
        setBtn(false)
        toast({
          description: message,
          status: "error",
          position: "top",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const updateLesson = async () => {
    setBtn(true)
    await axios
      .post(urlUpdateMateri, {
        judul: judul,
        idKursus: bab.kursus_id,
        idBab: bab.id,
        id: id,
        isi: isi.value,
        tipe: tipe,
      })
      .then(function (response) {
        getBab();
        setModal(false)
        setBtn(false)
        toast({
          title: "Lesson updated.",
          description: "We've change the lesson for you.",
          position: "top",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((e) => {
        const message = e.response.data.message;
        setBtn(false)
        toast({
          description: message,
          status: "error",
          position: "top",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const updateBab = async (id, idk) => {
    setBtn(true)
    await axios
      .post(urlUpdateBab, {
        judul: judul,
        id: bab.id,
        idKursus: bab.kursus_id,
      })
      .then(function (response) {
        setBtn(false)
        toast({
          title: "Section updated.",
          description: "We've change the section for you.",
          position: "top",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        getBab();
        setModal(false)
      })
      .catch((e) => {
        const message = e.response.data.message;
        setBtn(false)
        toast({
          description: message,
          status: "error",
          position: "top",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const deleteLesson = async () => {
    setBtn(true)
    await axios
      .post(urlDeleteMateri + `/${id}`)
      .then(function (response) {
        getBab();
        setModal(false)
        setBtn(false)
        toast({
          title: "Lesson deleted.",
          description: "We've deleted the lesson for you.",
          position: "top",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((e) => {
        const message = e.response.data.message;
        setBtn(false)
        toast({
          description: message,
          status: "error",
          position: "top",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const deleteBab = async () => {
    setBtn(true)
    await axios
      .post(urlDeleteBab + `/${bab.id}`)
      .then(function (response) {
        getBab();
        setModal(false)
        setBtn(false)
        toast({
          title: "Section deleted.",
          description: "We've deleted a section here.",
          position: "top",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((e) => {
        const message = e.response.data.message;
        setBtn(false)
        toast({
          description: message,
          status: "error",
          position: "top",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  useEffect(() => {}, []);

  return (
    <div>
      {bab.materi.map((item, i) => (
        <AccordionPanel
          pb={4}
          key={i}
          className="hover:bg-gray-100 transform duration-300"
        >
          <div className="flex items-center justify-between">
            <div className="flex space-x-2 items-center">
              <p>{item.judul}</p>
              {item.tipe === 1 ? (
                <Label color="cyan">materi</Label>
              ) : (
                <Label color="teal">soal</Label>
              )}
            </div>
            <DropdownS
              color="transparent"
              placement="top-end"
              buttonText={
                <DotsVerticalIcon className="h-6 hover:text-cyan-600" />
              }
              buttonType="link"
              size="regular"
              ripple="light"
              rounded={true}
            >
              <DropdownLink
                color="teal"
                ripple="light"
                onClick={(e) => {
                  e.preventDefault();
                  setAction("edit");
                  setJudul(item.judul);
                  setTipe(item.tipe);
                  setEditor(editorState)
                  setId(item.id);
                  setModal(true);
                }}
              >
                <div className="flex items-center space-x-2">
                  <PencilIcon className="h-6" />
                  <p>Edit</p>
                </div>
              </DropdownLink>
              <DropdownLink
                color="pink"
                ripple="light"
                onClick={(e) => {
                  e.preventDefault();
                  setAction("delete");
                  setId(item.id);
                  setModal(true);
                }}
              >
                <div className="flex items-center space-x-2">
                  <TrashIcon className="h-6" />
                  <p>Delete</p>
                </div>
              </DropdownLink>
            </DropdownS>
          </div>
        </AccordionPanel>
      ))}
      <AccordionPanel>
        <div className="flex space-x-3 justify-center">
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
              setJudul('')
              setEditor(editorState)
            }}
          >
            <PlusCircleIcon className="h-6" />
            Tambah
          </Button>
          <Button
            color="teal"
            size="sm"
            rounded={false}
            block={false}
            iconOnly={false}
            ripple="dark"
            onClick={(e) => {
              setModal(true);
              setJudul(bab.judul);
              setAction("editS");
            }}
          >
            <PencilIcon className="h-6" />
            edit section
          </Button>
          <Button
            color="pink"
            size="sm"
            rounded={false}
            block={false}
            iconOnly={false}
            ripple="dark"
            onClick={(e) => {
              setModal(true);
              setAction("deleteS");
            }}
          >
            <TrashIcon className="h-6" />
            Delete Section
          </Button>
        </div>
      </AccordionPanel>
      <Modal size="regular" active={modal} toggler={() => setModal(false)}>
        <ModalHeader toggler={() => setModal(false)}>
          {action === "add"
            ? "Add"
            : action === "edit" || action === "editS"
            ? "Edit"
            : "Delete"}
        </ModalHeader>
        {action === "delete" || action === "deleteS" ? (
          <div>
            <ModalBody>
              <div className="py-6">
                <p className="text-center text-xl text-red-600 font-semibold">
                  Delete this {action === "delete" ? "lesson" : "section"}?
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
                onClick={(e) => {
                  e.preventDefault();
                  if (action === "deleteS") {
                    deleteBab();
                  } else {
                    deleteLesson();
                  }
                }}
              >
                Save Changes
              </Button>
            </ModalFooter>
          </div>
        ) : action === "editS" ? (
          <div>
            <ModalBody>
              <Input
                placeholder="judul"
                value={judul}
                onInput={(e) => setJudul(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                color="red"
                buttonType="link"
                onClick={(e) => {
                  e.preventDefault();
                  setModal(false);
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
                onClick={updateBab}
              >
                Save Changes
              </Button>
            </ModalFooter>
          </div>
        ) : (
          <div>
            <ModalBody>
              <div className="flex justify-between space-x-5">
                <Input
                  placeholder="judul"
                  value={judul}
                  onInput={(e) => setJudul(e.target.value)}
                />
                <Select value={tipe} onChange={(e) => setTipe(e.target.value)}>
                  <option value={1}>Materi</option>
                  <option value={2}>Soal</option>
                </Select>
              </div>
              <div className="mt-4 border h-full p-3 rounded-lg">
                <Editor
                  placeholder="write something...."
                  editorState={editor}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={isiChange}
                />
                <textarea
                  className="hidden"
                  disabled
                  ref={(e) => setIsi(e)}
                  value={draftjsToHtml(
                    convertToRaw(editor.getCurrentContent())
                  )}
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
                disabled={btn}
                onClick={(e) => {
                  e.preventDefault();
                  if (action === "edit") {
                    updateLesson();
                  } else {
                    saveLesson();
                  }
                }}
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

export default Lesson;
