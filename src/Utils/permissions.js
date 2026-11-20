export const PERMISSIONS = [
  { key: "dashboard.view", label: "Lihat Dashboard" },
  { key: "mahasiswa.view", label: "Lihat Mahasiswa" },
  { key: "dosen.view", label: "Lihat Dosen" },
  { key: "matakuliah.view", label: "Lihat Mata Kuliah" },
  { key: "data.manage", label: "Tambah / Edit / Hapus Data" },
  { key: "user.manage", label: "Kelola Pengguna" },
];

export const ROLES = {
  admin: PERMISSIONS.map((p) => p.key),
  dosen: ["dashboard.view", "mahasiswa.view", "dosen.view", "matakuliah.view", "data.manage"],
  mahasiswa: ["dashboard.view", "mahasiswa.view", "matakuliah.view"],
};

export const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

export const can = (permission) => {
  const user = getCurrentUser();
  return !!user?.permissions?.includes(permission);
};