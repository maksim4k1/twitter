// Formatt date
function formatDate(timestamp){
    let date = new Date(timestamp);
    let formattedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    return formattedDate;
}

// Create element function
function createElement(tag="div", className, textConten=""){
    let container;
    if(tag.trim() !== "" && tag !== null){
        container = document.createElement(tag);
    } else{
        tag = "div";
        container = document.createElement(tag);
    }
    if(className.trim() !== "" && className !== undefined){
        container.classList.add(className);
    }
    container.innerHTML = textConten;
    return container;
}

export {formatDate, createElement};