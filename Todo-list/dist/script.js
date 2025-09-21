"use strict";
const taskInput = document.getElementById("task-input");
const addButton = document.getElementById("add-button");
const todoList = document.getElementById("todo-list");
const doneList = document.getElementById("done-list");
function addTodo(text) {
    const li = document.createElement("li");
    li.textContent = text;
    const completeButton = document.createElement("button");
    completeButton.textContent = "완료";
    completeButton.className = "todo__btn todo__btn--complete";
    completeButton.addEventListener("click", () => {
        todoList.removeChild(li);
        addComplete(text);
    });
    li.appendChild(completeButton);
    todoList.appendChild(li);
}
function addComplete(text) {
    const li = document.createElement("li");
    li.textContent = text;
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "삭제";
    deleteButton.className = "todo__btn todo__btn--delete";
    deleteButton.addEventListener("click", () => {
        addDelete(li);
    });
    li.appendChild(deleteButton);
    doneList.appendChild(li);
}
function addDelete(taskEl) {
    doneList.removeChild(taskEl);
}
addButton.addEventListener("click", () => {
    const text = taskInput.value.trim();
    if (text === "")
        return;
    addTodo(text);
    taskInput.value = "";
});
