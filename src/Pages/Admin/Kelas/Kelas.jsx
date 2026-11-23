import { useState } from "react";
import { can } from "@/Utils/permissions";
import { usePagination } from "@/Utils/Hooks/usePagination";
import Pagination from "@/Pages/Admin/Components/Pagination";
import { toastSuccess, toastError } from "@/Utils/Helpers/ToastHelpers";
import {
  useKelas,
  useCreateKelas,
  useUpdateKelas,
  useDeleteKelas,
} from "@/Utils/Hooks/useKelas";
import { useMataKuliah } from "@/Utils/Hooks/useMataKuliah";
import { useDosen } from "@/Utils/Hooks/useDosen";
import KelasTable from "./KelasTable";
import KelasModal from "./KelasModal";

const emptyForm = { kode: "", nama: "", mataKuliahId: "", dosenId: "", hari: "", ruang: "" };

const Kelas = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);

  const canManage = can("data.manage");

  const { data = [], isLoading, isError } = useKelas();
  const pagination = usePagination(data);
  const { data: mataKuliah = [] } = useMataKuliah();
  const { data: dosen = [] } = useDosen();
  const createKelas = useCreateKelas();
  const updateKelas = useUpdateKelas();
  const deleteKelas = useDeleteKelas();

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
      mataKuliahId: item.mataKuliahId,
      dosenId: item.dosenId,
      hari: item.hari,
      ruang: item.ruang,
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

    const options = {
      onSuccess: () => {
        toastSuccess(editId ? "Kelas diperbarui" : "Kelas ditambahkan");
        closeModal();
      },
      onError: () => toastError("Gagal menyimpan data"),
    };

    if (editId) {
      updateKelas.mutate({ id: editId, data: form }, options);
    } else {
      createKelas.mutate(form, options);
    }
  };

  const handleDelete = (id) => {
    if (!canManage) return toastError("Kamu tidak punya izin menghapus data");
    if (!confirm("Yakin hapus kelas ini?")) return;

    deleteKelas.mutate(id, {
      onSuccess: () => toastSuccess("Kelas dihapus"),
      onError: () => toastError("Gagal menghapus data"),
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-blue-700">Daftar Kelas</h2>
        {canManage && (
          <button
            onClick={openAdd}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-lg"
          >
            + Tambah Kelas
          </button>
        )}
      </div>

      {isLoading ? (
        <p className="text-gray-500">Loading...</p>
      ) : isError ? (
        <p className="text-red-600">Gagal mengambil data kelas.</p>
      ) : (
        <>
          <KelasTable
            data={pagination.pageData}
            mataKuliah={mataKuliah}
            dosen={dosen}
            onEdit={openEdit}
            onDelete={handleDelete}
            canManage={canManage}
          />
          <Pagination {...pagination} />
        </>
      )}

      <KelasModal
        isOpen={isOpen}
        isEdit={!!editId}
        form={form}
        mataKuliah={mataKuliah}
        dosen={dosen}
        onChange={handleChange}
        onClose={closeModal}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Kelas;