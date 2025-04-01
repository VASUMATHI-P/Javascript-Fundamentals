document.addEventListener("DOMContentLoaded", loadTodos);

function addTodo() {
  let inputValue = document.getElementById('input-box').value.trim();

  if(inputValue !== "") {
    let todoList = document.querySelector(".todo-list");

    let todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", function () {
      toggle(this);
    });

    let todoText = document.createElement("p");
    todoText.textContent = inputValue;

    let deletebutton = document.createElement("button");
    deletebutton.textContent = "Remove";
    deletebutton.classList.add("delete-button");
    deletebutton.onclick = function() {
      deleteTodo(this)
    }

    todoDiv.appendChild(checkbox);
    todoDiv.appendChild(todoText);
    todoDiv.appendChild(deletebutton);

    todoList.appendChild(todoDiv);
  }
  document.getElementById('input-box').value = '';
}

function deleteTodo(element) {
  element.parentElement.remove();
}

function toggle(checkbox){
  if(checkbox.checked){
    checkbox.nextElementSibling.style.textDecoration = "line-through";
    checkbox.nextElementSibling.style.color = "gray";
  } else {
    checkbox.nextElementSibling.style.textDecoration = "none";
    checkbox.nextElementSibling.style.color = "black";
  }
}