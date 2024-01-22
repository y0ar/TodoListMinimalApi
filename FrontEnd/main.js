
const uri = 'https://localhost:7057/todoitems';

async function getTodos() {
    let todos = await fetch(uri)
        .then(response => response.json())
        .catch(error => console.error('Error:', error));
    
    return todos;
}

async function addTodoItem() {
    await fetch(uri, {
        method: "POST",
        body: JSON.stringify({
          name: document.getElementById("txtTodoName").value,
          isComplete: false
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(response => response.json())
    .catch(error => console.error('Error:', error));

    await fillTable();
}

async function deleteTodoItem(id) {
    await fetch(`${uri}/${id}`, {
        method: "DELETE"
    })
    .then(response => response.json())
    .catch(error => console.error('Error:', error));

    await fillTable();
}

async function updateTodoItem(id) {
    let isComplete = document.getElementById(`pName${id}`).classList.contains("line-through");
    
    await fetch(`${uri}/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          //name: document.getElementById(`pName${id}`).innerText,
          isComplete: !isComplete
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(response => {
        if (response.status !== 204) {
            return response.json();
        }
    })
    .catch(error => console.error('Error:', error));

    await fillTable();
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
        <div id="${id}" class="flex mb-4 items-center">`
    
    if (isComplete === true) {
        todoHtml += `<p id="pName${id}" class="w-full text-grey-darkest line-through">${name}</p>
        <button id="btnCheckTodo${id}" class="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white-300 text-grey border-grey hover:bg-blue-300" onclick="updateTodoItem(${id})">Not Done</button>`
    }
    else {
        todoHtml += `<p id="pName${id}" class="w-full text-grey-darkest">${name}</p>
        <button id="btnCheckTodo${id}" class="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white-300 text-green border-green hover:bg-green-300" onclick="updateTodoItem(${id})">Done</button>`
    }
    todoHtml += `<button id="btnDeleteTodo${id}" class="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white-300 hover:bg-red-300" onclick="deleteTodoItem(${id})">Remove</button>
        </div>
        `
    return todoHtml;
}
