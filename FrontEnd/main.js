
const uri = 'https://localhost:7057/todoitems';

async function getTodos() {
    let todos = await fetch(uri)
        .then(response => response.json())
        .catch(error => console.error('Error:', error));
    
    return todos;
 }

async function fillTable() {
    let todos = await getTodos();
    if (todos && todos.length > 0) {
        let todoHtml = "";
        todos.forEach(todoItem => {
            todoHtml += getTodoHtml(todoItem.id, todoItem.name, todoItem.isComplete);
        });

        let todoBody = document.getElementById("todoBody");
        todoBody.innerHTML = todoHtml;
    }
    else {
        console.log('No data.');
    }
}

function getTodoHtml(id, name, isComplete) {
    let todoHtml = `
        <div class="flex mb-4 items-center">
            <input type="text" disabled="true" hidden="true" value="${id}"/>
            <p class="w-full text-grey-darkest">${name}</p>`
    
    if (isComplete === true) {
        todoHtml += `<button id="btnCheckTodo" class="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green">Done</button>`
    }
    else {
        todoHtml += `<button id="btnCheckTodo" class="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-grey border-grey hover:bg-grey">Not Done</button>`
    }
    todoHtml += `<button id="btnDeleteTodo" class="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red">Remove</button>
        </div>
        `
    return todoHtml;
}
