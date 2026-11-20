import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@/Pages/Admin/Components/Card";
import Heading from "@/Pages/Admin/Components/Heading";
import Button from "@/Pages/Admin/Components/Button";
import MahasiswaModal from "./MahasiswaModal";
import MahasiswaTable from "./MahasiswaTable";
import { mahasiswaList } from "@/Data/Dummy";
import {
  confirmDelete,
  confirmUpdate,
} from "@/Utils/Helpers/SwalHelpers";

import { toastSuccess } from "@/Utils/Helpers/ToastHelpers";

const Mahasiswa = () => {
  const navigate = useNavigate();
  const [mahasiswa, setMahasiswa] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState({ nim: "", nama: "" });

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

  const openAddModal = () => {
    setForm({ nim: "", nama: "" });
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
  if (!form.nim || !form.nama) {
    toastError("NIM dan Nama wajib diisi");
    return;
  }

  if (isEdit) {
    confirmUpdate(() => {
      updateMahasiswa(form.nim, form);
      toastSuccess("Data berhasil diperbarui");
      setForm({ nim: "", nama: "" });
      setIsEdit(false);
      setIsModalOpen(false);
    });
  } else {
    const exists = mahasiswa.find((m) => m.nim === form.nim);
    if (exists) {
      toastError("NIM sudah terdaftar!");
      return;
    }
    addMahasiswa(form);
    toastSuccess("Data berhasil ditambahkan");
    setForm({ nim: "", nama: "" });
    setIsModalOpen(false);
  }
};

  const handleDelete = (nim) => {
  confirmDelete(() => {
    deleteMahasiswa(nim);
    toastSuccess("Data berhasil dihapus");
  });


    if (isConfirmed) {
      const filtered = mahasiswa.filter((mhs) => mhs.nim !== nim);
      setMahasiswa(filtered);
      showSuccess("Data berhasil dihapus!");
    } else {
      showError("Penghapusan data dibatalkan!");
    }
  };

  return (
    <>
      <Card>
        <div className="flex justify-between items-center mb-4">
          <Heading as="h2" className="mb-0 text-left">
            Daftar Mahasiswa
          </Heading>

          <Button onClick={openAddModal}>+ Tambah Mahasiswa</Button>
        </div>

        <MahasiswaTable
          data={mahasiswa}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onDetail={(nim) => navigate(`/admin/mahasiswa/${nim}`)}
        />
      </Card>

      <MahasiswaModal
        isOpen={isModalOpen}
        isEdit={isEdit}
        form={form}
        onChange={handleChange}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default Mahasiswa;
