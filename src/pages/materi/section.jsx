import {
  FormControl,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputRightAddon,
  InputRightElement,
} from "@chakra-ui/react";
import {
  ArrowCircleLeftIcon,
  ArrowCircleRightIcon,
  ArrowNarrowRightIcon,
  CheckIcon,
  PaperClipIcon,
} from "@heroicons/react/outline";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Paragraph,
} from "@material-tailwind/react";
import React from "react";

const Section = ({ isi, tipe, id, setId, length }) => {
  const previous = () => {
    if (parseInt(id) > 0 && parseInt(id) <= length - 1) {
      localStorage.setItem("tab", parseInt(id) - 1);
      setId(localStorage.getItem("tab"));
    }
  };
  const next = () => {
    if (parseInt(id) >= 0 && parseInt(id) < length - 1) {
      localStorage.setItem("tab", parseInt(id) + 1);
      setId(localStorage.getItem("tab"));
    }
  };
  return (
    <div>
      <Card>
        <CardBody>
          <Paragraph>{isi}</Paragraph>
        </CardBody>
        {tipe === "1" ? (
          ""
        ) : (
          <CardFooter>
            <FormControl>
              <div className="flex">
                <InputGroup>
                  <Input type="file" />
                  <InputRightAddon
                    children={<PaperClipIcon className="h-1/2" />}
                  />
                </InputGroup>
                <Button color="cyan" className="ml-3">
                  Send
                </Button>
              </div>
            </FormControl>
          </CardFooter>
        )}
      </Card>
      <div className="flex justify-between mt-5">
        <Button color="indigo" onClick={previous}>
          <ArrowCircleLeftIcon className="h-6" />
          Previous
        </Button>
        <Button onClick={next}>
          Next
          <ArrowCircleRightIcon className="h-6" />
        </Button>
      </div>
    </div>
  );
};
export default Section;
