let textInput = document.querySelector('.tasks-input');
let ul = document.querySelector(".ul-element");
let addBtn = document.querySelector(".btn");
let taskList = document.querySelector(".tasks-list");
let clearBtn = document.querySelector(".clear-btn");
let search = document.querySelector(".filter");

allEvents();

function allEvents() {

  //DOM Load allEvents
  document.addEventListener("DOMContentLoader", getTasks);


  addBtn.addEventListener("click", btnClick);

  ul.addEventListener("click", removeTask);

  clearBtn.addEventListener("click", clearTasks);

  search.addEventListener("keyup", searched);
}

//Get tasks from Local localStorage
function getTasks(){
  let tasks;
  if(localStorage.getItem("tasks")=== null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task){
    let liTask = document.createElement("li");
    liTask.className = "tasks-list";
    liTask.appendChild(document.createTextNode(task.value));

    let link = document.createElement("a");
    link.className = "delete-icon";
    link.setAttribute("href", "#");
    link.innerHTML = '<i class="fas fa-times"></i>';
    liTask.appendChild(link);

    ul.appendChild(liTask);
  });
}




function btnClick(e) {
  if (textInput.value === "") {

  } else {
    let liTask = document.createElement("li");
    liTask.className = "tasks-list";
    liTask.appendChild(document.createTextNode(textInput.value));// adding the value from text field(textInput) inot the list Item

    let link = document.createElement("a"); // creating an <a> tag
    link.className = "delete-icon";   //adding the class name to <a> tag
    link.setAttribute("href", "#");
    link.innerHTML = '<i class="fas fa-times"></i>';  //adding inner html <i> tag into the <a> tag for the icon
    liTask.appendChild(link); //add a tag with its classes and i tag into the List Item

    ul.appendChild(liTask);   //adding the list Item liTask (with a and i tags and value) to the unordered list.

    storeTaskInLocalStorage(textInput.value);

    textInput.value = "";   //clear the value in text field
  }
e.preventDefault();

}

function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem("tasks") === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

















function removeTask(e){

  if(e.target.parentElement.classList.contains("delete-icon")){
    e.target.parentElement.parentElement.remove();
  }


  e.preventDefault();
}

function clearTasks(){
  while(ul.firstChild){
    ul.removeChild(ul.firstChild);
  }
}

function searched(e){
  let searchText = e.target.value.toLowerCase();

  document.querySelectorAll(".tasks-list").forEach(
    function(tasks){
    let item = tasks.firstChild.textContent;

    if(item.toLowerCase().indexOf(searchText) != -1){
      tasks.style.display = "block";
    }else{
      tasks.style.display = "none";
    }


  });
}
