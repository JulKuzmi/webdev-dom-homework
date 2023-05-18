/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./api.js":
/*!****************!*\
  !*** ./api.js ***!
  \****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   apiGetFetch: () => (/* binding */ apiGetFetch),\n/* harmony export */   apiPostFetch: () => (/* binding */ apiPostFetch)\n/* harmony export */ });\n// модуль api js с запросоми апи, функция фич вызыввается в этом модуде\r\n function apiGetFetch() {\r\n    return fetch(\"https://webdev-hw-api.vercel.app/api/v1/julia/comments\",{\r\n      method:\"GET\"\r\n    })\r\n    .then((response) => {\r\n      return response.json();\r\n      })\r\n }\r\n\r\n function apiPostFetch(commentName, commentInput) {\r\n    return fetch('https://webdev-hw-api.vercel.app/api/v1/julia/comments', {\r\n        method: \"POST\",\r\n        body: JSON.stringify({\r\n            name: commentName,\r\n            text: commentInput,\r\n        })\r\n    })\r\n }\r\n \r\n\n\n//# sourceURL=webpack://webdev-dom-homework/./api.js?");

/***/ }),

/***/ "./commentRender.js":
/*!**************************!*\
  !*** ./commentRender.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   commentRender: () => (/* binding */ commentRender)\n/* harmony export */ });\n// модуль с рендер функцией \r\nconst commentRender = (comments, commentElement, getFieldCommen) => {\r\n    const commentHtml = comments.map((comments, index) =>\r\n    getFieldCommen(comments, index))\r\n    .join('');\r\n  commentElement.innerHTML = commentHtml;\r\n}\n\n//# sourceURL=webpack://webdev-dom-homework/./commentRender.js?");

/***/ }),

/***/ "./listGetComment.js":
/*!***************************!*\
  !*** ./listGetComment.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   listGetComments: () => (/* binding */ listGetComments)\n/* harmony export */ });\nconst listGetComments = (comments, index) => {\r\n  // const now = new Date();\r\n  // const createDate = format(now, \"MM-dd-yyyy hh:mm\"); // 03-26-2023 10:33\r\n    return `<li class=\"comment\" data-index=\"${index}\">\r\n      <div class=\"comment-header\">\r\n        <div>${comments.author.name}</div>\r\n        <div>${comments.createDate}</div>\r\n      </div>\r\n      <div class=\"comment-body\">\r\n        ${comments.isEdit ? `<textarea id=\"input\" class=\"comment-text textarea\" type=\"texrarea\">${comments.text}</textarea>` : `<div class=\"comment-text\">${comments.text.replaceAll(\"QUOTE_BEGIN\", \"<div class='quote'>\").replaceAll(\"QUOTE_END\", \"</div>\")}</div>`}\r\n      </div>\r\n      <div class=\"comment-footer\">\r\n        <div class=\"likes\">\r\n          <span class=\"likes-counter\">${comments.likes}</span>\r\n          <button class=\"like-button ${comments.isLike ? '-active-like' : ''}\" data-index=\"${index}\"></button>\r\n        </div>\r\n      </div>\r\n      </li>`\r\n}\n\n//# sourceURL=webpack://webdev-dom-homework/./listGetComment.js?");

/***/ }),

/***/ "./script.js":
/*!*******************!*\
  !*** ./script.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _commentRender_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./commentRender.js */ \"./commentRender.js\");\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api.js */ \"./api.js\");\n/* harmony import */ var _listGetComment_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./listGetComment.js */ \"./listGetComment.js\");\n\r\n \r\n \r\n \r\n \r\n const commentField = document.getElementById('comment-field');\r\n const commentName = document.getElementById('comment-name');\r\n const commentInput = document.getElementById('comment-input');\r\n const commentButton = document.getElementById('comment-button');\r\n const commentLoading = document.querySelector('.loading');\r\n const date = new Date();\r\n \r\n\r\n //создаем данные для HTML разметки //хранение комментов\r\n let comments = [];\r\n\r\n function getComment(){\r\n (0,_api_js__WEBPACK_IMPORTED_MODULE_1__.apiGetFetch)()\r\n    .then((Data) => {\r\n      comments = Data.comments;\r\n      commentLoading.classList.add(\"display-none\");\r\n      (0,_commentRender_js__WEBPACK_IMPORTED_MODULE_0__.commentRender)(comments, commentField, _listGetComment_js__WEBPACK_IMPORTED_MODULE_2__.listGetComments);\r\n      initLikesButton();\r\n      commentReply();\r\n    })  \r\n  }\r\n  getComment();\r\n\r\n\r\n  (0,_commentRender_js__WEBPACK_IMPORTED_MODULE_0__.commentRender)(comments, commentField, _listGetComment_js__WEBPACK_IMPORTED_MODULE_2__.listGetComments);\r\n\r\n // ивент на кнопки лайка\r\n function initLikesButton() {\r\n  const commentLikes = document.querySelectorAll(\".like-button\");\r\n  for (const buttonLike of commentLikes) {\r\n    const index = buttonLike.dataset.index;\r\n    buttonLike.addEventListener(\"click\", (eventLike) => {\r\n      eventLike.stopPropagation();// кликаем на кнопку лайка и эта функция прерывает дальнейшие всплытия событий \r\n      if (comments[index].isLike) {\r\n        comments[index].isLike = false;\r\n        comments[index].likes -= 1;\r\n      } else {\r\n        comments[index].isLike = true;\r\n        comments[index].likes += 1;\r\n      }\r\n      (0,_commentRender_js__WEBPACK_IMPORTED_MODULE_0__.commentRender)(comments, commentField, _listGetComment_js__WEBPACK_IMPORTED_MODULE_2__.listGetComments);\r\n      initLikesButton();\r\n    })\r\n  }\r\n }\r\n\r\n // событие на ответ на коммент пользователя \r\n function commentReply () {\r\n  const replayEl = document.querySelectorAll(\".comment\");\r\n  for (const el of replayEl) {\r\n    const index = el.dataset.index;\r\n    el.addEventListener('click', () => {\r\n      commentInput.value = `» ${comments[index].text} (${comments[index].author.name}) © \\n `;\r\n      (0,_commentRender_js__WEBPACK_IMPORTED_MODULE_0__.commentRender)(comments, commentField, _listGetComment_js__WEBPACK_IMPORTED_MODULE_2__.listGetComments);\r\n    })\r\n  }\r\n }\r\n\r\n //валидация и событик на кнопку\r\n commentButton.addEventListener(\"click\", () => {\r\n    commentName.classList.remove(\"error\"); // добавляем валидацию если пользователь не ввел имя/коммент \r\n    if (commentName.value === \"\") { // \r\n      commentName.classList.add(\"error\"); // \r\n      return;\r\n    }\r\n    commentInput.classList.remove(\"error\");\r\n    if (commentInput.value === \"\") {\r\n      commentInput.classList.add(\"error\");\r\n      return;\r\n    }\r\n    commentAnimation();\r\n   });\r\n\r\n    // для добавления нового коммента \r\n    function commentAnimation() {\r\n      commentLoading.classList.remove(\"display-none\")\r\n\r\n      comments.push({\r\n        name: commentName.value\r\n        .replaceAll('&', '&amp;')\r\n        .replaceAll('<', '&lt;')\r\n        .replaceAll('>', '&gt;')\r\n        .replaceAll('\"', '&quot;'), \r\n        date: `${date.getDate() < 10 ? \"0\" : \"\"}${date.getDate()}.\r\n        ${date.getMonth() < 10 ? \"0\" : \"\"}${date.getMonth() + 1}.\r\n        ${date.getFullYear() - 2000} \r\n        ${date.getHours() < 10 ? \"0\" : \"\"}${date.getHours()}:\r\n        ${date.getMinutes() < 10 ? \"0\" : \"\"}${date.getMinutes()}`,\r\n        text: commentInput.value\r\n        .replaceAll('&', '&amp;')\r\n        .replaceAll('<', '&lt;')\r\n        .replaceAll('>', '&gt;')\r\n        .replaceAll('\"', '&quot;'),\r\n        likes: 0,\r\n        isLiked: false,\r\n        isEdit: false,\r\n        forceError: true, \r\n       })\r\n    \r\n   function funcPost() {\r\n    ;(0,_api_js__WEBPACK_IMPORTED_MODULE_1__.apiPostFetch)(commentName.value, commentInput.value)\r\n      .then((response) => {\r\n              if(response.status === 201){\r\n                commentName.value = \"\"; // очищаем поле формы после ввода\r\n                commentInput.value = \"\";\r\n              }\r\n              else if (response.status === 400){\r\n               alert(\"Содержание комментария и имя пользователя должно состоять не менее чем из трех символов, введите пожалуйста заново\");\r\n              } else {\r\n                       throw new Error(\"Упал сервер\");\r\n              }\r\n       })\r\n      .then(() => {\r\n      return getComment();\r\n     })\r\n     .catch((error) => {\r\n         if(error.message === \"Упал сервер\"){\r\n                funcPost();\r\n         } else {\r\n                alert(\"Упс, кажется у вас упал интернет, попробуйте позже!\");\r\n                commentLoading.classList.remove(\"display-none\");\r\n         }\r\n     })\r\n  } \r\n funcPost();\r\n}\r\n\n\n//# sourceURL=webpack://webdev-dom-homework/./script.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	__webpack_require__("./script.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./api.js");
/******/ 	
/******/ })()
;