// модуль api js с запросоми апи, функция фич вызыввается в этом модуде
 export function apiGetComment() {
    fetch("https://webdev-hw-api.vercel.app/api/v1/julia/comments",{
      method:"GET"
    })
    .then((response) => {
      return response.json();
      })
 }
 export function apiPost(commentName, commentInput) {
    returnfetch('https://webdev-hw-api.vercel.app/api/v1/julia/comments', {
        method: "POST",
        body: JSON.stringify({
            name: commentName,
            text: commentInput,
        })
    })
 }
 
