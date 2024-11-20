// In this TODO application, I learn how to handle form inputs, manage local storage, perform CRUD (Create, Read, Update, Delete) operations on tasks, implement event listeners, and toggle UI elements.

const taskForm = document.getElementById("task-form");
const confirmCloseDialog = document.getElementById("confirm-close-dialog");
const openTaskFormBtn = document.getElementById("open-task-form-btn");
const closeTaskFormBtn = document.getElementById("close-task-form-btn");
const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn");
const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");
const tasksContainer = document.getElementById("tasks-container");
const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input");

//This array will store all the tasks along with their associated data, including title, due date, and description.
/// const taskData = [];
const taskData = JSON.parse(localStorage.getItem("data")) || []
// This variable will be used to track the state when editing and discarding tasks.
let currentTask = {};


//* Opening and closing form modal

openTaskFormBtn.addEventListener("click", () => {
  taskForm.classList.toggle("hidden");
});

closeTaskFormBtn.addEventListener("click", () => {
  // check if there is a value in the titleInput, dateInput or descriptionInput field.
  const formInputsContainValues = titleInput.value || dateInput.value || descriptionInput.value
  // check on edit if the user change fields
  const formInputValuesUpdated = titleInput.value !== currentTask.title || dateInput.value !== currentTask.date || descriptionInput.value !== currentTask.description
  if(formInputsContainValues && formInputValuesUpdated){
    // Call the showModal() method on the confirmCloseDialog element. Display a modal with the Discard and Cancel buttons.
    confirmCloseDialog.showModal()
  }  else {
    reset()
  }    
});

cancelBtn.addEventListener("click", () => {
  // The HTML dialog element has a close() method that can be used to close a modal dialog box on a web page.
  confirmCloseDialog.close();
});

discardBtn.addEventListener("click", () => {
  confirmCloseDialog.close();
  reset()
});
//* Add the input values to taskData
const addOrUpdateTask = () => {
  const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);
  const taskObj = {
    id: `${titleInput.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
    title: titleInput.value,
    date: dateInput.value,
    description: descriptionInput.value,
  };
  // console.log(taskObj)
  if (dataArrIndex === -1) {
    taskData.unshift(taskObj);
  } else {
    taskData[dataArrIndex] = taskObj
  }
  // localStorage
  localStorage.setItem("data", JSON.stringify(taskData))

  updateTaskContainer()
  reset()
}
//* Adding the tasks to the DOM

const updateTaskContainer = () => {
  tasksContainer.innerHTML = ""
  taskData.forEach(({ id, title, date, description }) => {
    (tasksContainer.innerHTML += `
    <div id="${id}" class="task">
    <p><strong>Title:</strong>${title}</p>
    <p><strong>Date:</strong> ${date}</p>
    <p><strong>Description:</strong> ${description}</p>
    <button type="button" class="btn" onclick="editTask(this)">Edit</button>
    <button type="button" class="btn" onclick="deleteTask(this)">Delete</button>
    </div>
    `)
  });
}

const deleteTask = (buttonEl) => {
  const dataArrIndex = taskData.findIndex((item) => item.id === buttonEl.parentElement.id)
  buttonEl.parentElement.remove();
  // remove the deleted task from taskData
  taskData.splice(dataArrIndex, 1);
  localStorage.setItem("data", JSON.stringify(taskData))
}

const editTask = (buttonEl) => {
  const dataArrIndex = taskData.findIndex((item) => item.id === buttonEl.parentElement.id)
  currentTask = taskData[dataArrIndex]
  titleInput.value = currentTask.title
  dateInput.value = currentTask.date
  descriptionInput.value = currentTask.description
  addOrUpdateTaskBtn.innerText = "Update Task"
  taskForm.classList.toggle("hidden")
}

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addOrUpdateTask()
});

// The findIndex() array method finds and returns the index of the first element in an array that meets the criteria specified by a provided testing function. If no such element is found, the method returns -1.
// unshift() is an array method that is used to add one or more elements to the beginning of an array.

//* clear the input fields after adding a task

const reset = () => {
  titleInput.value = ""
  dateInput.value = ""
  descriptionInput.value = ""
  taskForm.classList.toggle("hidden")
  currentTask = {}

  addOrUpdateTaskBtn.innerText = "Add Task"
}

if(taskData.length){
  updateTaskContainer()
}