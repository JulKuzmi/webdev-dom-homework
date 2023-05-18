export const listGetComments = (comments, index) => {
  // const now = new Date();
  // const createDate = format(now, "MM-dd-yyyy hh:mm"); // 03-26-2023 10:33
    return `<li class="comment" data-index="${index}">
      <div class="comment-header">
        <div>${comments.author.name}</div>
        <div>${comments.createDate}</div>
      </div>
      <div class="comment-body">
        ${comments.isEdit ? `<textarea id="input" class="comment-text textarea" type="texrarea">${comments.text}</textarea>` : `<div class="comment-text">${comments.text.replaceAll("QUOTE_BEGIN", "<div class='quote'>").replaceAll("QUOTE_END", "</div>")}</div>`}
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${comments.likes}</span>
          <button class="like-button ${comments.isLike ? '-active-like' : ''}" data-index="${index}"></button>
        </div>
      </div>
      </li>`
}