import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@/Pages/Admin/Components/Card";
import Heading from "@/Pages/Admin/Components/Heading";
import Button from "@/Pages/Admin/Components/Button";
import Pagination from "@/Pages/Admin/Components/Pagination";
import MahasiswaModal from "./MahasiswaModal";
import MahasiswaTable from "./MahasiswaTable";
import { confirmDelete, confirmUpdate } from "@/Utils/Helpers/SwalHelpers";
import { toastSuccess, toastError } from "@/Utils/Helpers/ToastHelpers";
import { can } from "@/Utils/permissions";
import { usePagination } from "@/Utils/Hooks/usePagination";
import {
  useMahasiswa,
  useCreateMahasiswa,
  useUpdateMahasiswa,
  useDeleteMahasiswa,
} from "@/Utils/Hooks/useMahasiswa";

const emptyForm = { nim: "", nama: "" };

const Mahasiswa = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const canManage = can("data.manage");

  const { data: mahasiswa = [], isLoading, isError } = useMahasiswa();
  const pagination = usePagination(mahasiswa);
  const createMhs = useCreateMahasiswa();
  const updateMhs = useUpdateMahasiswa();
  const deleteMhs = useDeleteMahasiswa();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const closeModal = () => {
    setForm(emptyForm);
    setEditId(null);
    setIsModalOpen(false);
  };

  const openAddModal = () => {
    setForm(emptyForm);
    setEditId(null);
    setIsModalOpen(true);
  };

  const handleEdit = (mhs) => {
    setForm({ nim: mhs.nim, nama: mhs.nama });
    setEditId(mhs.id);
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!canManage) return toastError("Kamu tidak punya izin mengubah data");
    if (!form.nim || !form.nama) return toastError("NIM dan Nama wajib diisi");

    const exists = mahasiswa.find((m) => m.nim === form.nim && m.id !== editId);
    if (exists) return toastError("NIM sudah terdaftar!");

    if (editId) {
      confirmUpdate(() => {
        updateMhs.mutate(
          { id: editId, data: form },
          {
            onSuccess: () => {
              toastSuccess("Data berhasil diperbarui");
              closeModal();
            },
            onError: () => toastError("Gagal memperbarui data"),
          }
        );
      });
    } else {
      createMhs.mutate(form, {
        onSuccess: () => {
          toastSuccess("Data berhasil ditambahkan");
          closeModal();
        },
        onError: () => toastError("Gagal menambahkan data"),
      });
    }
  };

  const handleDelete = (nim) => {
    if (!canManage) return toastError("Kamu tidak punya izin menghapus data");

    const target = mahasiswa.find((m) => m.nim === nim);
    if (!target) return;

    confirmDelete(() => {
      deleteMhs.mutate(target.id, {
        onSuccess: () => toastSuccess("Data berhasil dihapus"),
        onError: () => toastError("Gagal menghapus data"),
      });
    });
  };

  return (
    <>
      <Card>
        <div className="flex justify-between items-center mb-4">
          <Heading as="h2" className="mb-0 text-left">
            Daftar Mahasiswa
          </Heading>
          {canManage && <Button onClick={openAddModal}>+ Tambah Mahasiswa</Button>}
        </div>

        {isLoading ? (
          <p className="text-gray-500">Loading...</p>
        ) : isError ? (
          <p className="text-red-600">Gagal mengambil data mahasiswa.</p>
        ) : (
          <>
            <MahasiswaTable
              data={pagination.pageData}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onDetail={(nim) => navigate(`/admin/mahasiswa/${nim}`)}
              canManage={canManage}
            />
            <Pagination {...pagination} />
          </>
        )}
      </Card>

      <MahasiswaModal
        isOpen={isModalOpen}
        isEdit={!!editId}
        form={form}
        onChange={handleChange}
        onClose={closeModal}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default Mahasiswa;