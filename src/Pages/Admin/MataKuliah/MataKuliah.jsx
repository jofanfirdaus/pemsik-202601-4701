import { useState } from "react";
import { can } from "@/Utils/permissions";
import { usePagination } from "@/Utils/Hooks/usePagination";
import Pagination from "@/Pages/Admin/Components/Pagination";
import { toastSuccess, toastError } from "@/Utils/Helpers/ToastHelpers";
import {
  useMataKuliah,
  useCreateMataKuliah,
  useUpdateMataKuliah,
  useDeleteMataKuliah,
} from "@/Utils/Hooks/useMataKuliah";
import MataKuliahTable from "./MataKuliahTable";
import MataKuliahModal from "./MataKuliahModal";

const emptyForm = { kode: "", nama: "", sks: "", semester: "" };

const MataKuliah = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);

  const canManage = can("data.manage");

  const { data = [], isLoading, isError } = useMataKuliah();
  const pagination = usePagination(data);
  const createMk = useCreateMataKuliah();
  const updateMk = useUpdateMataKuliah();
  const deleteMk = useDeleteMataKuliah();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const openAdd = () => {
    setEditId(null);
    setForm(emptyForm);
    setIsOpen(true);
  };

  const openEdit = (item) => {
    setEditId(item.id);
    setForm({
      kode: item.kode,
      nama: item.nama,
      sks: item.sks,
      semester: item.semester,
    });
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

    const payload = {
      ...form,
      sks: Number(form.sks),
      semester: Number(form.semester),
    };

    const options = {
      onSuccess: () => {
        toastSuccess(editId ? "Mata kuliah diperbarui" : "Mata kuliah ditambahkan");
        closeModal();
      },
      onError: () => toastError("Gagal menyimpan data"),
    };

    if (editId) {
      updateMk.mutate({ id: editId, data: payload }, options);
    } else {
      createMk.mutate(payload, options);
    }
  };

  const handleDelete = (id) => {
    if (!canManage) return toastError("Kamu tidak punya izin menghapus data");
    if (!confirm("Yakin hapus mata kuliah ini?")) return;

    deleteMk.mutate(id, {
      onSuccess: () => toastSuccess("Mata kuliah dihapus"),
      onError: () => toastError("Gagal menghapus data"),
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-blue-700">Daftar Mata Kuliah</h2>
        {canManage && (
          <button
            onClick={openAdd}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-lg"
          >
            + Tambah Mata Kuliah
          </button>
        )}
      </div>

      {isLoading ? (
        <p className="text-gray-500">Loading...</p>
      ) : isError ? (
        <p className="text-red-600">Gagal mengambil data mata kuliah.</p>
      ) : (
        <>
          <MataKuliahTable
            data={pagination.pageData}
            onEdit={openEdit}
            onDelete={handleDelete}
            canManage={canManage}
          />
          <Pagination {...pagination} />
        </>
      )}

      <MataKuliahModal
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

export default MataKuliah;