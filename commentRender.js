// модуль с рендер функцией 
export const commentRender = (comments, commentElement, getFieldCommen) => {
    const commentHtml = comments.map((comments, index) =>
    getFieldCommen(comments, index))
    .join('');
  commentElement.innerHTML = commentHtml;
}