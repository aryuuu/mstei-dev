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

    todos.forEach((todo) => {
      if (!todo.completed) {
        userToDo[todo.userId-1]++;
      }
    });
    
    console.log("List nama-nama user yang memiliki 10 atau lebih todo yang belum selesai");
    users.forEach((user) => {
      if(userToDo[user.id-1] >= 10){
        console.log(`Nama User : ${user.name}`);
      }
    });
  } 
  catch (err) {
    console.log(err);
  }
}

main();