# Tugas Minggu 2
## Petunjuk Pengerjaan
* Fork repositori ini
* Buat aplikasi dengan mengikuti spesifikasi di bawah
* Edit bagian petunjuk penggunaan pada readme
* Kirimkan merge request

## Spesifikasi
Buatlah sebuah aplikasi nodejs sederhana yang dapat menampilkan nama-nama user yang memiliki todo yang belum selesai, kemudian tampilkan 2 post pertama dari user tersebut dengan memanfaatkan api [**berikut**](https://jsonplaceholder.typicode.com/)

## PREREQUISITE
1. Node Js 
(https://nodejs.org/en/download/)
2. Axios 
(http://zetcode.com/javascript/axios/)

## Petunjuk penggunaan
* Clone repositori.
* Buka terminal lalu ubah direktori terminal menjadi direktori repositori yang sudah di-clone.
* Jalankan kode program dengan mengetikkan node coba.js

## Selamat mencoba ^_^

#### Simple GET Request to endpoint
    const axios = require('axios');
 
    axios.get('http://webcode.me').then(resp => {
      console.log(resp.data);
    });
