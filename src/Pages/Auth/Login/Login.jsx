import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";

import Input from "@/Pages/Auth/Components/Input";
import Label from "@/Pages/Auth/Components/Label";
import Button from "@/Pages/Auth/Components/Button";
import Link from "@/Pages/Auth/Components/Link";
import Card from "@/Pages/Auth/Components/Card";
import Heading from "@/Pages/Auth/Components/Heading";
import Form from "@/Pages/Auth/Components/Form";

import api from "@/Utils/api";
import { toastSuccess, toastError } from "@/Utils/Helpers/ToastHelpers";

const Login = () => {
  const navigate = useNavigate();

  // State untuk menyimpan input email dan password
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Memperbarui state saat user mengetik
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.get("/users", {
        params: { email: form.email, password: form.password },
      });

      if (res.data.length === 0) {
        toastError("Email atau password salah!");
        return;
      }

      const { password, ...user } = res.data[0]; // password tidak disimpan
      localStorage.setItem("user", JSON.stringify(user));
      toastSuccess("Login berhasil!");
      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);
      toastError("Gagal terhubung ke server");
    }
  };

  return (
    <Card className="max-w-md">
      <Heading as="h2">Login</Heading>
      <Form onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            name="email"
            placeholder="Masukkan email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Masukkan password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex justify-between items-center">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm text-gray-600">Ingat saya</span>
          </label>
          <Link href="#" className="text-sm">Lupa password?</Link>
        </div>
        <Button type="submit" className="w-full">Login</Button>
      </Form>
      <p className="text-sm text-center text-gray-600 mt-4">
        Belum punya akun?{" "}
        <RouterLink to="/register" className="text-blue-600 hover:underline">
          Daftar
        </RouterLink>
      </p>
    </Card>
  );
};

export default Login;