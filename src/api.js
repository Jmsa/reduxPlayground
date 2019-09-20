export const getPost = () =>
  fetch("https://jsonplaceholder.typicode.com/posts/1").then(response =>
    response.json()
  );

export const addPost = () =>
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      title: "foo", 
      body: "bar",
      userId: 1
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  }).then(response => response.json());

export const deletePost = () =>
  fetch("https://jsonplaceholder.typicode.com/posts/1", {
    method: "DELETE"
  });
