const axios = require('axios');

const apiUrl = 'https://jsonplaceholder.typicode.com';

const getPosts = async () => {
  try {
    const { data: todos } = await axios.get(`${apiUrl}/todos`);
    todos.forEach( async (todo) => {
      if (!todo.completed) {
        const { data: user } = await axios.get(`${apiUrl}/users/${todo.userId}`);
        const { data: posts } = await axios.get(`${apiUrl}/posts?userId=${todo.userId}`);
        console.log(`username: ${user.name}`);
        posts.slice(0,2).forEach((post, index) => {
          console.log(`post ${index+1}: ${post.body}`)
        })
      }
    })
  } catch (err) {
    console.log(err);
  }
}
getPosts();