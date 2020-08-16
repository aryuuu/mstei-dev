const axios=require('axios');

// Fungsi untuk fetch data
async function gettodo(){
    let res= await axios.get('https://jsonplaceholder.typicode.com/todos');
    let data= res.data
    return data;
}

async function getpost(){
    let res=await axios.get('https://jsonplaceholder.typicode.com/posts');
    let data=res.data;
    return data;
}

async function getuser(){
    let res=await axios.get('https://jsonplaceholder.typicode.com/users');
    let data=await res.data;
    return data;
}


// Fungsi yang menjalankan program utama
async function mainprogram(){
    //Fetch data dan menyimpan pada variabel
    const todo=await gettodo();
    const post=await getpost();
    const user=await getuser();

    // Memproses data untuk mendapat user data dengan todo belum selesai 10 atau lebih
    // dan menampilkan data user tersebut beserta 2 post pertamanya.
    var uncomplete=0;
    var currentuserid = 1;
    console.log('User with 10 or more uncompleted todos')
    todo.forEach(data=>{
        if (currentuserid==data.userId){
            if (data.completed===false){
                uncomplete=uncomplete+1;
            }
        } else{
            if (uncomplete>9){
                var name=user.find(x=>x.id==currentuserid).name
                var result_id =`User ID : ${currentuserid}`
                var result_name = `Name : ${name}`
                console.log(result_id);
                console.log(result_name);

                console.log('The first 2 posts : ')
                var count=0;
                post.forEach(postdata=>{
                    if (currentuserid==postdata.userId){
                        if (count<2){
                            console.log(`${count+1}. Title : ${postdata.title} \nBody : ${postdata.body}`);
                            count=count+1;
                        }
                    }
                })

                console.log('')
            }
            if (data.completed===false){
                uncomplete=1;
            } else{
                uncomplete=0;
            }
            currentuserid=data.userId;
        }

    })
}


// Menjalankan fungsi program utama
mainprogram();