
 import { commentRender } from "./commentRender.js";
 import {  apiGetFetch, apiPostFetch } from "./api.js";
 import { listGetComments } from "./listGetComment.js";
 const commentField = document.getElementById('comment-field');
 const commentName = document.getElementById('comment-name');
 const commentInput = document.getElementById('comment-input');
 const commentButton = document.getElementById('comment-button');
 const commentLoading = document.querySelector('.loading');
 const date = new Date();

 //создаем данные для HTML разметки //хранение комментов
 let comments = [];

 function getComment(){
 apiGetFetch()
    .then((Data) => {
      comments = Data.comments;
      commentLoading.classList.add("display-none");
      commentRender(comments, commentField, listGetComments);
      initLikesButton();
      commentReply();
    })  
  }
  getComment();


  commentRender(comments, commentField, listGetComments);

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
      commentRender(comments, commentField, listGetComments);
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
      commentRender(comments, commentField, listGetComments);
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

    // для добавления нового коммента 
    function commentAnimation() {
      commentLoading.classList.remove("display-none")

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
    apiPostFetch(commentName.value, commentInput.value)
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

    
      function commentFuncButton()  {
    apiPostFetch(commentName.value, commentInput.value)
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