// get UI Elemen
const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const filterInput = document.querySelector('#filter-input');
const todoList = document.querySelector('#todo-list');
const clearButton = document.querySelector('#clear-all-todos');

document.addEventListener('DOMContentLoaded', e => {
    const allTodo = getItemFromLocalStorage();
    allTodo.forEach(todo => {
        createTodoElemen(todo);
    });
});
// DOM on submit todoForm
todoForm.addEventListener('submit', e => {
    // sifat buttonnya dihilangkan
    e.preventDefault();
    const valueTodo = e.path[0][0].value;
    if (valueTodo != '') {
        createTodoElemen(valueTodo);
        // add ke localstorage
        addToLocalStorage(valueTodo);
        // hilangkan vaue input todonya
        e.path[0][0].value = '';
    } else {
        alert('Todo list tidak boleh kosong!');
    }
});
// DOM Delete list
todoList.addEventListener('click', e => {
    e.preventDefault();
    console.log(e.target.classList.contains('btn-del'));
    if (e.target.classList.contains('btn-del')) {
        if (confirm('Apakah anda yakin ingin menghapusnya ?')) {
            const parentLi = e.target.parentElement;
            parentLi.remove();
            deleteTodoLocalStorage(parentLi);
        }
    }
});
// DOM clear all todo list
clearButton.addEventListener('click', e => {
    if (confirm('Apakah anda yakin ingin menghapus semua list nya ?')) {
        todoList.innerHTML = '';
        // clear all localstorage
        localStorage.clear();
    }
});
// DOM filter items
filterInput.addEventListener('keyup', e => {
    const filterText = e.target.value.toLowerCase();

    const todoItems = document.querySelectorAll('.list-group-item');
    todoItems.forEach(item => {
        // ambil text item nya
        const itemText = item.firstChild.textContent.toLowerCase();
        if (itemText.indexOf(filterText) !== -1) {
            item.setAttribute('style', 'display:block;');
        } else {
            item.setAttribute('style', 'display:none !important;');
        }
    });
});

function addToLocalStorage(toDoInputValue) {
    const allTodo = getItemFromLocalStorage();
    // add ke array nya
    allTodo.push(toDoInputValue);
    // add ke localstorage
    localStorage.setItem('all_todo', JSON.stringify(allTodo));
}

function createTodoElemen(value) {
    // bikin elemen li
    const li = document.createElement('li');
    // berikan kelasnya
    li.className = 'list-group-item d-flex justify-content-between align-items-center mb-1';
    // bikin value textnya
    const textValue = document.createTextNode(value);
    li.appendChild(textValue);
    // bikin anchornya
    const a = document.createElement('a');
    a.href = '#';
    a.className = 'badge bagde-pill badge-danger btn-del';
    // icon button delete
    const iconDelete = "Delete";
    a.innerHTML = iconDelete;
    // masukkan a ke li nya
    li.appendChild(a);
    todoList.appendChild(li);
}

function getItemFromLocalStorage() {
    let allTodo;
    // cek apakah ada item all_todo di dalam localstorage
    if (localStorage.getItem('all_todo') == null) {
        // jika dia tidak punya nilai, kasih array kosong
        allTodo = [];
    } else {
        // jika dia punya nilai, masukkan nilai lamanya
        allTodo = JSON.parse(localStorage.getItem('all_todo'));
    }
    return allTodo;
}

function deleteTodoLocalStorage(deletedElement) {
    const allTodo = getItemFromLocalStorage();
    allTodo.forEach((todo, index) => {
        if (deletedElement.firstChild.textContent === todo) {
            allTodo.splice(index, 1);
        }
    });
    localStorage.setItem('all_todo', JSON.stringify(allTodo));
}