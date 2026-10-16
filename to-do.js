
const enterTask = document.getElementById("enterTask");
const addTask = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

let tasks = [];

try {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));

    if (Array.isArray(savedTasks)) {
        tasks = savedTasks;
    }
} catch (error) {
    console.error("Could not load saved tasks:", error);
}
// Display all tasks
function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {  //index is added to identify the task in the array
        const listItem = document.createElement("li");
        listItem.textContent = task.text;

        // Show completed status
        if (task.completed) {
            listItem.classList.add("completed");   //classList is used to add a class to the list item
        }

        // Edit button
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.classList.add("editButton");
        editButton.disabled = task.completed;

        editButton.addEventListener("click", function(event) {
            event.stopPropagation();    // Prevent the click event from propagating to the list item that means it will not mark the task as completed when the edit button is clicked

            const updatedTask = prompt("Edit the task:", task.text);

            if (updatedTask !== null && updatedTask.trim() !== "") {
                task.text = updatedTask.trim();
                saveTasks();
            }
        });

        // Delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("deleteButton");

        deleteButton.addEventListener("click", function(event) {
            event.stopPropagation();    // Prevent the click event from propagating to the list item that means it will not mark the task as completed when the delete button is clicked

            tasks.splice(index, 1);    //splice is used to remove the task from the array (index is the position of the task in the array and 1 is the number of tasks to remove) if i want to remove 2 tasks then i will write 2 instead of 1.
            saveTasks();

            const taskText = document.createElement("span");
taskText.textContent = task;

editButton.className = "editButton";
deleteButton.className = "deleteButton";

li.append(taskText, editButton, deleteButton);
        });

        // Mark task as completed
        listItem.addEventListener("click", function() {
            task.completed = !task.completed;  //toggle the completed status of the task. !task.completed means if the task is completed then it will be marked as not completed and vice versa
            saveTasks();
        });

        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);
    });
}

// Save tasks to localStorage and refresh the list
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));   //JSON.stringify is used to convert the tasks array into a string so that it can be stored in localStorage. When we retrieve the tasks from localStorage, we will use JSON.parse to convert the string back into an array.
    displayTasks();
}

// Add a new task
addTask.addEventListener("click", function() {
    const task = enterTask.value.trim();

    if (task === "") {
        alert("Please enter a task!");
        return;
    }

    const newTask = {
        text: task,
        completed: false
    };

    tasks.push(newTask);  //push is used to add the new task to the tasks array
    saveTasks();

    enterTask.value = "";
});

// Add task when Enter is pressed
enterTask.addEventListener("keydown", function(event) {   //keydown event is used to detect when a key is pressed down 
    if (event.key === "Enter") {
        addTask.click();  //click method is used to simulate a click event on the addTask button when Enter is pressed  
    }
});

// Display saved tasks when the page loads
displayTasks();
