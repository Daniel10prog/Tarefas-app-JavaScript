//Selectors
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo');

//Event Listener
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//Functions
function addTodo(event){
    //Prevent form from submitting
    event.preventDefault();
    
    //Todo Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    //Create Li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //ADD todo to LocalStorage
    saveLocalTodos(todoInput.value);

    //CHECK MARK BUTTON
    const completedButton = document.createElement('button');
    completedButton.innerHTML ='<i class="fa fa-check-square"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //CHECK TRASH BUTTON
    const trashbutton = document.createElement('button');
    trashbutton.innerHTML ='<i class="fa fa-trash-o"></i>';
    trashbutton.classList.add("trash-btn");
    todoDiv.appendChild(trashbutton);
    //APPEND TO LIST
    todoList.appendChild(todoDiv);
    //Clear Todo INPUT VALUE
    todoInput.value = "";


}

function deleteCheck(e){
    const item = e.target;
    //Delete TODO
    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        //Animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
    }

    //Check Mark
    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }  else {
                    todo.style.display = "none";
                } 
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }  else {
                    todo.style.display = "none";
                }   
                break;  
        }
    });
}

function saveLocalTodos(todo){
    //Check ----Hey do i already have thing in there?
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
   
     //Check ----Hey do i already have thing in there?
     let todos;
     if(localStorage.getItem('todos') === null){
         todos = [];
     }else{
         todos = JSON.parse(localStorage.getItem('todos'));
     }
     todos.forEach(function(todo){
  //Todo Div
  const todoDiv = document.createElement('div');
  todoDiv.classList.add("todo");

  //Create Li
  const newTodo = document.createElement('li');
  newTodo.innerText = todo;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);
 

  //CHECK MARK BUTTON
  const completedButton = document.createElement('button');
  completedButton.innerHTML ='<i class="fa fa-check-square"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  //CHECK TRASH BUTTON
  const trashbutton = document.createElement('button');
  trashbutton.innerHTML ='<i class="fa fa-trash-o"></i>';
  trashbutton.classList.add("trash-btn");
  todoDiv.appendChild(trashbutton);
  //APPEND TO LIST
  todoList.appendChild(todoDiv);
     });
}

function removeLocalTodos(todo){
    //Check ----Hey do i already have thing in there?
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}