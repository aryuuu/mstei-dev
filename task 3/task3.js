fetch('https://jsonplaceholder.typicode.com/todos') 
    
    // Converting received data to JSON 
    .then(response => response.json()) 
    .then(tododata => 
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then(postdata =>
          fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => response.json())
            .then(userdata =>
            { 
        
                // Create a variable to store HTML 
                let output= '';
                
                var uncomplete=0;
                var currentuserid = 1;
                tododata.forEach(data=>{
                    if (currentuserid==data.userId){
                        if (data.completed===false){
                            uncomplete=uncomplete+1;
                        }
                    } else{
                        if (uncomplete>9){
                            var name=userdata.find(x=>x.id==currentuserid).name;

                            output+= `
                            <ul class="list-group" mb-3>
                              <li class="list-group-item">User ID : ${currentuserid}</li>
                              <li class="list-group-item">Name : ${name}</li>
                            </ul>
                            `;

                            var count=0;
                            var currentpost=[]
                            postdata.forEach(postdata=>{
                                if (currentuserid==postdata.userId){
                                    if (count<2){
                                        currentpost.push(postdata.title)
                                        currentpost.push(postdata.body)
                                        count=count+1;
                                    }
                                }
                            })
                            output+=`
                            <div class="card card-body">
                              <h4>Posts :<h3>
                              <h5>Title : ${currentpost[0]}</h4>
                              <p>Body : ${currentpost[1]}</p>
                              <h5>Title : ${currentpost[2]}</h4>
                              <p>Body : ${currentpost[3]}</p>
                            </div>`

                            currentpost=[]
                        }
                        if (data.completed===false){
                            uncomplete=1;
                        } else{
                            uncomplete=0;
                        }
                        currentuserid=data.userId;
                    }
                })
                document.getElementById('output').innerHTML = output;
            }))); 