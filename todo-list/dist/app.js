// HTML 요소들을 타입스크립트로 가져오고, null 가능성을 처리합니다.
var todoInput = document.getElementById('todo-input');
var addButton = document.getElementById('add-button');
var todoList = document.getElementById('todo-list');
var completedList = document.getElementById('completed-list');
// 할 일 추가 함수
function addTodoItem() {
    // 요소가 존재하고, 입력된 텍스트가 비어있지 않은지 확인
    if (todoInput instanceof HTMLInputElement &&
        todoList instanceof HTMLUListElement &&
        completedList instanceof HTMLUListElement) {
        var todoText = todoInput.value.trim();
        if (todoText !== '') {
            // 새 li 요소를 생성합니다.
            var li_1 = document.createElement('li');
            // 텍스트를 담을 span 요소 생성
            var textSpan = document.createElement('span');
            textSpan.textContent = todoText;
            // 버튼들을 그룹화할 div 생성
            var buttonGroup = document.createElement('div');
            buttonGroup.className = 'button-group';
            // 완료 버튼을 생성하고, 클래스를 추가합니다.
            var completeButton_1 = document.createElement('button');
            completeButton_1.className = 'complete-button';
            completeButton_1.textContent = '완료';
            // 삭제 버튼을 생성하고, 클래스를 추가합니다.
            var deleteButton = document.createElement('button');
            deleteButton.className = 'delete-button';
            deleteButton.textContent = '삭제';
            // 완료 버튼 클릭 시 항목을 완료 목록으로 이동시키는 이벤트 리스너 추가
            completeButton_1.onclick = function () {
                // li를 완료 목록으로 이동
                completedList.appendChild(li_1);
                // 완료 버튼은 제거
                completeButton_1.remove();
            };
            // 삭제 버튼 클릭 시 항목을 삭제하는 이벤트 리스너 추가
            deleteButton.onclick = function () {
                // 부모 li 요소를 삭제
                li_1.remove();
            };
            // li 요소에 텍스트와 버튼들을 추가합니다.
            li_1.appendChild(textSpan);
            buttonGroup.appendChild(completeButton_1);
            buttonGroup.appendChild(deleteButton);
            li_1.appendChild(buttonGroup);
            // ul에 생성된 li를 추가합니다.
            todoList.appendChild(li_1);
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
    todoInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTodoItem();
        }
    });
}
