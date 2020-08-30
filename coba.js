const baseUrl = 'https://jsonplaceholder.typicode.com'

function makeGetRequestToDo() {
    return fetch(baseUrl + '/todos').then(res => res.json()).then(res  => { return res }).catch(err => {return err});  
}

function makeGetRequestUser() {
    return fetch(baseUrl + '/users').then(res => res.json()).then(res  => { return res }).catch(err => {return err});      
}

function makeGetRequestPost() {
    return fetch(baseUrl + '/posts').then(res => res.json()).then(res  => { return res }).catch(err => {return err});      
}

async function mainProgram(){
    try{
        let datas = await makeGetRequestToDo();
        let response = await makeGetRequestUser();
        let posts = await makeGetRequestPost();
        console.log(datas[1])
        var table = "<tr><th>Name</th><th>Title</th><th>Body</th></tr>";
        response.forEach(function(status){
            let count = 0;
            datas.forEach(function(data){
                if(data.userId==status.id){
                    count++;
                }
            });
            if(count>=10){
                let num = 0;
                posts.forEach(function(post){
                    if(status.id==post.userId){
                        if(num<2){
                            num++;
                            table+="<tr><td>" + status.name + "</td>";
                            table+="<td>" + post.title + "</td>"
                            table+="<td>" + post.body + "</td></tr>"
                        }
                    }
                });
            }
            count = 0;
        });
        document.getElementById("table").innerHTML=table
        document.getElementById("main").style.height="auto"
    }
    catch(err){
        console.log(err);
    }
}
