const axios = require('axios');


axios.get('https://jsonplaceholder.typicode.com/todos').then(datas => {
    datas.data.forEach(status => {
        if(!status.completed){
            axios.get('https://jsonplaceholder.typicode.com/users').then(response => {
                response.data.forEach(user =>{
                    if(user.id==status.id){
                        console.log(user.name);
                    }
                });
            })
            .catch(err => console.log(err));
        }
    });
})
.catch(err => console.log(err));