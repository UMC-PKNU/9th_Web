// HTML 요소들을 타입스크립트로 가져오고, null 가능성을 처리합니다.
const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');
const todoList = document.getElementById('todo-list');
const completedList = document.getElementById('completed-list');

// 할 일 추가 함수
function addTodoItem() {
  // 요소가 존재하고, 입력된 텍스트가 비어있지 않은지 확인
  if (
    todoInput instanceof HTMLInputElement &&
    todoList instanceof HTMLUListElement &&
    completedList instanceof HTMLUListElement
  ) {
    const todoText = todoInput.value.trim();

    if (todoText !== '') {
      // 새 li 요소를 생성합니다.
      const li = document.createElement('li');
      
      // 텍스트를 담을 span 요소 생성
      const textSpan = document.createElement('span');
      textSpan.textContent = todoText;

      // 버튼들을 그룹화할 div 생성
      const buttonGroup = document.createElement('div');
      buttonGroup.className = 'button-group';
      
      // 완료 버튼을 생성하고, 클래스를 추가합니다.
      const completeButton = document.createElement('button');
      completeButton.className = 'complete-button';
      completeButton.textContent = '완료';

      // 삭제 버튼을 생성하고, 클래스를 추가합니다.
      const deleteButton = document.createElement('button');
      deleteButton.className = 'delete-button';
      deleteButton.textContent = '삭제';

      // 완료 버튼 클릭 시 항목을 완료 목록으로 이동시키는 이벤트 리스너 추가
      completeButton.onclick = () => {
        // li를 완료 목록으로 이동
        completedList.appendChild(li);
        // 완료 버튼은 제거
        completeButton.remove();
      };
      
      // 삭제 버튼 클릭 시 항목을 삭제하는 이벤트 리스너 추가
      deleteButton.onclick = () => {
        // 부모 li 요소를 삭제
        li.remove();
      };

      // li 요소에 텍스트와 버튼들을 추가합니다.
      li.appendChild(textSpan);
      buttonGroup.appendChild(completeButton);
      buttonGroup.appendChild(deleteButton);
      li.appendChild(buttonGroup);

      // ul에 생성된 li를 추가합니다.
      todoList.appendChild(li);

      // 입력창을 비웁니다.
      todoInput.value = '';
    }
  }
}

// 버튼 클릭 이벤트 리스너 추가 (addButton이 존재하는지 확인)
if (addButton instanceof HTMLButtonElement) {
  addButton.addEventListener('click', addTodoItem);
}

// 입력창에서 엔터 키를 눌렀을 때 이벤트 리스너 추가
if (todoInput instanceof HTMLInputElement) {
  todoInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTodoItem();
    }
  });
}