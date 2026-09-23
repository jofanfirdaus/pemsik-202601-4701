//output di js
console.log("jofan");

//lakukan : ctrl+shift+p
//pilih: quokka start current file

// variable 3 cara: var , let , const
const nama = "Jofan";
const nim = "A11.2024.15860";
const umur = "21";
const nilai = [90,100,95];

console.log("Nama: " + nama);

//konsep es6 pertama 
//cara riteral output, output dengan keindahan
console.log(`Nama : ${nama}, umur: ${umur}, nim: ${nim}, nilai: ${nilai} `)

//konsep es6 kedua
// function cara keindahan
const data_diri = (nama,nim) => `Nama : ${nama}, umur: ${umur}, nim: ${nim}, nilai: ${nilai}`

console.log(data_diri(nama,nim));

//cara lama function
function penjumlahan1(bil1, bil2){
    return bil1+bil2;
}

// cara es6
const penjumlahan2 = (bil1,bil2) => bil1 + bil2;

console.log(penjumlahan1(20,3));
console.log(penjumlahan2(20,3));