// модуль api js с запросоми апи, функция фич вызыввается в этом модуде
//  export function apiGetFetch() {
//     return fetch(token = null;,{
//       method:"GET"
//     })
//     .then((response) => {
//       return response.json();
//       })
//  }

//  export function apiPostFetch(commentName, commentInput) {
//     return fetch('https://webdev-hw-api.vercel.app/api/v2/julia/comments', {
//         method: "POST",
//         body: JSON.stringify({
//             name: commentName,
//             text: commentInput,
//         })
//     })
//  }

let host = "https://webdev-hw-api.vercel.app/api/v2/julia/comments"

export function fetchComments({ token }){
  return fetch(host, {
   method: "GET",
   headers: {
     Authorization: token,
   },
 })
 .then((response) => {
   if (response.status === 401){
     throw new Error("Нет авторизации");
   }
     return response.json();
 })
 };
 
  export function newComment ({ name, text, token }) {
     return fetch(host, {
     method: "POST",
     body: JSON.stringify({
       name,
       text,
     }),
     headers: {
       Authorization: token,
     },
   }).then((response) => {
     if(response.status === 500){
       throw new Error("Ошибка сервера");
     } 
     if (response.status === 400){
       throw new Error("Неверный запрос");
     } else {
       return response.json();
     }
   });
 };
 
 export function loginUser({ login, password }) {
   return fetch("https://webdev-hw-api.vercel.app/api/user/login", {
     method: "POST",
     body: JSON.stringify({
       login,
       password,
     }),
   }).then((response) => {
     if (response.status === 400) {
       throw new Error("Неверный логин или пароль");
     } else {
     return response.json();
     }
   });
 };
 
 export function registerUser({ login, password, name }) {
   return fetch("https://webdev-hw-api.vercel.app/api/user", {
     method: "POST",
     body: JSON.stringify({
       login,
       password,
       name,
     }),
   }).then((response) => {
     if (response.status === 400) {
       throw new Error("Такой пользователь уже существует");
     } else {
     return response.json();
     }
   });
 };
 
