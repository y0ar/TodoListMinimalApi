
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
            // console.log("Id: " + todoItem.id + ", Name: " + todoItem.name + ", IsComplete: " + todoItem.isComplete);
            todoHtml += `
                <tr>
                    <td>
                        <label>${todoItem.id}</label>
                    </td>
                    <td>
                        <label>${todoItem.name}</label>
                    </td>
                    <td>
                        <input type="checkbox" disabled="true" checked="${todoItem.name}"/>
                    </td>
                </tr>
            `
        });
        
        let todoBody = document.getElementById("todoBody");
        todoBody.innerHTML = todoHtml;
    }
    else {
        console.log('No data.');
    }
}
