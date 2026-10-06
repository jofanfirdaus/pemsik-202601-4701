// DATA
const mataKuliahList = {
  mataKuliah: [
    { kode: "MK001", nama: "Pemrograman Web", sks: 3 },
    { kode: "MK002", nama: "Sistem Operasi", sks: 3 },
    { kode: "MK003", nama: "Kecerdasan Buatan", sks: 2 },
  ],
};

const mahasiswaList = {
  mahasiswa: [
    {
      nim: "23001",
      nama: "Ahmad Fauzan",
      status: true,
      matkul: [
        { matkulId: "MK001", tugas: 88, uts: 85, uas: 90 },
        { matkulId: "MK002", tugas: 80, uts: 78, uas: 82 },
      ],
    },
    {
      nim: "23002",
      nama: "Siti Aisyah",
      status: false,
      matkul: [
        { matkulId: "MK001", tugas: 75, uts: 70, uas: 78 },
        { matkulId: "MK003", tugas: 82, uts: 80, uas: 85 },
      ],
    },
  ],
};

let listMahasiswa = [
  { nim: "23003", nama: "Rizky Ramadhan", status: true },
  { nim: "23001", nama: "Ahmad Fauzan", status: false },
  { nim: "23002", nama: "Siti Aisyah", status: true },
];

const getMatkul = (kode) =>
  mataKuliahList.mataKuliah.find((m) => m.kode === kode);

// OBJEK MAHASISWA

// 1. show()
const show = () => {
  mahasiswaList.mahasiswa.forEach((mhs) => {
    console.log(
      `NIM: ${mhs.nim}, Nama: ${mhs.nama}, Status: ${
        mhs.status ? "Aktif" : "Tidak Aktif"
      }`
    );

    console.log("Mata Kuliah:");

    mhs.matkul.forEach((mk) => {
      console.log(
        `- ${getMatkul(mk.matkulId).nama}: Tugas ${mk.tugas}, UTS ${mk.uts}, UAS ${mk.uas}`
      );
    });
  });
};

console.log("\n=== 1. show() ===");
show();

// 2. add()
const add = (mahasiswa) => mahasiswaList.mahasiswa.push(mahasiswa);

add({
  nim: "23003",
  nama: "Rizky Ramadhan",
  status: true,
  matkul: [
    {
      matkulId: "MK003",
      tugas: 90,
      uts: 88,
      uas: 92,
    },
  ],
});

console.log("\n=== 2. add() ===");
console.log(mahasiswaList);

// 3. update()
const update = (nim, dataBaru) => {
  mahasiswaList.mahasiswa = mahasiswaList.mahasiswa.map((m) =>
    m.nim === nim ? { ...m, ...dataBaru } : m
  );
};

update("23001", { status: false });

console.log("\n=== 3. update() ===");
console.log(mahasiswaList);

// 4. deleteById()
const deleteById = (nim) => {
  mahasiswaList.mahasiswa = mahasiswaList.mahasiswa.filter(
    (m) => m.nim !== nim
  );
};

deleteById("23002");

console.log("\n=== 4. deleteById() ===");
console.log(mahasiswaList);

// 5. totalNilai()
const totalNilai = (nim) => {
  const mahasiswa = mahasiswaList.mahasiswa.find((m) => m.nim === nim);

  if (!mahasiswa) return "Mahasiswa tidak ditemukan";

  return mahasiswa.matkul.map((mk) => {
    const total = mk.tugas + mk.uts + mk.uas;

    return {
      matkulId: mk.matkulId,
      total,
    };
  });
};

console.log("\n=== 5. totalNilai() ===");
console.log(totalNilai("23001"));

// 6. kategoriNilai()
const kategoriNilai = (nilai) => {
  if (nilai >= 85) return "A";
  if (nilai >= 75) return "B";
  if (nilai >= 65) return "C";
  if (nilai >= 50) return "D";
  return "E";
};

console.log("\n=== 6. kategoriNilai() ===");
console.log(kategoriNilai(90));
console.log(kategoriNilai(72));

// 7. IPS()
const bobot = {
  A: 4,
  B: 3,
  C: 2,
  D: 1,
  E: 0,
};

const IPS = (nim) => {
  const mahasiswa = mahasiswaList.mahasiswa.find((m) => m.nim === nim);

  if (!mahasiswa) return "Mahasiswa tidak ditemukan";

  const totalSks = mahasiswa.matkul.reduce(
    (sum, mk) => sum + getMatkul(mk.matkulId).sks,
    0
  );

  const totalBobot = mahasiswa.matkul.reduce((sum, mk) => {
    const nilaiAkhir =
      mk.tugas * 0.3 +
      mk.uts * 0.3 +
      mk.uas * 0.4;

    return (
      sum +
      bobot[kategoriNilai(nilaiAkhir)] *
        getMatkul(mk.matkulId).sks
    );
  }, 0);

  return (totalBobot / totalSks).toFixed(2);
};

console.log("\n=== 7. IPS() ===");
console.log(`IPS Mahasiswa 23001: ${IPS("23001")}`);

// 8. clear()
const clear = () => {
  mahasiswaList.mahasiswa = [];
};

console.log("\n=== 8. clear() ===");
clear();
console.log(mahasiswaList);

// ARRAY OF OBJECT (LIST MAHASISWA)

// 1. jumlahMahasiswa()
const jumlahMahasiswa = () => listMahasiswa.length;

console.log("\n=== 1. jumlahMahasiswa() ===");
console.log(`Jumlah Mahasiswa: ${jumlahMahasiswa()}`);

// 2. sortByNIM()
const sortByNIM = () =>
  listMahasiswa.sort((a, b) =>
    a.nim.localeCompare(b.nim)
  );

console.log("\n=== 2. sortByNIM() ===");
console.log(sortByNIM());

// 3. sortByStatus()
const sortByStatus = () =>
  listMahasiswa.sort((a, b) => b.status - a.status);

console.log("\n=== 3. sortByStatus() ===");
console.log(sortByStatus());

// 4. jumlahAktifTidak()
const jumlahAktifTidak = () => {
  return {
    aktif: listMahasiswa.filter((m) => m.status).length,
    tidakAktif: listMahasiswa.filter((m) => !m.status).length,
  };
};

console.log("\n=== 4. jumlahAktifTidak() ===");
console.log(jumlahAktifTidak());

// 5. clearArray()
const clearArray = () => {
  listMahasiswa = [];
};

console.log("\n=== 5. clearArray() ===");
clearArray();
console.log(listMahasiswa);