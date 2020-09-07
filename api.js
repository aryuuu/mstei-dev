//Get all user id
fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(data => show(data))
  .catch(error => console.log('Error:', error));

function show(data){
  let userIds = [] //menyimpan user id
  let nama = {} //menyimpan nama
  data.forEach(element => { //memasukkan user id dri tiap user
    userIds.push(element.id);
    nama[element.id] = element.name;
  });
  
  var lebihSepuluh = [] //menyimpan user id yang not completed todos lebih dari 10
  //Mengecek todos dari user'
  fetch("https://jsonplaceholder.typicode.com/todos")
    .then(response => response.json())
    .then(todos => {
      userIds.forEach(idUser => {
        const userTodos = todos.filter(element => element.userId === idUser)
        let falseTodos = userTodos.filter(todo => todo.completed === false) //cek false todos
        if (falseTodos.length>=10){ //jika lebih dari 10
          lebihSepuluh.push(idUser);
        }
      })
    })
    .catch(error => console.log('Error:', error));

  console.log(lebihSepuluh);

  //Mengambil informasi user
  fetch("https://jsonplaceholder.typicode.com/posts")
  .then(response => response.json())
  .then(posts => {
    lebihSepuluh.forEach(idUser => { //menambahkan isi tabel
      const userPosts = posts.filter(element => element.userId === idUser);
      let userInfo = {}; //menyimpan isi tabel
      userInfo["Id"] = idUser;
      userInfo["Nama User"] = nama[idUser];
      userInfo["Title Pos 1"] = userPosts[0].title;
      userInfo["Isi Pos 1"] = userPosts[0].body;
      userInfo["Title Pos 2"] = userPosts[1].title;
      userInfo["Isi Pos 2"] = userPosts[1].body;
      $(document).ready(function(){
        var kerangkaTabel = `<div class='table-wrapper'><table class='fl-table' id='${idUser}'></table></div>`
        $(`#root`).html((i,text) => text+=kerangkaTabel); //membuat tabel
        $(`#${idUser}`).html(`<thead><tr><th>Atribut User</th><th>Data User</th></tr></thead>`); //header
        $(`#${idUser}`).html((i,text) => text+=`<tbody id='tbody_${idUser}'></tbody>`); //body
        Object.entries(userInfo).forEach(element => { //memasukkan isi untuk setiap informasi dari user
          var isi = `<tr><td>${element[0]}</td><td>${element[1]}</td></tr>`
          $(`#tbody_${idUser}`).html((i,text) => text+=isi)
        });
      });
    });
  })
  .catch(error => console.log('Error:', error));
};
