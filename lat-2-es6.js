// bedah data JSON: array dan object

//arrray
const nilai = [100, 20, 80];

// destructurin = membedah data 
const nilai2 = nilai[1]; // ambil data ke 2, brarti indeks ke 1
console.log(`nilai ke 2 dari array : ${nilai2}`);

//spread array = nambah/ kurangi data array
const nilai_new = [99];
const array_nilai_tambah = [...nilai_new, nilai]; //ini mau menambahkan
const tambah_dibelakang = [nilai, ...nilai_new];

console.log(`tambah belakang ${tambah_dibelakang}`);
console.log(`kumpulan array nilai baru: ${array_nilai_tambah}`);









// ===================

//object
const mhs = {
    namaku : "Jofan",
    umurku: 19,
    nilaiku : [90, 90, 10000],
};

// destructuring object
const nama_ku = mhs.nama; // ambil value dari key nama, dari object mhs
const {namaku, umurku, nilaiku } = mhs; // langsung buat banyak dari key

console.log(`Nama : ${namaku}, Umur boss: ${umurku}`);

//spread object = tambah data keyv_value ke object
const nimku = {nim : "A11.2024.15860"};

const new_mhs = {
    ...nimku,
    ...mhs,
};

console.log(new_mhs);  

//==================

//array of object = artinya kumpulan object dalam array
const list_mhs = [
    {
        nama : "Jofan",
        umur : 19,
    },
    {
        nama : "irghy",
        umur : 21,
    }
];

//destructuring array of object
const nama_mhs_kedua = list_mhs[1].nama;

console.log(nama_mhs_kedua);

//spread, tambah object ke array of object
const mhs_anyar = {
    nama: "kak ros",
    umur: 76,
};

const list_mhs_anyar = [...list_mhs, mhs_anyar];

console.log(list_mhs_anyar)