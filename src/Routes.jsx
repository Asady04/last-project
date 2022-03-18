import React, { Component } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { Login, Register } from "./auth";
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
} from "./pages";

const Rute = (value) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Navigate replace to="login" />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="user" exact element={<User />}>
          <Route path="course" element={<Kursus />} />
          <Route path="section" element={<Bab />} />
          <Route path="lesson" element={<Materi />} />
        </Route>

        <Route path="admin" exact element={<Admin />}>
          <Route path="data" element={<Data />} />
          <Route path="course" element={<AdminKursus />} />
          <Route path="mapel" element={<SelectClass />} />
          <Route path="account" element={<UserAccount />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default Rute;
