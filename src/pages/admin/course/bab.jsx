import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  ModalFocusScope,
  useToast,
} from "@chakra-ui/react";
import { ArrowLeftIcon, PlusCircleIcon } from "@heroicons/react/outline";
import {
  Button,
  Card,
  CardBody,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@material-tailwind/react";
import axios from "axios";
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { urlBab, urlSaveBab } from "../../../url";
import Lesson from "./lesson";

const Bab = () => {
  const [bab, setBab] = React.useState([]);
  const [judul, setJudul] = React.useState();
  const [modal, setModal] = React.useState(false);
  const [btn, setBtn] = React.useState(false);
  const [action, setAction] = React.useState();
  let { state } = useLocation();
  let toast = useToast();
  let { id } = state;

  const getBab = async () => {
    await axios
      .get(urlBab + `/${id}`)
      .then(function (response) {
        const data = response;
        setBab(data.data.data);
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

  const saveBab = async () => {
    setBtn(true);
    await axios
      .post(urlSaveBab, {
        judul: judul,
        idKursus: id,
      })
      .then(function (response) {
        getBab();
        setBtn(false);
        setModal(false);
        toast({
          title: "Section Created.",
          description: "We've created a section for you.",
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

  useEffect(() => {
    getBab();
  }, []);
  return (
    <div>
      <Card>
        <CardBody>
          <div className="flex justify-between">
            <div className="w-1/12">
              <Link to="/admin/course" replace={true}>
                <Button buttonType="link" color="blueGray">
                  <ArrowLeftIcon className="h-5" />
                </Button>
              </Link>
            </div>
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
                setJudul("");
              }}
            >
              <PlusCircleIcon className="h-6" />
              Tambah
            </Button>
          </div>
          <div className="mt-5">
            <Accordion allowMultiple>
              {bab.map((item, i) => (
                <AccordionItem key={i}>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <h1 className="text-lg font-semibold">
                        {item.bab.judul}
                      </h1>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <Lesson getBab={getBab} bab={item.bab} />
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </CardBody>
      </Card>
      <Modal active={modal} toggler={() => setModal(false)}>
        <ModalHeader toggler={() => setModal(false)}>Add Section</ModalHeader>
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
            onClick={saveBab}
          >
            Save Changes
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Bab;
