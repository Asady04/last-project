<div>
      <div className="bg-login bg-cover bg-center h-screen w-screen relative flex ">
        <nav class="px-2 sm:px-4 py-2.5 rounded border h-1/6 w-full fixed">
          <div class="container flex flex-wrap justify-between items-center">
            <a href="#" class="">
              <div class="text-3xl font-bold">
                <span class="bg-clip-text text-transparent bg-gradient-to-r from-sky-300 to-cyan-600">
                  Bimbelz
                </span>
              </div>
            </a>
          </div>
        </nav>
        <div className="flex h-screen items-center w-screen border">
          <div className="mx-auto border">
            <Card>
              <CardHeader color="cyan" size="lg">
                <H5 color="white">Login</H5>
              </CardHeader>

              <CardBody>
                <form onSubmit={login()}>
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
                  <div className="mb-4 px-4">
                    <Input
                      type="password"
                      color="cyan"
                      size="regular"
                      outline={true}
                      placeholder="Password"
                      value={password}
                      onInput={(e) => setPassword(e.target.value)}
                    />
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
            </Card>
          </div>
        </div>
      </div>
    </div>