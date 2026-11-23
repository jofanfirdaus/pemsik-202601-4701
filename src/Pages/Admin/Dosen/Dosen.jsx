import { useState } from "react";
import { can } from "@/Utils/permissions";
import { usePagination } from "@/Utils/Hooks/usePagination";
import Pagination from "@/Pages/Admin/Components/Pagination";
import { toastSuccess, toastError } from "@/Utils/Helpers/ToastHelpers";
import {
  useDosen,
  useCreateDosen,
  useUpdateDosen,
  useDeleteDosen,
} from "@/Utils/Hooks/useDosen";
import DosenTable from "./DosenTable";
import DosenModal from "./DosenModal";


const emptyForm = { nidn: "", nama: "", email: "" };

const Dosen = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);

  const canManage = can("data.manage");

  const { data = [], isLoading, isError } = useDosen();
  const pagination = usePagination(data);
  const createDosen = useCreateDosen();
  const updateDosen = useUpdateDosen();
  const deleteDosen = useDeleteDosen();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canManage) return toastError("Kamu tidak punya izin mengubah data");

    const options = {
      onSuccess: () => {
        toastSuccess(editId ? "Data dosen diperbarui" : "Data dosen ditambahkan");
        closeModal();
      },
      onError: () => toastError("Gagal menyimpan data"),
    };

    if (editId) {
      updateDosen.mutate({ id: editId, data: form }, options);
    } else {
      createDosen.mutate(form, options);
    }
  };

  const handleDelete = (id) => {
    if (!canManage) return toastError("Kamu tidak punya izin menghapus data");
    if (!confirm("Yakin hapus data ini?")) return;

    deleteDosen.mutate(id, {
      onSuccess: () => toastSuccess("Data dosen dihapus"),
      onError: () => toastError("Gagal menghapus data"),
    });
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

      {isLoading ? (
        <p className="text-gray-500">Loading...</p>
      ) : isError ? (
        <p className="text-red-600">Gagal mengambil data dosen.</p>
      ) : (
      <>
        <DosenTable
        data={pagination.pageData}
        onEdit={openEdit}
        onDelete={handleDelete}
        canManage={canManage}
      />
      <Pagination {...pagination} />
      </>
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