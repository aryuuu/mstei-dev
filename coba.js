const axios = require('axios');

const baseUrl = 'https://jsonplaceholder.typicode.com'

function makeGetRequestToDo() {
    return axios.get(baseUrl + '/todos').then(res  => { return res.data }).catch(err => {return err});    
}

function makeGetRequestUser() {
    return axios.get(baseUrl + '/users').then(res  => { return res.data }).catch(err => {return err});      
}

function makeGetRequestPost() {
    return axios.get(baseUrl + '/posts').then(res  => { return res.data }).catch(err => {return err});      
}

async function mainProgram(){
    try{
        let datas = await makeGetRequestToDo();
        let response = await makeGetRequestUser();
        let posts = await makeGetRequestPost();
        response.forEach(status => {
            let count = 0;
            datas.forEach(data => {
                if(data.userId==status.id){
                    count++;
                }
            });
            if(count>=10){
                console.log("Nama: "+status.name);
                console.log("Post:");
                let num = 0;
                posts.forEach(post => {
                    if(status.id==post.userId && !data.completed){
                        if(num!=2){
                            num++;
                            console.log(num+". title: "+post.title);
                            console.log("   body : "+post.body);
                            console.log("\n");
                        }
                    }
                });
            }
            count = 0;
        });
    }
    catch(err){
        console.log(err);
    }
}
mainProgram();
