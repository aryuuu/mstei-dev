const axios = require('axios')

const URL = "https://jsonplaceholder.typicode.com/";

function makeGetRequest(endpoint, query) {
  let toURL = URL + endpoint;
  if (query == undefined) {
    return axios.get(toURL).then(resp => { return resp.data }).catch(error => { return error });
  } else {
    return axios.get(toURL + '?' + query).then(resp => { return resp.data }).catch(error => { return error });
  }
}

async function app() {
  let user = await makeGetRequest('users');
  let todos = await makeGetRequest('todos', 'completed=false');
  let posts = await makeGetRequest('posts');

  user.forEach(users => {

    let count = 0;
    todos.forEach(todo => {
      if (users.id == todo.userId) {
        count++;
      }
    })


    if (count > 9) {
      let max_2 = 0;
      console.log("Nama : " + users.name);
      console.log("Posts : ");
      posts.forEach(post => {
        if (users.id === post.userId && (max_2 < 2)) {
          console.log('Title : ' + post.title);
          console.log("Body : " + post.body);
          console.log("\n");
          max_2++;
        }

      })
    }

  })
}


app();
