
 import { commentRender } from "./commentRender.js";
 import { listGet } from "./listGetComment.js";
 import { apiGetComment, ap, apiPost } from "./api.js";
 const commentField = document.getElementById('comment-field');
 const commentName = document.getElementById('comment-name');
 const commentInput = document.getElementById('comment-input');
 const commentButton = document.getElementById('comment-button');
 const commentLoading = document.querySelector('.loading');
 const date = new Date();

 //создаем данные для HTML разметки //хранение комментов

 let comments = []; //перерасперделяем на let
function getComment(){
 apiGetComment()
    .then((Data) => {
      comments = Data.comments;
      commentLoading.classList.add("display-none");
      commentRender(comments, commentField, getFieldCommen);
      initLikesButton();
      commentReply();
    })  
  }
  getComment();
 // Создаем рендер-функцию (преобразование данных в коде в отображение, которое видит пользователь.)
//  const commentRender = () => {
//   const commentHtml = comments.map((comments, index) => {
//       return `<li class="comment" data-index="${index}">
//       <div class="comment-header">
//         <div>${comments.author.name}</div>
//         <div>${comments.date}</div>
//       </div>
//       <div class="comment-body">
//         ${comments.isEdit ? `<textarea id="input" class="comment-text textarea" type="texrarea">${comments.text}</textarea>` : `<div class="comment-text">${comments.text.replaceAll("QUOTE_BEGIN", "<div class='quote'>").replaceAll("QUOTE_END", "</div>")}</div>`}
//       </div>
//       <div class="comment-footer">
//         <div class="likes">
//           <span class="likes-counter">${comments.likes}</span>
//           <button class="like-button ${comments.isLike ? '-active-like' : ''}" data-index="${index}"></button>
//         </div>
//       </div>
//       </li>`
//   })

//   .join('');
//   commentField.innerHTML = commentHtml;
//   initLikesButton();
//   commentReply();
  
//  }
//  commentRender();
 commentRender(comments, commentField, getFieldCommen);
 // ивент на кнопки лайка
 function initLikesButton() {
  const commentLikes = document.querySelectorAll(".like-button");
  for (const buttonLike of commentLikes) {
    const index = buttonLike.dataset.index;
    buttonLike.addEventListener("click", (eventLike) => {
      eventLike.stopPropagation();// кликаем на кнопку лайка и эта функция прерывает дальнейшие всплытия событий 
      if (comments[index].isLike) {
        comments[index].isLike = false;
        comments[index].likes -= 1;
      } else {
        comments[index].isLike = true;
        comments[index].likes += 1;
      }
      commentRender(comments, commentField, getFieldCommen);
      initLikesButton();
    })
  }
 }

 // событие на ответ на коммент пользователя 
 function commentReply () {
  const replayEl = document.querySelectorAll(".comment");
  for (const el of replayEl) {
    const index = el.dataset.index;
    el.addEventListener('click', () => {
      commentInput.value = `» ${comments[index].text} (${comments[index].author.name}) © \n `;
      commentRender(comments, commentField, getFieldCommen);
    })
  }
 }

 //валидация и событик на кнопку
 commentButton.addEventListener("click", () => {
    commentName.classList.remove("error"); // добавляем валидацию если пользователь не ввел имя/коммент 
    if (commentName.value === "") { // 
      commentName.classList.add("error"); // 
      return;
    }
    commentInput.classList.remove("error");
    if (commentInput.value === "") {
      commentInput.classList.add("error");
      return;
    }
    commentAnimation();
   });

   comments.push({
    name: commentName.value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;'), 
    date: `${date.getDate() < 10 ? "0" : ""}${date.getDate()}.
    ${date.getMonth() < 10 ? "0" : ""}${date.getMonth() + 1}.
    ${date.getFullYear() - 2000} 
    ${date.getHours() < 10 ? "0" : ""}${date.getHours()}:
    ${date.getMinutes() < 10 ? "0" : ""}${date.getMinutes()}`,
    text: commentInput.value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;'),
    likes: 0,
    isLiked: false,
    isEdit: false,
    forceError: true, 
   })

   function funcPost() {
    apiPost(commentName.value, commentInput.value)
      .then((response) => {
              if(response.status === 201){
                commentName.value = ""; // очищаем поле формы после ввода
                commentInput.value = "";
              }
              else if (response.status === 400){
               alert("Содержание комментария и имя пользователя должно состоять не менее чем из трех символов, введите пожалуйста заново");
              } else {
                       throw new Error("Упал сервер");
              }
       })
      .then(() => {
      return getComment();
     })
     .catch((error) => {
         if(error.message === "Упал сервер"){
                funcPost();
         } else {
                alert("Упс, кажется у вас упал интернет, попробуйте позже!");
                commentLoading.classList.remove("display-none");
         }
     })
  } 
 funcPost();



   // для добавления нового коммента 
   function commentAnimation() {
      commentLoading.classList.remove("display-none")
    
      function commentFuncButton()  {
    //     fetch('https://webdev-hw-api.vercel.app/api/v1/julia/comments', {
    //     method: "POST",
    //     body: JSON.stringify({
    //          name: commentName.value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;'), 
    //          date: `${date.getDate() < 10 ? "0" : " "}${date.getDate()}.${date.getMonth() < 10 ? "0" : " "}${date.getMonth() + 1}.${date.getFullYear() - 2000} 
    //          ${date.getHours() < 10 ? "0" : " "}${date.getHours()}:${date.getMinutes() < 10 ? "0" : " "}${date.getMinutes()}`,
    //          text: commentInput.value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;'),
    //          likes: 0,
    //          isLiked: false,
    //          isEdit: false,
    //          forceError: true,//POST-запрос будет в половине случаев отвечать 500-й ошибкой, если в теле запроса передать параметр
    //     })
    //   })
    apiPost(commentName.value, commentInput.value)
      .then((response) => {
              if(response.status === 201){
                commentName.value = ""; // очищаем поле формы после ввода
                commentInput.value = "";
              }
              else if (response.status === 400){
               alert("Содержание комментария и имя пользователя должно состоять не менее чем из трех символов, введите пожалуйста заново");
              } else {
                       throw new Error("Упал сервер");
              }
       })
      .then(() => {
      return getComment();
     })
     .catch((error) => {
         if(error.message === "Упал сервер"){
                commentFuncButton();
         } else {
                alert("Упс, кажется у вас упал интернет, попробуйте позже!");
                commentLoading.classList.remove("display-none");
         }
     })
  } 
 commentFuncButton();
}