//Mengambil data todo user
fetch('https://jsonplaceholder.typicode.com/todos')
  .then(response => response.json())
  .then(data => show(data));

//Fungsi yang akan menampilkan nama dan pos user
function show(data){
  //Mencari userId yang todonya false lebih dari/sama dengan 10
  var belumSelesai=[]; //var yang akan menyimpan userId
  var i = 1;
  do{
    var todo=data.filter(value=>
      value.userId==i); //filter terhadap userid
    var todoFalse=todo.filter(element=>
      element.completed==false);
    if (todoFalse.length>=10){//user yang todo false >=10
      belumSelesai.push(i)
    };
    i++;
  }while (todo.length!=0) //stop jika i melebihi user id yang dipunya
  console.log(belumSelesai)
  
  //Mengambil list user
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(user => cariNama(user));
  //Mencari nama user berdasarkan id
  function cariNama(user){
    var nama = [];
      belumSelesai.forEach(element => 
        //id user dimulai dari 1 sehingga
        nama.push(user[element-1].name));
    //Mengambil post user
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(user => cariPost(user));
    //Fungsi yang mencari post user berdasarkan id
    function cariPost(user){
      var postUser = {
        "Nama":[],
        "TitlePos1":[],
        "IsiPos1":[],
        "TitlePos2":[],
        "IsiPos2":[],
      };
      postUser.Nama=nama
      belumSelesai.forEach(function(element){//mengambil informasi post
        var i = 0;
        for (;i<user.length;i++){
          var individu=user[i];
          if (individu.userId==element){
            postUser.TitlePos1.push(individu.title);
            postUser.IsiPos1.push(individu.body);
            postUser.TitlePos2.push(user[i+1].title);
            postUser.IsiPos2.push(user[i+1].body);
            break;
          };
        };
      })
      //Menampilkan dengan html
      var i = 0;
      var tampilkan = document.getElementById("root");
      //Membuat tabel yang mengandung semua atribut yang diminta
      for (;i<belumSelesai.length;i++){
        //wrapper dari tabel
        var wrapper = document.createElement("div");
        wrapper.classList.add("table-wrapper");
        //Tabel 
        var tabel = document.createElement("table");
        tabel.classList.add("fl-table");
        //Judul Tabel
        var capt = document.createElement("caption");
        var captText=document.createTextNode("User "+(i+1));
        capt.appendChild(captText);
        tabel.appendChild(capt);
        //Head dan Body dari tabel
        var thead = document.createElement("thead");
        var tbody = document.createElement("tbody");

        // Head
        var tr = document.createElement("tr");

        var th = document.createElement("th");
        var thIndex = document.createTextNode("Atribut User");
        th.appendChild(thIndex);
        tr.appendChild(th);

        var th = document.createElement("th");
        var thIsi = document.createTextNode("Data User");
        th.appendChild(thIsi);
        tr.appendChild(th);

        thead.appendChild(tr);
        tabel.appendChild(thead);
        
        //Body
        var atr=["Nama User","Judul Pos 1","Isi Pos 1","Judul Pos 2","Isi Pos 2"]
        var nomorAtr = 0
        for(x in postUser){//loop untuk setiap atribut
          var tr = document.createElement("tr");

          var td = document.createElement("td");
          var isiIndex = document.createTextNode(atr[nomorAtr]);
          td.appendChild(isiIndex);
          tr.appendChild(td);

          var td = document.createElement("td");
          var isiNama = document.createTextNode(postUser[x][i]);
          td.appendChild(isiNama);
          tr.appendChild(td);

          tbody.appendChild(tr);
          tabel.appendChild(tbody);
          wrapper.appendChild(tabel);
          tampilkan.appendChild(wrapper );

          nomorAtr+=1;
        }
      }
    };
  };
};