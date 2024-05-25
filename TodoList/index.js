document.addEventListener("DOMContentLoaded",function(){
    const todoForm = document.querySelector(".todo-form")
    const todoInput = document.querySelector(".todo-input")
    const todoSubmit = document.querySelector(".todo-submit")
    const todoList = document.querySelector(".todo-list");

    let editMode = false;
    let editItem = null;

    todoForm.addEventListener("submit", function(event){
            event.preventDefault()

            const todoText = todoInput.value.trim();

            if(todoText !== ""){
                if(editMode){
                    editItem.firstChild.textContent = todoText;
                    todoSubmit.innerText = 'Add todo'
                    editMode = false;
                    editItem = null;
                }else{
                     addTodoItem(todoText);
                }
                     todoInput.value = ""
            }else{
                alert("Please enter vaild task")
            }
    });

    todoList.addEventListener("click",function(event){
        const target = event.target

        if(target.tagName==='BUTTON'){
            const todoItem = target.parentNode
            if(target.innerText === "❌"){
                todoItem.remove()
            }
            else if(target.innerText === "✏️"){
                editMode = true;
                editItem = todoItem;
                todoSubmit.innerText = 'Edit todo'
                todoInput.value = editItem.firstChild.innerText;
                todoInput.focus();
            }
        }
    })
    const addTodoItem = (todoText) =>{
        const todoItem = document.createElement("li")
        const editButton = document.createElement("button")
        const removeButton = document.createElement("button");
        todoItem.innerHTML= `<span>${todoText}</span>`
        editButton.innerText = '✏️';
        removeButton.innerText = "❌";

        todoItem.appendChild(editButton)
        todoItem.appendChild(removeButton);

        todoList.appendChild(todoItem)

    }

})