import { useEffect, useState } from "react";
import api from "@/Utils/api";
import { can } from "@/Utils/permissions";
import { toastSuccess, toastError } from "@/Utils/Helpers/ToastHelpers";
import DosenTable from "./DosenTable";
import DosenModal from "./DosenModal";

const emptyForm = { nidn: "", nama: "", email: "" };

const Dosen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);

  const canManage = can("data.manage");

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.get("/dosen");
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

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const openAdd = () => {
    setEditId(null);
    setForm(emptyForm);
    setIsOpen(true);
  };

  const openEdit = (item) => {
    setEditId(item.id);
    setForm({ nidn: item.nidn, nama: item.nama, email: item.email });
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setEditId(null);
    setForm(emptyForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canManage) return toastError("Kamu tidak punya izin mengubah data");
    try {
      if (editId) {
        await api.put(`/dosen/${editId}`, form);
        toastSuccess("Data dosen diperbarui");
      } else {
        await api.post("/dosen", form);
        toastSuccess("Data dosen ditambahkan");
      }
      closeModal();
      fetchData();
    } catch (err) {
      console.error(err);
      toastError("Gagal menyimpan data");
    }
  };

  const handleDelete = async (id) => {
    if (!canManage) return toastError("Kamu tidak punya izin menghapus data");
    if (!confirm("Yakin hapus data ini?")) return;
    try {
      await api.delete(`/dosen/${id}`);
      toastSuccess("Data dosen dihapus");
      fetchData();
    } catch (err) {
      console.error(err);
      toastError("Gagal menghapus data");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-blue-700">Daftar Dosen</h2>
        {canManage && (
          <button
            onClick={openAdd}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-lg"
          >
            + Tambah Dosen
          </button>
        )}
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <DosenTable
          data={data}
          onEdit={openEdit}
          onDelete={handleDelete}
          canManage={canManage}
        />
      )}

      <DosenModal
        isOpen={isOpen}
        isEdit={!!editId}
        form={form}
        onChange={handleChange}
        onClose={closeModal}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Dosen;