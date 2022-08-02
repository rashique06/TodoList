// 'use strict';
const curDate = document.querySelector('.cur-date');
const inputBox = document.querySelector('.input-field input');
const addBtn = document.querySelector('.input-field button');
const todoList = document.querySelector('.todo-list')
const taskCount = document.querySelector('.task-count');
const clearAllBtn = document.querySelector('.clear-all');

curDate.innerHTML = new Date().toLocaleDateString();

getTaskCount();

function getTaskCount() {
    let getLocalStorage = localStorage.getItem("New Todo");
    if(getLocalStorage == null) {
        listArr = [];
    } else {
        listArr = JSON.parse(getLocalStorage);
    }
    taskCount.innerHTML = `You have ${listArr.length} pending tasks`;
    if(listArr.length > 0) {
        clearAllBtn.classList.add('active');
    }
    else {
        clearAllBtn.classList.remove('active');
    }    
};

inputBox.addEventListener('keyup', () => {
    let userData = inputBox.value;
    if(userData.trim() != 0) {
        addBtn.classList.add('active');
    }
    else {
        addBtn.classList.remove('active');
    }
});

showTasks();

addBtn.addEventListener('click', () => {
    let userData = inputBox.value;
    let getLocalStorage = localStorage.getItem("New Todo");
    if(getLocalStorage == null) {
        listArr = [];
    } else {
        listArr = JSON.parse(getLocalStorage);
    }
    listArr.push(userData);
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks();
    getTaskCount();
});

function showTasks() {
    let getLocalStorage = localStorage.getItem("New Todo");
    if(getLocalStorage == null) {
        listArr = [];
    } else {
        listArr = JSON.parse(getLocalStorage);
    }
    let newLiTag = '';
    listArr.forEach((element, index) => {
        newLiTag += `<li> ${element} <span onclick=deleteList(${index})><i class="fas fa-trash"></i></span></li>`
    });
    todoList.innerHTML = newLiTag;
    inputBox.value = '';
};

function deleteList(index) {
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index,1);
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks();
    getTaskCount();
}

clearAllBtn.addEventListener('click', () => {
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage);
    listArr = [];
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    todoList.innerHTML = listArr;
    getTaskCount();
});