// Pemanggilan library
const axios = require('axios')
const express = require('express');

// Inisialisasi server
const app = express();
app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

//Memanggil data User
function getUser() {
    return axios.get('https://jsonplaceholder.typicode.com/users')
    .then(resp  => {return resp.data});    
}
// Memanggil data ToDo
function getToDo() {
    return axios.get('https://jsonplaceholder.typicode.com/todos')
    .then(resp  => {return resp.data});    
}
// Memanggil data Post
function getPost() {
    return axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(resp  => { return resp.data });    
}

// Transfer data ke client-side js
app.get('/api', async (request, response) => {
    
    //PROGRAM UTAMA
    const user = await getUser();
    const toDo = await getToDo();
    const post = await getPost();
    
    // Untuk setiap user akan dicocokan
    let output = ""
    user.forEach(dataUser => {
        var countNotCompleted = 0;
        // Menghitung jumlah ToDo yang belum selesai
        toDo.forEach(dataToDo => {        
            if (dataToDo.userId == dataUser.id){
                if (dataToDo.completed == false){
                    countNotCompleted++;
                }
            }
        });
        // Jika user ini memiliki jumlah ToDo sama atau lebih besar dari 10
        if(countNotCompleted>=10){
            output += `
            <br><h3>Nama : ${dataUser.name}</h3>
            <h3>Post :</h3>`
            var count = 1;
            post.forEach(dataPost => {
                if(dataUser.id==dataPost.userId){
                    if(count<=2){
                        output += `
                        <p>${count}. Judul : ${dataPost.title}</p>
                        <p>Isi   : ${dataPost.body}</p><br>
                        `
                        count++;
                    }
                }
            })   
        }
    })  
    // Kirim data
    response.send(output)
  });
