const axios = require('axios');

//Main program
async function main(){
  
    //Deklarasi dan assignment semua konstanta yang membawa data API
    const get_res_todos = await axios.get('https://jsonplaceholder.typicode.com/todos');
    const get_res_posts = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const get_res_users = await axios.get('https://jsonplaceholder.typicode.com/users');
   
    const data_todos = await get_res_todos.data;
    const data_post = await get_res_posts.data;
    const data_user = await get_res_users.data;
    
    //Assignment sebagian dan deklarasi semua variabel yang digunakan dalam program ini
    var todo_belum_selesai = 0;
    var nomor_akun = 0;
    var cek_user_id;
    var nama_user;
    var count;
    
    console.log("Nama-nama user yang memiliki 10 atau lebih todo yang belum selesai: \n")

    //Melakukan pengecekan tiap-tiap data dan mencari user yang memiliki todo list belum selesai lebih dari sama dengan 10
    data_todos.forEach(data=>{
        if (nomor_akun == 0){ //Assignment variabel nomor_akun dengan nilai userId apabila ini merupakan perulangan yang pertama
        cek_user_id = data.userId;
        nomor_akun = 1; //Assign nilai variabel nomor_akun dengan angka 1 agar mengabaikan perintah ini di perulangan setelahnya
        }
        if (cek_user_id == data.userId){
            if (data.completed == false){
                todo_belum_selesai += 1;
            }
        } else{
            if (todo_belum_selesai >= 10){
                nama_user = data_user.find(callback=>callback.id == cek_user_id).name; //Mengambil nilai nama user untuk disimpan dalam variabel nama_user
                
                console.log("Nama User :", nama_user);
                console.log("2 post pertama milik", nama_user, ": ");

                count = 0; //Assign nilai count dengan 0 sebagai syarat untuk melakukan print post user ke layar

                //Melakukan print 2 post pertama milik user
                data_post.forEach(postdata=>{ 
                    if (cek_user_id == postdata.userId){
                        if (count < 2){
                            console.log((count+1), ". Judul :", postdata.title, "\nIsi :", postdata.body);
                            count += 1;
                        }
                    }
                })

            }
            cek_user_id = data.userId; //Assign nilai userId yang baru pada variabel cek_user_id agar bisa melakukan pengecekan pada user berikutnya
            nomor_akun += 1;
    
            //Melakukan reset nilai variabel todo_belum_selesai dan menyesuaikannya dengan status todo pertama milik akun selanjutnya
            if (data.completed == false){
                todo_belum_selesai = 1;
            } else{
                todo_belum_selesai = 0;
            }
            console.log(""); //Untuk memberikan newline
        }

    })
}


//Menjalankan main program
main(); 