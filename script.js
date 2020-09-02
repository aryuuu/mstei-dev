const main = async () => {    
            var usertodos=[0,0,0,0,0,0,0,0,0,0];
            let output='';
            const url ='https://jsonplaceholder.typicode.com/';

            const posts = await fetch('https://jsonplaceholder.typicode.com/posts')
                .then(res => res.json())

            const users = await fetch('https://jsonplaceholder.typicode.com/users')
                .then(res => res.json())
            
            const todos = await fetch('https://jsonplaceholder.typicode.com/todos')
                .then(res => res.json())

            todos.forEach(todo=>{
                    if (todo.completed== false){
                        usertodos[todo.userId-1] +=1;
                    }})

            users.forEach(user=>{
                    if (usertodos[user.userId-1] >= 10){
                        output += `<h2>Nama User : ${user.name}</h2>`;

  
                        //Melakukan print 2 post pertama milik user
                        posts.forEach(post=>{ 
                            if (user.userId == post.userId){
                                var count=0;
                                if (count < 2){
                                    output += `<h3>${count+1}. Judul: ${post.title}</h3>`;
                                    output += `<p>Isi: ${post.body}</p>`;
                                    count ++;
                                }
                            }
                        })
        
                    }
                   
            
                })
        
        
           
            output=document.getElementById('output').innerHTML; //Melakukan output ke HTML
        }
        main();