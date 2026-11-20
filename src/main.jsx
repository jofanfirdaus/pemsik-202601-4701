import React from "react";
import ReactDOM from "react-dom/client";
import { Navigate, createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./App.css";

import User from "@/Pages/Admin/User/User";
import PermissionRoute from "@/Pages/Admin/Components/PermissionRoute";

import AuthLayout from "@/Pages/Auth/AuthLayout";
import AdminLayout from "@/Pages/Admin/AdminLayout";
import ProtectedRoute from "@/Pages/Admin/Components/ProtectedRoute";

import Login from "@/Pages/Auth/Login/Login";
import Register from "@/Pages/Auth/Register/Register";
import Dashboard from "@/Pages/Admin/Dashboard/Dashboard";
import Mahasiswa from "@/Pages/Admin/Mahasiswa/Mahasiswa";
import MahasiswaDetail from "@/Pages/Admin/MahasiswaDetail/MahasiswaDetail";
import Dosen from "@/Pages/Admin/Dosen/Dosen";
import MataKuliah from "@/Pages/Admin/MataKuliah/MataKuliah";
import PageNotFound from "@/Pages/Error/PageNotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
  { index: true, element: <Navigate to="dashboard" /> },
  {
    path: "dashboard",
    element: <PermissionRoute permission="dashboard.view"><Dashboard /></PermissionRoute>,
  },
  {
    path: "mahasiswa",
    children: [
      {
        index: true,
        element: <PermissionRoute permission="mahasiswa.view"><Mahasiswa /></PermissionRoute>,
      },
      {
        path: ":nim",
        element: <PermissionRoute permission="mahasiswa.view"><MahasiswaDetail /></PermissionRoute>,
      },
    ],
  },
  {
    path: "dosen",
    element: <PermissionRoute permission="dosen.view"><Dosen /></PermissionRoute>,
  },
  {
    path: "matakuliah",
    element: <PermissionRoute permission="matakuliah.view"><MataKuliah /></PermissionRoute>,
  },
  {
    path: "users",
    element: <PermissionRoute permission="user.manage"><User /></PermissionRoute>,
  },
],
  },
    {
    path: "/login",
    element: <Navigate to="/" replace />,
    },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Toaster position="top-right" reverseOrder={false} />
    <RouterProvider router={router} />
  </React.StrictMode>
);