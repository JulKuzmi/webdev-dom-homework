// модуль с рендер функцией 
export const commentRender = (comments, commentField, getFieldCommen) => {
    const commentHtml = comments.map((comments, index) =>
    getFieldCommen(comments, index))
    .join('');
  commentField.innerHTML = commentHtml;
}