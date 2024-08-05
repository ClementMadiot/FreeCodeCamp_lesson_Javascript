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
const taskData = [];
// This variable will be used to track the state when editing and discarding tasks.
let currentTask = {};

//* Opening and closing form modal

openTaskFormBtn.addEventListener("click", () => {
  taskForm.classList.toggle("hidden");
});

closeTaskFormBtn.addEventListener("click", () => {
  // I call the showModal() method on the confirmCloseDialog element. This will display a modal with the Discard and Cancel buttons.
  confirmCloseDialog.showModal();
});

cancelBtn.addEventListener("click", () => {
  // The HTML dialog element has a close() method that can be used to close a modal dialog box on a web page.
  confirmCloseDialog.close();
});

discardBtn.addEventListener("click", () => {
  confirmCloseDialog.close();
  taskForm.classList.toggle("hidden");
});

//* Get the values from the input fields, save them into the taskData array, and display them on the page.

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
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
  }
  taskData.forEach(({ id, title, date, description }) => {
    tasksContainer.innerHTML += `
    <div id="${id}" class="task">
    <p><strong>Title:</strong>${title}</p>
    <p><strong>Date:</strong> ${date}</p>
    <p><strong>Description:</strong> ${description}</p>
    <button type="button" class="btn">Edit</button>
    <button type="button" class="btn">Delete</button>
    </div>
    `;
    taskForm.classList.toggle("hidden");
  });
});

// The findIndex() array method finds and returns the index of the first element in an array that meets the criteria specified by a provided testing function. If no such element is found, the method returns -1.
// unshift() is an array method that is used to add one or more elements to the beginning of an array.
