import {
  FormControl,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputRightAddon,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import {
  ArrowCircleLeftIcon,
  ArrowCircleRightIcon,
  ArrowNarrowRightIcon,
  CheckIcon,
  MinusCircleIcon,
  PaperClipIcon,
} from "@heroicons/react/outline";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading4,
  Paragraph,
} from "@material-tailwind/react";
import axios from "axios";
import { get } from "draft-js/lib/DefaultDraftBlockRenderMap";
import React, { useEffect } from "react";
import {
  urlJawaban,
  urlMateri,
  urlSaveJawaban,
  urlUpdateJawaban,
} from "../../../url";

const Section = ({ i, lesn, check, setCheck }) => {
  const [id, setId] = React.useState();
  const [lesson, setLesson] = React.useState({});
  const [pict, setPict] = React.useState({});
  const [btn, setBtn] = React.useState(false);
  let formData = new FormData();
  let toast = useToast();
  const getIsi = async (idl) => {
    await axios
      .get(urlMateri + `/${idl}`)
      .then(function (response) {
        const data = response;
        setLesson(data.data.data);
      })
      .catch();
  };
  const checkTask = async () => {
    await axios
      .get(urlJawaban + `/${lesn.id}/${localStorage.getItem("email")}`)
      .then(function (response) {
        const data = response;
        setCheck(data.data.data);
      })
      .catch();
  };
  
  const sendTask = async (e) => {
    e.preventDefault();
    setBtn(true);
    formData.append("idKursus", lesn.kursus_id);
    formData.append("idBab", lesn.bab_id);
    formData.append("idMateri", lesn.id);
    formData.append("namauser", localStorage.getItem("name"));
    formData.append("email", localStorage.getItem("email"));
    formData.append("gambar", pict);
    formData.append("nilai", 0);
    formData.append("komen", ".");
    await axios
      .post(urlSaveJawaban, formData)
      .then(function (response) {
        checkTask();
        toast({
          title: "Answer sent",
          description: "We've sent your answer.",
          position: "top",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setBtn(false);
      })
      .catch((e) => {
        setBtn(false);
        toast({
          description: e.response.data.message,
          status: "error",
          position: "top",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const updateTask = async (e) => {
    e.preventDefault();
    setBtn(true);
    formData.append("id", check.id);
    formData.append("idKursus", check.kursus_id);
    formData.append("idBab", check.bab_id);
    formData.append("idMateri", check.materi_id);
    formData.append("namauser", localStorage.getItem("name"));
    formData.append("email", localStorage.getItem("email"));
    formData.append("gambar", pict);
    formData.append("nilai", 0);
    formData.append("komen", ".");
    await axios
      .post(urlUpdateJawaban, formData)
      .then(function (response) {
        checkTask();
        toast({
          title: "Answer changed.",
          description: "We've updated your answer.",
          position: "top",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setBtn(false);
      })
      .catch((e) => {
        setBtn(false);
        toast({
          description: e.response.data.message,
          status: "error",
          position: "top",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  useEffect(() => {
    setLesson(lesn);
    setId(i);
  }, []);
  return (
    <div>
      <Card>
        {lesn.isi === undefined ? (
          <div className="rounded-lg justify-center hover:bg-cyan-100 py-3 px-3 items-center text-cyan-700 flex space-x-2">
            <MinusCircleIcon className="h-6" />
            <p>Tidak ada section apapun disini</p>
          </div>
        ) : (
          <div>
            <CardBody>
              <Paragraph
                dangerouslySetInnerHTML={{ __html: lesn.isi }}
              ></Paragraph>
            </CardBody>
            {lesn.tipe === 2 ? (
              <CardFooter>
                {check === undefined ? (
                  <div></div>
                ) : (
                  <div>
                    {check === null ? (
                      <FormControl>
                        <div className="flex">
                          <InputGroup>
                            <Input
                              type="file"
                              onChange={(e) => setPict(e.target.files[0])}
                            />
                            <InputRightAddon
                              children={<PaperClipIcon className="h-1/2" />}
                            />
                          </InputGroup>
                          <Button
                            color="cyan"
                            className="ml-3"
                            disabled={btn}
                            onClick={sendTask}
                          >
                            Send
                          </Button>
                        </div>
                      </FormControl>
                    ) : (
                      <div>
                        {parseInt(check.nilai) > 0 ? (
                          <div>
                            <div className="flex">
                              <p className="mr-5 text-lg">current answer:</p>
                              <img
                                src={check.gambar}
                                alt=""
                                className="w-1/2 mb-5 rounded-lg hover:shadow-xl transform duration-300 hover:-translate-y-2 shadow"
                              />
                            </div>
                            <div
                              className={`text-lg text-white rounded-lg p-5 shadow-md ${
                                parseInt(check.nilai) >= 75
                                  ? "bg-green-500"
                                  : "bg-red-500"
                              }`}
                            >
                              <h1>Nilai : {check.nilai}</h1>
                              <h1>Komen : {check.komen}</h1>
                            </div>
                            {parseInt(check.nilai) >= 75 ? (
                              <div></div>
                            ) : (
                              <div className="mt-5">
                                <FormControl>
                                  <div className="flex">
                                    <InputGroup>
                                      <Input
                                        type="file"
                                        onChange={(e) =>
                                          setPict(e.target.files[0])
                                        }
                                      />
                                      <InputRightAddon
                                        children={
                                          <PaperClipIcon className="h-1/2" />
                                        }
                                      />
                                    </InputGroup>
                                    <Button
                                      color="cyan"
                                      className="ml-3"
                                      onClick={updateTask}
                                      disabled={btn}
                                    >
                                      Send
                                    </Button>
                                  </div>
                                </FormControl>
                              </div>
                            )}
                          </div>
                        ) : (
                          <Heading4 color="teal">
                            Tugas anda dalam penilaian..
                          </Heading4>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </CardFooter>
            ) : (
              <div></div>
            )}
          </div>
        )}
      </Card>
      {/* <div className="flex justify-between mt-5">
        <Button color="indigo" onClick={previous}>
          <ArrowCircleLeftIcon className="h-6" />
          Previous
        </Button>
        <Button onClick={next}>
          Next
          <ArrowCircleRightIcon className="h-6" />
        </Button>
      </div> */}
    </div>
  );
};
export default Section;
