// Jalankan SEKALI saja: node seed.js  (json-server harus sedang menyala)
const API = "http://localhost:3000";

const request = async (method, resource, body) => {
  const res = await fetch(`${API}/${resource}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`${method} /${resource} gagal (${res.status})`);
  return res.json();
};

const nama = [
  "Budi", "Siti", "Ahmad", "Ryan", "Dewi", "Andi",
  "Rina", "Fajar", "Lestari", "Hendra", "Putri", "Yoga",
];

const mataKuliahNama = [
  "Pemrograman Web", "Basis Data", "Algoritma", "Struktur Data",
  "Jaringan Komputer", "Sistem Operasi", "Rekayasa Perangkat Lunak",
  "Kecerdasan Buatan", "Pemrograman Mobile", "Keamanan Informasi",
  "Interaksi Manusia dan Komputer", "Statistika",
];

const hari = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

const main = async () => {
  for (let i = 0; i < 12; i++) {
    await request("POST", "mahasiswa", {
      nim: `2022${1001 + i}`,
      nama: `${nama[i]} Pratama`,
    });
  }

  const dosen = [];
  for (let i = 0; i < 12; i++) {
    dosen.push(
      await request("POST", "dosen", {
        nidn: `06001${100 + i}`,
        nama: `Dr. ${nama[i]} Wijaya`,
        email: `${nama[i].toLowerCase()}@dosen.ac.id`,
      })
    );
  }

  const matakuliah = [];
  for (let i = 0; i < 12; i++) {
    matakuliah.push(
      await request("POST", "matakuliah", {
        kode: `MK${String(i + 1).padStart(3, "0")}`,
        nama: mataKuliahNama[i],
        sks: 2 + (i % 3),
        semester: 1 + (i % 8),
      })
    );
  }

  for (let i = 0; i < 12; i++) {
    await request("POST", "kelas", {
      kode: `TI-${101 + i}`,
      nama: `Kelas ${["A", "B", "C"][i % 3]}`,
      mataKuliahId: matakuliah[i].id,
      dosenId: dosen[i].id,
      hari: hari[i % 6],
      ruang: `H.${1 + (i % 4)}.${1 + (i % 3)}`,
    });
  }

  console.log("Seed selesai: 12 data untuk mahasiswa, dosen, matakuliah, kelas");
};

main().catch((err) => console.error(err.message));