import React, { Component } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import {
  Login,
  ProtectedAdmin,
  ProtectedLogin,
  ProtectedRoute,
  Register,
} from "./auth";
import {
  User,
  Admin,
  UserAccount,
  SelectClass,
  Kursus,
  Bab,
  Materi,
  AdminKursus,
  Data,
  AdminBab,
  Task,
  NotFound,
} from "./pages";

const Rute = (value) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact>
          <Route path="*" element={<NotFound />} />
          <Route
            path=""
            element={
              <Navigate
                replace
                to={localStorage.getItem('role') === "admin" ? "/admin" : "/login"}
              />
            }
          />

          <Route element={<ProtectedAdmin />}>
            <Route
              path="admin"
              exact
              element={<Navigate replace to="data" />}
            />
            <Route path="admin" exact element={<Admin />}>
              <Route path="data" element={<Data />} />
              <Route path="course" element={<AdminKursus />} />
              <Route path="bab" element={<AdminBab />} />
              <Route path="task" element={<SelectClass />} />
              <Route path="evaluation" element={<Task />} />
              <Route path="account" element={<UserAccount />} />
            </Route>
          </Route>

          <Route element={<ProtectedLogin />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route
              path="user"
              exact
              element={<Navigate replace to="course" />}
            />
            <Route path="user" exact element={<User />}>
              <Route path="course" element={<Kursus />} />
              <Route path="section" element={<Bab />} />
              <Route path="lesson" element={<Materi />} />
            </Route>
          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" exact>
    //       <Route
    //         path=""
    //         element={
    //           <Navigate
    //             replace
    //             to={
    //               localStorage.getItem("role") === "admin"
    //                 ? "/admin-dashboard"
    //                 : "/home"
    //             }
    //           />
    //         }
    //       />
    //       <Route
    //         path="home"
    //         element={<Dashboard programs={programs} user={user} />}
    //       />
    //       {/* Protected Route After Login */}
    //       <Route element={<ProtectedLogin />}>
    //         <Route path="login" element={<Login />} />
    //         <Route path="register" element={<Register />} />
    //       </Route>

    //       {/* Galang Dana */}
    //       <Route path="galang-dana" element={<GalangDana />} />

    //       {/* Protected Route Before Login */}
    //       <Route element={<ProtectedRoute />}>
    //         <Route exact path="account" element={<AccountSetting />}>
    //           <Route path="" element={<Navigate replace to="my-profile" />} />
    //           <Route path="change-password" element={<ChangePass />} />
    //           <Route path="my-profile" element={<Profile />} />
    //         </Route>
    //       </Route>

    //       {/* Protected Route Only for Admin */}
    //       <Route element={<ProtectedAdmin />}>
    //         <Route
    //           exact
    //           path="admin-dashboard"
    //           element={<AdminDashboard user={user} program={program} />}
    //         >
    //           <Route path="" element={<Home />} />
    //           <Route path="user-acc" element={<UserAccounts user={user} />} />
    //           <Route path="admin-acc" element={<AdminAccounts />} />
    //           <Route path="add-category" element={<AddKategori />} />
    //           <Route
    //             path="list-program"
    //             element={
    //               <ListProgram
    //                 setFilterText={setFilterText}
    //                 filterText={filterText}
    //                 setProgram={setProgram}
    //                 program={program}
    //                 getProg={getProg}
    //               />
    //             }
    //           />
    //           <Route path="req-program" element={<ProgramReq />} />
    //           <Route path="pend-payment" element={<PendingPayment />} />
    //           <Route path="acc-payment" element={<AcceptedPayment />} />
    //           <Route path="regadminbantunesiaBykel3" element={<RegAdmin />} />
    //         </Route>
    //       </Route>

    //       {/* Details */}
    //       <Route
    //         path="/detail/:id"
    //         element={<DetailDonasi programs={programs} />}
    //       />
    //       <Route path="*" element={<NotFound />} />

    //       {/* Payment */}
    //       <Route
    //         path="/pembayaran/:id"
    //         element={<Payment programs={programs} />}
    //       />
    //     </Route>
    //   </Routes>
    // </BrowserRouter>
  );
};
export default Rute;
