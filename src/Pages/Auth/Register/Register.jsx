import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "@/Pages/Auth/Components/Input";
import Label from "@/Pages/Auth/Components/Label";
import Button from "@/Pages/Auth/Components/Button";
import Link from "@/Pages/Auth/Components/Link";
import Card from "@/Pages/Auth/Components/Card";
import Heading from "@/Pages/Auth/Components/Heading";
import Form from "@/Pages/Auth/Components/Form";

import api from "@/Utils/api";
import { ROLES } from "@/Utils/permissions";
import { toastSuccess, toastError } from "@/Utils/Helpers/ToastHelpers";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nama: "", email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // cek apakah email sudah terdaftar
      const cek = await api.get("/users", { params: { email: form.email } });
      if (cek.data.length > 0) {
        toastError("Email sudah terdaftar!");
        return;
      }

      await api.post("/users", {
        ...form,
        role: "mahasiswa",
        permissions: ROLES.mahasiswa,
      });

      toastSuccess("Registrasi berhasil, silakan login!");
      navigate("/");
    } catch (err) {
      console.error(err);
      toastError("Registrasi gagal!");
    }
  };

  return (
    <Card className="max-w-md">
      <Heading as="h2">Register</Heading>
      <Form onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="nama">Nama</Label>
          <Input name="nama" placeholder="Masukkan nama" value={form.nama} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input type="email" name="email" placeholder="Masukkan email" value={form.email} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input type="password" name="password" placeholder="Masukkan password" value={form.password} onChange={handleChange} required />
        </div>
        <Button type="submit" className="w-full">Daftar</Button>
      </Form>
      <p className="text-sm text-center text-gray-600 mt-4">
        Sudah punya akun? <Link href="/">Login</Link>
      </p>
    </Card>
  );
};

export default Register;