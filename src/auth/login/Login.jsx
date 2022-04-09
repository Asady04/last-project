import React, { Component } from "react";
import axios from "axios";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Input from "@material-tailwind/react/Input";
import Button from "@material-tailwind/react/Button";
import H5 from "@material-tailwind/react/Heading5";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { urlLogin, urlProgress } from "../../url";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useToast } from "@chakra-ui/react";
import { CardFooter, Paragraph } from "@material-tailwind/react";

const Login = () => {
  let nav = useNavigate();
  let toast = useToast();
  const [email, setEmail] = React.useState([]);
  const [password, setPassword] = React.useState([]);
  const [showPassword, setShowPassword] = React.useState(false);

  const toggleShow = () => {
    setShowPassword(showPassword ? false : true);
  };
  const login = async (e) => {
    e.preventDefault();
    await axios
      .post(urlLogin, {
        email: email,
        password: password,
      })
      .then(function (response) {
        const data = response;
        localStorage.setItem("role", data.data.role);
        localStorage.setItem("token", data.data.token.token);
        localStorage.setItem("email", data.data.user.email);
        localStorage.setItem("name", data.data.user.name);

        if (localStorage.getItem("role") === "admin") {
          localStorage.setItem('tabadmin', 0)
          nav("/admin/data", { replace: true });
        } else {
          nav("/user/course", { replace: true });
        }
      })
      .catch((e) => {
        const message = e.response.data.message;
        if (message === "Unauthorized") {
          toast({
            title: message,
            description: "Your Account is not signed up yet",
            status: "error",
            duration: 9000,
            position: "top",
            variant: "solid",
            isClosable: true,
          });
        } else {
          toast({
            description: message,
            status: "warning",
            duration: 9000,
            position: "top",
            variant: "solid",
            isClosable: true,
          });
        }
      });
  };
  return (
    <div>
      <div className="bg-login bg-cover bg-center h-screen w-screen relative flex ">
        <nav class="px-2 sm:px-4 py-2.5 rounded h-1/6 w-full fixed">
          <div class="container flex flex-wrap justify-between items-center">
            <a href="#" class="">
              <img src={logo} alt="" className="h-20" />
            </a>
          </div>
        </nav>
        <div className="flex h-screen items-center w-screen">
          <div className="mx-auto">
            <Card>
              <CardHeader color="cyan" size="lg">
                <H5 color="white">Login</H5>
              </CardHeader>

              <CardBody>
                <form onSubmit={login}>
                  <div className="mt-7 mb-8 px-4">
                    <Input
                      type="text"
                      color="cyan"
                      size="regular"
                      outline={true}
                      placeholder="Account"
                      value={email}
                      onInput={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-4 px-4 relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      color="cyan"
                      size="regular"
                      outline={true}
                      placeholder="Password"
                      value={password}
                      onInput={(e) => setPassword(e.target.value)}
                    />
                    <div onClick={toggleShow} className="cursor-pointer">
                      {showPassword ? (
                        <EyeOffIcon className="absolute h-1/2 top-3 right-5 text-gray-400" />
                      ) : (
                        <EyeIcon className="absolute h-1/2 top-3 right-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                  <div className="flex justify-center mb-5">
                    <Button
                      type="submit"
                      color="cyan"
                      buttonType="filled"
                      size="regular"
                      ripple="light"
                    >
                      Login
                    </Button>
                  </div>
                </form>
              </CardBody>
              <CardFooter>
                <Link to='/register'>
                  <p className="text-center text-cyan-600 text-xs">dont have an account?</p>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
