const axios = require('axios');

//Membuat fungsi untuk memanggil data User
function makegetUser() {
    return axios.get('https://jsonplaceholder.typicode.com/users').then(resp => {
        return(resp.data);
    });
}

//Membuat fungsi untuk memanggil data ToDo
function makegetToDo() {
    return axios.get('https://jsonplaceholder.typicode.com/todos').then(resp => {
        return(resp.data);
    });  
}

//Membuat fungsi untuk memanggil data Post
function makegetPost() {
    return axios.get('https://jsonplaceholder.typicode.com/posts').then(resp => {
        return(resp.data);
    });      
}

//Membuat Program Utama menggunakan async dan await
async function theMainProgram(){
    //Insialisasi
    let todo = await makegetToDo(); 
    let user = await makegetUser(); 
    let post = await makegetPost();

    let uncompleted = 0;
    user.forEach(status => {        
        todo.forEach(dataTodo => {
            if (dataTodo.userId == status.id){
                if (dataTodo.completed == false){
                    uncompleted = uncompleted+1;
                }
            }
        });
        if(uncompleted>=10){
            let count = 0;
            console.log("Nama: "+status.name);
            console.log("Post: ");
            post.forEach(post => {
                if(status.id == post.userId) {
                    if(count < 2) {
                        console.log(count+"title: " + post.title);
                        console.log("body: " + post.body);
                        console.log(" ");
                        count = count+1;
                    }
                }
            })
        }
    })
}
// Memanggil Program Utama
theMainProgram();