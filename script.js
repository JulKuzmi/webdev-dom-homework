import { fetchComments, newComment } from "./api.js";
import { renderLogin } from "./login-component.js";
import { delay } from "./dalay.js";
import { format } from "./node_modules/date-fns";

const load = document.querySelector(".load");
load.style.display = "flex";
let comments = [];

let token = 'Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k';
token = null;

  const fetch = () => {
  return fetchComments({ token })
  .then((responseData) => {
  comments = responseData.comments;
  load.style.display = "none";
  renderTasks();
  })
  .catch((err) => {
    alert("Кажется, у вас сломался интернет, попробуйте позже");
    console.warn(err);
  });
  };

  const answer = () => {
    const answerComments = document.querySelectorAll(".comment");
    const formText = document.querySelector(".add-form-text");
    for (const answerComment of answerComments){
      answerComment.addEventListener('click', () =>{
        const arr = comments[answerComment.dataset.index];
        let str = arr.text + ' ' + arr.name;
        formText.value += `${str}`;
        formText.focus();
      });
    };
    };
  
    const initEventLike = () => {
      const likeButtons = document.querySelectorAll(".like-button");
      for(const likeButton of likeButtons){
        const index = likeButton.dataset.index;
      likeButton.addEventListener('click', (event) => {
        event.stopPropagation();
        likeButton.classList.add("load-like");
        delay(2000).then(() => {
        if (comments[index].likeComment = !comments[index].likeComment) {
          comments[index].likeComment = false;
          comments[index].likes += 1;
        } else {
          comments[index].likeComment = true;
          comments[index].likes -= 1;
        }
        likeButton.classList.remove("load-like");
        renderTasks();
        initEventLike();
        });
          });
        };
      };

      const renderTasks = () => {
      const appEl = document.querySelector(".container");
      if(!token) {
      renderLogin({appEl,
        comments,
        setToken: (newToken) => {
          token = newToken;
        },
        renderTasks,
      });
      return;
      }

      const listComment = comments.map((user, index) => {
        const now = new Date();
        const createDate = format(now, "MM-dd-yyyy hh:mm"); // 03-26-2023 10:33
        return `<li data-index="${index}" class="comment">
        <div class="comment-header">
          <div>${user.author.name}</div>
          <div>${createDate}</div>
        </div>
        <div data-index="${index}" class="comment-body">
          <div class="comment-text">
            ${user.text}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${user.likes}</span>
            <button data-index="${index}"class="like-button ${user.likeComment ? '-active-like' : ''}"></button>
          </div>
        </div>
      </li>`;
      }
      ).join("");
    
      const appAddForm =
      `<ul class="comments">
      ${listComment}
      </ul>
      <div class="add-form">
        <input
          type="text"
          class="add-form-name"
          placeholder="Введите ваше имя"
        />
        <textarea
          type="textarea"
          class="add-form-text"
          placeholder="Введите ваш комментарий"
          rows="4"
        ></textarea>
        <div class="add-form-row">
          <button class="add-form-button">Написать</button>
        </div>
        <div class="add-form-row">
          <button class="delete-form-button">Удалить последний комментарий</button>
        </div>
      </div>`;
      appEl.innerHTML= appAddForm;

      const deleteButton = document.querySelector('.delete-form-button');
      deleteButton.addEventListener("click", () => {
        comments.pop();
        renderTasks();
      });
    
    const form = document.querySelector(".add-form");
    const newForm = form.innerHTML;

    
    answer();
    initEventLike();
    
    const buttonElement = document.querySelector(".add-form-button");
    const formName = document.querySelector(".add-form-name");
    const formText = document.querySelector(".add-form-text");
    
    buttonElement.addEventListener("click", () => {
      formName.classList.remove("error");
      if (formName.value === ""){
        formName.classList.add("error");
        return;
      };
      formText.classList.remove("error");
      if (formText.value === ""){
        formText.classList.add("error");
        return;
      };
    
      buttonElement.disabled = true;
      form.innerHTML = "Комментарий добавляется...";

      });
    
    const handlePostClick = () => {
      return newComment({name: formName.value, text:formText.value, token})
      .then((response) => {
        if(response.status === 500){
          throw new Error("Ошибка сервера");
        }
        })
        .then(() => {
           return fetch();
        })
      .then(() => {
        buttonElement.disabled = false;
        form.innerHTML = newForm;
        formName.value = "";
        formText.value = "";
      })
      .catch((error) => {
        buttonElement.disabled = false;
        form.innerHTML = newForm;
        if(error.message === "Ошибка сервера"){
          alert("Сервер сломался")
            }
          })
      };
    
     buttonElement.addEventListener("click", handlePostClick);
    
     formName.addEventListener('keyup', function(event) {
      if(event.keyCode === 13) {
        event.preventDefault();
       buttonElement.click();
      }
     });
     formText.addEventListener('keyup', function(event) {
      event.preventDefault();
      if(event.keyCode === 13) {
        event.preventDefault();
       buttonElement.click();
      }
    });   
   };
    renderTasks();
    fetch();






// //  import { commentRender } from "./commentRender.js";
// //  import {  apiGetFetch, apiPostFetch } from "./api.js";
// //  import { listGetComments } from "./listGetComment.js";
// //  import { format } from "./node_modules/date-fns";
// //  import { fetchComments, newComment } from "./api.js";
// //  import { renderLogin } from "./login-component.js";
//  const commentField = document.getElementById('comment-field');
//  const commentName = document.getElementById('comment-name');
//  const commentInput = document.getElementById('comment-input');
//  const commentButton = document.getElementById('comment-button');
//  const commentLoading = document.querySelector('.loading');


//  import { fetchComments, newComment } from "./api.js";
//  import { renderLogin } from "./login-comp.js";
//  import { format } from "./node_modules/date-fns";

//  let token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k"
//  token = null;

//  //создаем данные для HTML разметки //хранение комментов
//  let comments = [];

//  const fetch = () => {
//   return fetchComments({ token })
//   .then((responseData) => {
//   comments = responseData.comments;
//   load.style.display = "none";
//   commentRender();
//   })
//   .catch((err) => {
//     alert("Кажется, у вас сломался интернет, попробуйте позже");
//     console.warn(err);
//   });
//   };

// //  function getComment(){
// //  apiGetFetch()
// //     .then((Data) => {
// //       comments = Data.comments;
// //       commentLoading.classList.add("display-none");
// //       commentRender(comments, commentField, listGetComments);
// //       initLikesButton();
// //       commentReply();
// //     })  
// //   }
// //   getComment();

//  // ивент на кнопки лайка
//  function initLikesButton() {
//   const commentLikes = document.querySelectorAll(".like-button");
//   for (const buttonLike of commentLikes) {
//     const index = buttonLike.dataset.index;
//     buttonLike.addEventListener("click", (eventLike) => {
//       eventLike.stopPropagation();// кликаем на кнопку лайка и эта функция прерывает дальнейшие всплытия событий 
//       if (comments[index].isLike) {
//         comments[index].isLike = false;
//         comments[index].likes -= 1;
//       } else {
//         comments[index].isLike = true;
//         comments[index].likes += 1;
//       }
//       commentRender();
//       initLikesButton();
//     })
//   }
//  }

//   // событие на ответ на коммент пользователя 
//   function commentReply () {
//     const replayEl = document.querySelectorAll(".comment");
//     for (const el of replayEl) {
//       const index = el.dataset.index;
//       el.addEventListener('click', () => {
//         commentInput.value = `» ${comments[index].text} (${comments[index].author.name}) © \n `;
//         commentRender();
//       })
//     }
//    }

//    const commentRender = () => {
//     const appEl = document.querySelector(".container");
//     if(!token) {
//    renderLogin({appEl,
//     comments,
//     setToken: (newToken) => {
//       token = newToken;
//     },
//     commentRender,
//   });
//   return;
//   }


//  const listComment = comments.map((user, index) => {
//   const now = new Date();
//   const createDate = format(now, "MM-dd-yyyy hh:mm"); 
//   return `<li data-index="${index}" class="comment">
//   <div class="comment-header">
//     <div>${user.author.name}</div>
//     <div>${createDate}</div>
//   </div>
//   <div data-index="${index}" class="comment-body">
//     <div class="comment-text">
//       ${user.text}
//     </div>
//   </div>
//   <div class="comment-footer">
//     <div class="likes">
//       <span class="likes-counter">${user.likes}</span>
//       <button data-index="${index}"class="like-button ${user.likeComment ? '-active-like' : ''}"></button>
//     </div>
//   </div>
//  </li>`;
//  }
//  ).join("");

//  const appAddForm =
//  `<ul class="comments">
//  ${listComment}
//  </ul>
//  <div class="add-form">
//    <input
//      type="text"
//      class="add-form-name"
//      placeholder="Введите ваше имя"
//    />
//    <textarea
//      type="textarea"
//      class="add-form-text"
//      placeholder="Введите ваш комментарий"
//      rows="4"
//    ></textarea>
//    <div class="add-form-row">
//      <button class="add-form-button">Написать</button>
//    </div>
//    <div class="add-form-row">
//      <button class="delete-form-button">Удалить последний комментарий</button>
//    </div>
//    </div>`;
//    appEl.innerHTML= appAddForm;
//      const deleteButton = document.querySelector('.delete-form-button');
//       deleteButton.addEventListener("click", () => {
//         comments.pop();
//         renderTasks();
//       });
    
//      const form = document.querySelector(".add-form");
//      const newForm = form.innerHTML;

    
//      commentReply();
//      initLikesButton();

//      const buttonElement = document.querySelector(".add-form-button");
//      const formName = document.querySelector(".add-form-name");
//      const formText = document.querySelector(".add-form-text");
     
//      buttonElement.addEventListener("click", () => {
//        formName.classList.remove("error");
//        if (formName.value === ""){
//          formName.classList.add("error");
//          return;
//        };
//        formText.classList.remove("error");
//        if (formText.value === ""){
//          formText.classList.add("error");
//          return;
//        };
     
//        buttonElement.disabled = true;
//        form.innerHTML = "Комментарий добавляется...";
 
//        });
     
//      const handlePostClick = () => {
//        return newComment({name: formName.value, text:formText.value, token})
//        .then((response) => {
//          if(response.status === 500){
//            throw new Error("Ошибка сервера");
//          }
//          })
//          .then(() => {
//             return fetch();
//          })
//        .then(() => {
//          buttonElement.disabled = false;
//          form.innerHTML = newForm;
//          formName.value = "";
//          formText.value = "";
//        })
//        .catch((error) => {
//          buttonElement.disabled = false;
//          form.innerHTML = newForm;
//          if(error.message === "Ошибка сервера"){
//            alert("Сервер сломался")
//              }
//            })
//        };
     
//      buttonElement.addEventListener("click", handlePostClick);
     
//      formName.addEventListener('keyup', function(event) {
//        if(event.keyCode === 13) {
//          event.preventDefault();
//         buttonElement.click();
//        }
//      });
//      formText.addEventListener('keyup', function(event) {
//        event.preventDefault();
//        if(event.keyCode === 13) {
//          event.preventDefault();
//         buttonElement.click();
//        }
//      });   
//     };
//  commentRender();
//  fetch();



//  //валидация и событик на кнопку
//  commentButton.addEventListener("click", () => {
//     commentName.classList.remove("error"); // добавляем валидацию если пользователь не ввел имя/коммент 
//     if (commentName.value === "") { // 
//       commentName.classList.add("error"); // 
//       return;
//     }
//     commentInput.classList.remove("error");
//     if (commentInput.value === "") {
//       commentInput.classList.add("error");
//       return;
//     }
//     commentAnimation();
//    });

//     // для добавления нового коммента 
//     function commentAnimation() {
//       commentLoading.classList.remove("display-none")

//       comments.push({
//         name: commentName.value
//         .replaceAll('&', '&amp;')
//         .replaceAll('<', '&lt;')
//         .replaceAll('>', '&gt;')
//         .replaceAll('"', '&quot;'), 
//         date: `${date.getDate() < 10 ? "0" : ""}${date.getDate()}.
//         ${date.getMonth() < 10 ? "0" : ""}${date.getMonth() + 1}.
//         ${date.getFullYear() - 2000} 
//         ${date.getHours() < 10 ? "0" : ""}${date.getHours()}:
//         ${date.getMinutes() < 10 ? "0" : ""}${date.getMinutes()}`,
//         text: commentInput.value
//         .replaceAll('&', '&amp;')
//         .replaceAll('<', '&lt;')
//         .replaceAll('>', '&gt;')
//         .replaceAll('"', '&quot;'),
//         likes: 0,
//         isLiked: false,
//         isEdit: false,
//         forceError: true, 
//        })
    
//    function funcPost() {
//     apiPostFetch(commentName.value, commentInput.value)
//       .then((response) => {
//               if(response.status === 201){
//                 commentName.value = ""; // очищаем поле формы после ввода
//                 commentInput.value = "";
//               }
//               else if (response.status === 400){
//                alert("Содержание комментария и имя пользователя должно состоять не менее чем из трех символов, введите пожалуйста заново");
//               } else {
//                        throw new Error("Упал сервер");
//               }
//        })
//       .then(() => {
//       return getComment();
//      })
//      .catch((error) => {
//          if(error.message === "Упал сервер"){
//                 funcPost();
//          } else {
//                 alert("Упс, кажется у вас упал интернет, попробуйте позже!");
//                 commentLoading.classList.remove("display-none");
//          }
//      })
//   } 
//  funcPost();
// }
// }
