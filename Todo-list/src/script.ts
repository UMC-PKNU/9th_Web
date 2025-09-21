const taskInput: HTMLInputElement = document.getElementById("task-input") as HTMLInputElement;
const addButton: HTMLButtonElement = document.getElementById("add-button") as HTMLButtonElement;
const todoList: HTMLUListElement = document.getElementById("todo-list") as HTMLUListElement;
const doneList: HTMLUListElement = document.getElementById("done-list") as HTMLUListElement;

// 할 일 추가
function addTodo(text: string): void {
  const li: HTMLLIElement = document.createElement("li");
  li.textContent = text;

  const completeButton: HTMLButtonElement = document.createElement("button");
  completeButton.textContent = "완료";
  completeButton.className = "todo__btn todo__btn--complete";

  // 완료 버튼 클릭하고 완료 목록으로 이동
  completeButton.addEventListener("click", () => {
    todoList.removeChild(li);
    addComplete(text);
  });

  li.appendChild(completeButton);
  todoList.appendChild(li);
}

// 완료된 일 추가
function addComplete(text: string): void {
  const li: HTMLLIElement = document.createElement("li");
  li.textContent = text;

  const deleteButton: HTMLButtonElement = document.createElement("button");
  deleteButton.textContent = "삭제";
  deleteButton.className = "todo__btn todo__btn--delete";

  // 삭제 버튼 클릭하면 목록에서 제거
  deleteButton.addEventListener("click", () => {
    addDelete(li);
  });

  li.appendChild(deleteButton);
  doneList.appendChild(li);
}

// 삭제
function addDelete(taskEl: HTMLLIElement): void {
  doneList.removeChild(taskEl);
}

// 버튼 클릭 이벤트
addButton.addEventListener("click", () => {
  const text: string = taskInput.value.trim();
  if (text === "") return;

  addTodo(text);
  taskInput.value = "";
});