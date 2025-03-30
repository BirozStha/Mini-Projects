const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const todoForm = document.getElementById("todo-form");

// Handle form submission
todoForm.addEventListener("submit", function(event) {
    event.preventDefault();
    addTask();
});

function addTask(){
    if(inputBox.value === ''){
        alert("You must write something!");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

    }
    inputBox.value = "";
    inputBox.focus();
    saveData(); 
}

listContainer.addEventListener("click",function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData(); 
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData(); 
    }
}, false);



document.getElementById("clear-all").addEventListener("click", function () {
    listContainer.innerHTML = "";
    localStorage.removeItem("data");
});

// Dark Mode Toggle
const darkModeToggle = document.querySelector('.dark-mode-toggle');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

// Check for saved preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask(){
    let storedData = localStorage.getItem("data");
    if (storedData) {
        listContainer.innerHTML = storedData;
    }
}

showTask();
