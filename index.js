const axios = require('axios');

// Memanggil data User
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

// Program utama menggunakan async dan wait
async function main() {
    // Menginisialisasi data
    const user = await getUser();
    const toDo = await getToDo();
    const post = await getPost();
    
    // Untuk setiap user akan dicocokan 
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
            console.log(`Nama : ${dataUser.name}`);
            console.log('Post :');
            var count = 1;
            post.forEach(dataPost => {
                if(dataUser.id==dataPost.userId){
                    if(count<=2){
                        console.log(`${count}. Judul : ${dataPost.title}`);
                        console.log(`   Isi   : ${dataPost.body}`);
                        console.log('')
                        count++;
                    }
                }
            })   
        }  
    })
}

main()