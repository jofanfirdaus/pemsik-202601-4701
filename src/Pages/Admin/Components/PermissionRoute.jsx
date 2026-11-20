import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { can } from "@/Utils/permissions";

const fallbackPages = [
  { permission: "dashboard.view", path: "/admin/dashboard" },
  { permission: "mahasiswa.view", path: "/admin/mahasiswa" },
  { permission: "dosen.view", path: "/admin/dosen" },
  { permission: "matakuliah.view", path: "/admin/matakuliah" },
];

const PermissionRoute = ({ permission, children }) => {
  const { pathname } = useLocation();
  const allowed = can(permission);

  useEffect(() => {
    if (!allowed) {
      toast.error("Kamu tidak punya akses ke halaman ini", { id: "no-access" });
    }
  }, [allowed]);

  if (allowed) return children;

  // cari halaman pertama yang boleh dibuka user
  const fallback = fallbackPages.find(
    (page) => can(page.permission) && page.path !== pathname
  );

  if (fallback) return <Navigate to={fallback.path} replace />;

  // tidak punya izin sama sekali: keluarkan user ke halaman login
  localStorage.removeItem("user");
  return <Navigate to="/" replace />;
};

export default PermissionRoute;