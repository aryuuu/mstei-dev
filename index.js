const axios = require('axios');

const Url = 'https://jsonplaceholder.typicode.com/';

const getUser = () => {
  return axios.get(Url + 'users').then(res => {return res.data}).catch(err=>{return err});
}

const getToDo = () => {
  return axios.get(Url + 'todos').then(res => {return res.data}).catch(err=>{return err});
}

const getPost = () => {
  return axios.get(Url + 'posts').then(res => {return res.data}).catch(err=>{return err});
}

const main = async () => {
  try {
    const users = await getUser();
    const todos = await getToDo();
    const posts = await getPost();

    const userToDo = [0,0,0,0,0,0,0,0,0,0]; 
    // array userToDo untuk menyimpan data banyaknya todo yang belum diselesaikan user, 
    // elemen ke-i menunjukan banyaknya ToDo yang belum diselesaikan oleh user dengan id i+1 

    const firstTwoPost = [[0,0,0],[0,0,0],[0,0,0],[0,0,0],
                          [0,0,0],[0,0,0],[0,0,0],[0,0,0],
                          [0,0,0],[0,0,0]];
    // array firstTwoPost untuk menyimpan id dua post pertama dari masing masing user
    // tiap elemen array berisi [id_post_pertama, id_post_kedua, banyaknya_post_yang_sudah_tercatat]

    todos.forEach((todo) => {
      if (!todo.completed) {
        userToDo[todo.userId-1]++;
      }
    });
    
    posts.forEach((post) => {
      let id = post.userId - 1;
      if (firstTwoPost[id][2] < 2) {
        firstTwoPost[id][firstTwoPost[id][2]] = post.id;
        firstTwoPost[id][2]++;
      }
    });

    console.log("List nama-nama user yang memiliki 10 atau lebih todo yang belum selesai");
    users.forEach((user) => {
      let id = user.id - 1;
      if(userToDo[id] >= 10){
        console.log(`Nama User : ${user.name}`);
        for(let i = 0;i < 2;i++) {
          console.log(`Post ke-${i+1}: `);
          console.log("Title : " + posts[(firstTwoPost[id][i]-1)].title);
          console.log("Body : " + posts[(firstTwoPost[id][i]-1)].body);
          console.log();
        }
      }
    });
  } 
  catch (err) {
    console.log(err);
  }
}

main();