import { NavLink } from "react-router-dom";
import { can } from "@/Utils/permissions";

const menus = [
  { to: "/admin/dashboard", icon: "🏠", label: "Dashboard", permission: "dashboard.view" },
  { to: "/admin/mahasiswa", icon: "🎓", label: "Mahasiswa", permission: "mahasiswa.view" },
  { to: "/admin/dosen", icon: "👨‍🏫", label: "Dosen", permission: "dosen.view" },
  { to: "/admin/matakuliah", icon: "📚", label: "Mata Kuliah", permission: "matakuliah.view" },
  { to: "/admin/users", icon: "👤", label: "Pengguna", permission: "user.manage" },
  { to: "/admin/kelas", icon: "🏫", label: "Kelas", permission: "kelas.view" },
];

const Sidebar = () => {
  return (
    <aside className="bg-blue-800 text-white min-h-screen transition-all duration-300 w-20 lg:w-64">
      <div className="p-4 border-b border-blue-700">
        <span className="text-2xl font-bold hidden lg:block">Admin</span>
      </div>
      <nav className="p-4 space-y-2">
        {menus
          .filter((menu) => can(menu.permission))
          .map((menu) => (
            <NavLink
              key={menu.to}
              to={menu.to}
              className={({ isActive }) =>
                `flex items-center space-x-2 px-4 py-2 rounded ${
                  isActive ? "bg-blue-700" : "hover:bg-blue-700"
                }`
              }
            >
              <span>{menu.icon}</span>
              <span className="menu-text hidden lg:inline">{menu.label}</span>
            </NavLink>
          ))}
      </nav>
    </aside>
  );
};

export default Sidebar;