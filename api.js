// модуль api js с запросоми апи, функция фич вызыввается в этом модуде
 export function apiGetFetch() {
    return fetch("https://webdev-hw-api.vercel.app/api/v1/julia/comments",{
      method:"GET"
    })
    .then((response) => {
      return response.json();
      })
 }

 export function apiPostFetch(commentName, commentInput) {
    return fetch('https://webdev-hw-api.vercel.app/api/v1/julia/comments', {
        method: "POST",
        body: JSON.stringify({
            name: commentName,
            text: commentInput,
        })
    })
 }
 
