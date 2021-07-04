import {createElement, formatDate} from "./utils.js";

let messages;
if(localStorage.messages !== undefined){
    messages = JSON.parse(localStorage.messages);
} else{
    messages = [];
}

const authorInput = document.getElementById("create-msg-author");
const messageInput = document.getElementById("create-msg-text");
const themeSelection = document.getElementById("create-msg-select");
const sendButton = document.getElementById("sendBtn");
const posts = document.querySelector(".posts");

// Events
messageInput.addEventListener("keyup", function(event){
    if(event.code === "Enter" && !event.shiftKey){
        sendMessage();
    }
});

sendButton.addEventListener("click", function(){
    sendMessage();
});

// Send message
function sendMessage(){
    // Validate
    if(messageInput.value.trim() !== ""){
        if(authorInput.value.trim() === ""){
            authorInput.value = "Unknown author";
        }
        let date = Date.now();
        createMessage(authorInput.value, messageInput.value, date, true, themeSelection.value);

        messages.push({
            author: authorInput.value,
            message: messageInput.value,
            theme: themeSelection.value,
            createdAt: date,
        });
        localStorage.setItem("messages", JSON.stringify(messages));

        messageInput.value = "";
    } else{
        if(authorInput.value.trim() === "" && messageInput.value.trim() === ""){
            toggleModal("Форма не заполнена!");
        } else if(messageInput.value.trim() === ""){
            toggleModal("Введите текст сообщения!");
        }
    }
}

// Create message
function createMessage(author, message, date, isArray, theme){
    let formattedDate = formatDate(date);

    let messageInfo = createElement("div", "msg__info");
    let messageAuthor = createElement("div", "author", author);
    let messageDate = createElement("div", "msg__date", formattedDate);
    let messageText = createElement("div", "text", message);
    let messageContainer = createElement("li", "msg")
    messageInfo.append(messageAuthor, messageDate);
    messageContainer.append(messageInfo, messageText);
    if(theme === "dark"){
        messageContainer.classList.add("dark-message");
    }

    posts.prepend(messageContainer);

    // Animation
    if(isArray === true){
        messageContainer.classList.add("animation");
        let animationTime = 500;
        messageContainer.style.animationDirection = `${animationTime / 1000}s`;
        setTimeout(function(){
            messageContainer.classList.remove("animation");
        }, animationTime);
    }
}

// Render messages
function renderMessages(array){
    posts.innerHTML = "";
    for(let i = 0; i < array.length; i++){
        if(i === array.length - 1){
            createMessage(array[i].author, array[i].message, array[i].createdAt, true, array[i].theme);
        } else{
            createMessage(array[i].author, array[i].message, array[i].createdAt, false, array[i].theme);
        }
    }
}

// Check on new messages
setInterval(function(){
    if(localStorage.messages !== undefined && localStorage.messages !== JSON.stringify(messages)){
        messages = JSON.parse(localStorage.messages)
        renderMessages(messages);
    }
}, 100);

// Modal window
const modal = document.querySelector(".modal");
const modalText = document.querySelector(".modal__text");
const modalButton = document.querySelector(".modal__button");

modalButton.addEventListener("click", function(){
    toggleModal();
});
modal.addEventListener("click", function(event){
    if(event.currentTarget === event.target){
        toggleModal();
    }
});

function toggleModal(errorText){
    modal.classList.toggle("openModal");
    if(errorText !== undefined){
        modalText.innerHTML = errorText;
    }
}

renderMessages(messages);

// Change theme
const checkbox = document.querySelector(".checkbox");
let theme;
if(sessionStorage.theme !== undefined){
    theme = JSON.parse(sessionStorage.getItem("theme"));
    selectTheme(theme);
} else{
    theme = "light";
}

checkbox.addEventListener("click", function(){
    if(theme === "light"){
        theme = "dark";
    } else if(theme === "dark"){
        theme = "light";
    }
    sessionStorage.setItem("theme", JSON.stringify(theme));
    selectTheme(theme);
});

function selectTheme(theme){
    if(theme === "dark"){
        document.documentElement.setAttribute("style", "--main-white: #383838; --main-black: #fff;");
        document.body.style.background = "#357F9F";
    } else if(theme === "light"){
        document.documentElement.setAttribute("style", "--main-white: #fff; --main-black: #383838;");
        document.body.style.background = "#5cf";
    }
}

// Change message theme
