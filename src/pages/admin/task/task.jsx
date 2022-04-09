import {
  Button,
  Input,
  InputGroup,
  InputRightAddon,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@material-tailwind/react";
import axios from "axios";
import { values } from "draft-js/lib/DefaultDraftBlockRenderMap";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { urlJawaban, urlNilaiJawaban, urlUpdateJawaban } from "../../../url";

const Task = () => {
  const [task, setTask] = React.useState([]);
  const [komen, setKomen] = React.useState("");
  const [value, setValue] = React.useState(0);
  const [modal, setModal] = React.useState(false);
  const [btn, setBtn] = React.useState(false);
  const [action, setAction] = React.useState();
  const [img, setImg] = React.useState();
  const [jawaban, setJawaban] = React.useState({});
  let { state } = useLocation();
  let { id, idKursus, idBab } = state;
  let toast = useToast();
  const getJawaban = async () => {
    await axios
      .get(urlJawaban + `/${idKursus}/${idBab}/${id}`)
      .then(function (response) {
        const data = response;
        setTask(data.data.data);
      });
  };

  const evaluation = async (idJawaban, nama, email, gambar) => {
    setBtn(true)
    await axios
      .post(urlUpdateJawaban, {
        id: idJawaban,
        idKursus: idKursus,
        idMateri: id,
        idBab: idBab,
        nilai: value,
        komen: komen,
        gambar: gambar,
        namauser: nama,
        email: email,
      })
      .then(function (response) {
        getJawaban();
        setBtn(false)
        toast({
          title: "Value given",
          description: "We've set the value",
          status: "success",
          position: "top",
          duration: 9000,
          isClosable: true,
        });
        setModal(false);
      });
  };

  useEffect(() => {
    getJawaban();
  }, []);

  return (
    <div>
      {task.length === 0 ? (
        <div className="flex justify-center">
          <p className="text-cyan-800 text-lg">
            Belum ada yang mengerjakan soal
          </p>
        </div>
      ) : (
        <div className="grid gap-3 grid-cols-2">
          {task.map((item, i) => (
            <div key={i} className="shadow-lg rounded-md">
              <div className="rounded-t-md flex justify-between p-2 bg-slate-800 text-white">
                <h2>{item.namauser}</h2>
                <h2>{item.email}</h2>
              </div>
              <div
                className="cursor-pointer"
                onClick={(e) => {
                  setAction("img");
                  setImg(item.gambar);
                  setModal(true);
                }}
              >
                <img src={item.gambar} alt="" className="aspect-video" />
              </div>

              {parseInt(item.nilai) > 0 ? (
                <div>
                  <div className="p-3 bg-slate-600 text-white">
                    <h2>{item.komen}</h2>
                  </div>
                  <div className="flex justify-between items-center pl-4">
                    <h2
                      className={`${
                        parseInt(item.nilai) >= 75
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {item.nilai}
                    </h2>
                    <Button
                      onClick={(e) => {
                        setValue(item.nilai);
                        setJawaban(item);
                        setKomen(item.komen);
                        setAction("edit");
                        setModal(true);
                      }}
                    >
                      edit
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <Textarea
                    className="resize-none"
                    placeholder="write a comment.."
                    value={komen}
                    onInput={(e) => setKomen(e.target.value)}
                  />
                  <InputGroup>
                    <Input
                      value={value}
                      onInput={(e) => setValue(e.target.value)}
                      variant="filled"
                      placeholder={"give value.."}
                      type="number"
                    />
                    <InputRightAddon
                      children={
                        <Button
                          onClick={(e) =>
                            evaluation(
                              item.id,
                              item.namauser,
                              item.email,
                              item.gambar
                            )
                          }
                        >
                          send
                        </Button>
                      }
                    />
                  </InputGroup>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <Modal active={modal} toggler={() => setModal(false)}>
        <ModalHeader toggler={() => setModal(false)}>
          {action === "edit" ? "Edit value" : "Task Image"}
        </ModalHeader>
        {action === "edit" ? (
          <div>
            <ModalBody>
              <Textarea
                className="resize-none"
                value={komen}
                onInput={(e) => setKomen(e.target.value)}
              />
              <div className="mt-4">
                <Input
                  type="number"
                  value={value}
                  onInput={(e) => setValue(e.target.value)}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="red"
                variant="ghost"
                onClick={(e) => {
                  e.preventDefault();
                  setModal(false);
                }}
                ripple="dark"
              >
                Close
              </Button>
              <Button
                variant="solid"
                colorScheme="teal"
                onClick={(e) =>
                  evaluation(
                    jawaban.id,
                    jawaban.namauser,
                    jawaban.email,
                    jawaban.gambar
                  )
                }
                ripple="light"
              >
                Save Changes
              </Button>
            </ModalFooter>
          </div>
        ) : (
          <ModalBody>
            <div className="py-2">
              <img src={img} alt="" />
            </div>
          </ModalBody>
        )}
      </Modal>
    </div>
  );
};

export default Task;
