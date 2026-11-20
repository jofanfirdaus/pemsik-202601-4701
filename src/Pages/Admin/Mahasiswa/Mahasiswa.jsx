import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@/Pages/Admin/Components/Card";
import Heading from "@/Pages/Admin/Components/Heading";
import Button from "@/Pages/Admin/Components/Button";
import MahasiswaModal from "./MahasiswaModal";
import MahasiswaTable from "./MahasiswaTable";
import { mahasiswaList } from "@/Data/Dummy";
import { confirmDelete, confirmUpdate } from "@/Utils/Helpers/SwalHelpers";
import { toastSuccess, toastError } from "@/Utils/Helpers/ToastHelpers";
import { can } from "@/Utils/permissions";

const emptyForm = { nim: "", nama: "" };

const Mahasiswa = () => {
  const navigate = useNavigate();
  const [mahasiswa, setMahasiswa] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const canManage = can("data.manage");

  const fetchMahasiswa = async () => {
    setMahasiswa(mahasiswaList);
  };

  useEffect(() => {
    setTimeout(() => fetchMahasiswa(), 500);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const closeModal = () => {
    setForm(emptyForm);
    setIsEdit(false);
    setIsModalOpen(false);
  };

  const openAddModal = () => {
    setForm(emptyForm);
    setIsEdit(false);
    setIsModalOpen(true);
  };

  const handleEdit = (mhs) => {
    setForm({ nim: mhs.nim, nama: mhs.nama });
    setIsEdit(true);
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!canManage) {
      toastError("Kamu tidak punya izin mengubah data");
      return;
    }

    if (!form.nim || !form.nama) {
      toastError("NIM dan Nama wajib diisi");
      return;
    }

    if (isEdit) {
      confirmUpdate(() => {
        setMahasiswa((prev) =>
          prev.map((m) => (m.nim === form.nim ? { ...m, ...form } : m))
        );
        toastSuccess("Data berhasil diperbarui");
        closeModal();
      });
    } else {
      const exists = mahasiswa.find((m) => m.nim === form.nim);
      if (exists) {
        toastError("NIM sudah terdaftar!");
        return;
      }
      setMahasiswa((prev) => [...prev, form]);
      toastSuccess("Data berhasil ditambahkan");
      closeModal();
    }
  };

  const handleDelete = (nim) => {
    if (!canManage) {
      toastError("Kamu tidak punya izin menghapus data");
      return;
    }

    confirmDelete(() => {
      setMahasiswa((prev) => prev.filter((m) => m.nim !== nim));
      toastSuccess("Data berhasil dihapus");
    });
  };

  return (
    <>
      <Card>
        <div className="flex justify-between items-center mb-4">
          <Heading as="h2" className="mb-0 text-left">
            Daftar Mahasiswa
          </Heading>

          {canManage && (
            <Button onClick={openAddModal}>+ Tambah Mahasiswa</Button>
          )}
        </div>

        <MahasiswaTable
          data={mahasiswa}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onDetail={(nim) => navigate(`/admin/mahasiswa/${nim}`)}
          canManage={canManage}
        />
      </Card>

      <MahasiswaModal
        isOpen={isModalOpen}
        isEdit={isEdit}
        form={form}
        onChange={handleChange}
        onClose={closeModal}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default Mahasiswa;