import { useEffect, useState } from "react";
import api from "@/Utils/api";
import { toastSuccess, toastError } from "@/Utils/Helpers/ToastHelpers";
import { ROLES, getCurrentUser } from "@/Utils/permissions";
import { usePagination } from "@/Utils/Hooks/usePagination";
import Pagination from "@/Pages/Admin/Components/Pagination";
import UserTable from "./UserTable";
import UserModal from "./UserModal";

const User = () => {
  const [data, setData] = useState([]);
  const pagination = usePagination(data);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [role, setRole] = useState("mahasiswa");
  const [permissions, setPermissions] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.get("/users");
      setData(res.data);
    } catch (err) {
      console.error(err);
      toastError("Gagal mengambil data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openEdit = (user) => {
    setSelected(user);
    setRole(user.role || "mahasiswa");
    setPermissions(user.permissions || []);
  };

  const closeModal = () => setSelected(null);

  // ganti role -> permission mengikuti template role
  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setPermissions(ROLES[newRole] || []);
  };

  const togglePermission = (key) => {
    setPermissions((prev) =>
      prev.includes(key) ? prev.filter((p) => p !== key) : [...prev, key]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.patch(`/users/${selected.id}`, { role, permissions });

      // kalau yang diubah adalah user yang sedang login, perbarui localStorage
      const me = getCurrentUser();
      if (me && String(me.id) === String(selected.id)) {
        localStorage.setItem("user", JSON.stringify({ ...me, role, permissions }));
      }

      toastSuccess("Role dan permission diperbarui");
      closeModal();
      fetchData();
    } catch (err) {
      console.error(err);
      toastError("Gagal menyimpan perubahan");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">Daftar Pengguna</h2>

    {loading ? (
    <p className="text-gray-500">Loading...</p>
    ) : (
    <>
      <UserTable data={pagination.pageData} onEdit={openEdit} />
      <Pagination {...pagination} />
    </>
  )}

      <UserModal
        user={selected}
        role={role}
        permissions={permissions}
        onRoleChange={handleRoleChange}
        onToggle={togglePermission}
        onClose={closeModal}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default User;