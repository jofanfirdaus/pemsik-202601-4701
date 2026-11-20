import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./Pages/Auth/Login/Login";
import Register from "./Pages/Auth/Register/Register";
import AdminLayout from "./Pages/Admin/AdminLayout";
import Dashboard from "./Pages/Admin/Dashboard/Dashboard";
import Mahasiswa from "./Pages/Admin/Mahasiswa/Mahasiswa";
import MahasiswaDetail from "./Pages/Admin/MahasiswaDetail/MahasiswaDetail";
import Dosen from "./Pages/Admin/Dosen/Dosen";
import MataKuliah from "./Pages/Admin/MataKuliah/MataKuliah";
import PageNotFound from "./Pages/Error/PageNotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="mahasiswa" element={<Mahasiswa />} />
          <Route path="mahasiswa/:id" element={<MahasiswaDetail />} />
          <Route path="dosen" element={<Dosen />} />
          <Route path="matakuliah" element={<MataKuliah />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;