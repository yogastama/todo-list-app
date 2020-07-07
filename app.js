// get UI Elemen
const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const filterInput = document.querySelector('#filter-input');
const todoList = document.querySelector('#todo-list');
const clearButton = document.querySelector('#clear-todos');

// DOM on submit todoForm
todoForm.addEventListener('submit', function (e) {
    // sifat buttonnya dihilangkan
    e.preventDefault();
    const valueTodo = e.path[0][0].value;
    if (valueTodo != '') {
        // bikin elemen li
        const li = document.createElement('li');
        // berikan kelasnya
        li.className = 'list-group-item d-flex justify-content-between align-items-center mb-1';
        // bikin value textnya
        const textValue = document.createTextNode(valueTodo);
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
        // hilangkan vaue input todonya
        e.path[0][0].value = '';
    }
});
// DOM Delete list
todoList.addEventListener('click', function (e) {
    e.preventDefault();
    console.log(e.target.classList.contains('btn-del'));
    if (e.target.classList.contains('btn-del')) {
        if (confirm('Apakah anda yakin ingin menghapusnya ?')) {
            const parentLi = e.target.parentElement;
            parentLi.remove();
        }
    }
});