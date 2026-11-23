import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@/Pages/Admin/Components/Button";
import { confirmLogout } from "@/Utils/Helpers/SwalHelpers";
import { getCurrentUser } from "@/Utils/permissions";

const pageTitles = [
  { prefix: "/admin/dashboard", title: "Dashboard" },
  { prefix: "/admin/mahasiswa/", title: "Detail Mahasiswa" },
  { prefix: "/admin/mahasiswa", title: "Mahasiswa" },
  { prefix: "/admin/dosen", title: "Dosen" },
  { prefix: "/admin/matakuliah", title: "Mata Kuliah" },
  { prefix: "/admin/kelas", title: "Kelas" },
  { prefix: "/admin/users", title: "Pengguna" },
];

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const user = getCurrentUser();
  const title =
    pageTitles.find((p) => pathname.startsWith(p.prefix))?.title ?? "Admin";

  const handleLogout = () => {
    confirmLogout(() => {
      localStorage.removeItem("user");
      setIsMenuOpen(false);
      navigate("/", { replace: true });
    });
  };

  return (
    <header className="bg-white shadow-md">
      <div className="flex justify-between items-center px-6 py-4">
        <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>

        <div className="relative">
          <Button
            onClick={() => setIsMenuOpen((open) => !open)}
            className="w-8 h-8 rounded-full bg-gray-300 focus:outline-none"
          />

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10">
              {user && (
                <div className="px-4 py-2 border-b">
                  <p className="text-sm font-semibold text-gray-800">{user.nama}</p>
                  <p className="text-xs text-gray-500">{user.role}</p>
                </div>
              )}
              <a
                href="#"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Profile
              </a>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;