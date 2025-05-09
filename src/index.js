import "./styles.css";

// CLASSES
class Project {
    constructor(name) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.tasks = [];
    }
}

class Task {
    constructor(title, description, deadline, priority, isDone = false) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.deadline = deadline;
        this.priority = priority;
        this.isDone = isDone;
    }
}

// VARIABLES
let projects = []; // stores Project objects
const projectsList = document.querySelector(".projects-list");

// FUNCTIONS
function deleteProject(id) {
    const projectIndex = projects.findIndex(project => project.id === id);

    if (projectIndex !== -1) {
        projects.splice(projectIndex, 1);
    }
}

function displayProjects() {
    projectsList.innerHTML = projects.map(project => `
        <div class="projects-card" data-project-id="${project.id}">
            <h3>${project.name}</h3>
            <button type="button" class="btn-delete-project" data-project-id="${project.id}">Delete</button>
        </div>
    `).join("");

    const btnDeleteProject = document.querySelectorAll(".btn-delete-project");
    btnDeleteProject.forEach(btn => {
        btn.addEventListener("click", () => {
            deleteProject(btn.getAttribute("data-project-id"));
            saveProjects();
            displayProjects();
        });
    });

    const projectsCard = document.querySelectorAll(".projects-card");
    projectsCard.forEach(card => {
        card.addEventListener("click", () => {
            displayContent(card.getAttribute("data-project-id"));
        });
    });
}

function displayContent(id) {
    const content = document.querySelector(".content");
    const projectIndex = projects.findIndex(project => project.id === id);

    if (projectIndex !== -1) {
        content.innerHTML = `
            <div class="content-header">
                <h1>${projects[projectIndex].name}</h1>
                <button type="button" class="btn-add-task">Add Task</button>
            </div>

            <div class="tasks-list"></div>
        `;

        const tasksList = document.querySelector(".tasks-list");
        tasksList.innerHTML = projects[projectIndex].tasks.map(task => `
            <div class="task-card ${task.isDone ? "complete":"ongoing"} ${task.priority.toLowerCase()}">
                <div class="checkbox-container">
                    <input type="checkbox" class="mark-as-complete" data-task-id="${task.id}" ${task.isDone ? "checked":""}>
                </div>

                <div class="task-info">
                    <h3>${task.title}</h3>
                    <h3>${task.description}</h3>
                    <h3>${task.deadline}</h3>
                    <h3>${task.priority}</h3>
                </div>

                <div class="delete-task-container">
                    <button type="button" class="btn-delete-task" data-task-id="${task.id}">Delete</button>
                </div>
            </div>
        `).join("");

        const markAsComplete = document.querySelectorAll(".mark-as-complete");
        markAsComplete.forEach(input => {
            input.addEventListener("click", () => {
                const taskIndex = projects[projectIndex].tasks.findIndex(task => task.id === input.getAttribute("data-task-id"));
                projects[projectIndex].tasks[taskIndex].isDone = !projects[projectIndex].tasks[taskIndex].isDone;
                saveProjects();
                displayContent(id);
            });
        });

        const btnAddTask = document.querySelector(".btn-add-task");
        btnAddTask.addEventListener("click", (e) => {
            e.preventDefault();
            btnConfirmTask.setAttribute("data-project-index", projectIndex);
            taskModal.showModal();
        });

        const btnDeleteTask = document.querySelectorAll(".btn-delete-task");
        btnDeleteTask.forEach(btn => {
            btn.addEventListener("click", () => {
                projects[projectIndex].tasks = projects[projectIndex].tasks.filter(task => task.id !== btn.getAttribute("data-task-id"));
                saveProjects();
                displayContent(id);
            });
        });
    }

    else {
        content.innerHTML = `
            <h1>No Project Selected</h1>
        `;
    }
}

// DOM Manipulation

// Create Projects Modal
const projectsModal = document.querySelector(".projects-modal");
const projectsForm = document.querySelector(".projects-form");

const btnAddProject = document.querySelector(".btn-add-project");
btnAddProject.addEventListener("click", () => {
    projectsModal.showModal();
});

const btnCloseProject = document.querySelector(".btn-close-project");
btnCloseProject.addEventListener("click", (e) => {
    e.preventDefault();
    projectsForm.reset();
    projectsModal.close();
});

const btnConfirmProject = document.querySelector(".btn-confirm-project");
btnConfirmProject.addEventListener("click", (e) => {
    e.preventDefault();
    const projectName = document.getElementById("project-name").value;

    if (!projectName) {
        alert("Please fill out all fields!");
        return;
    }

    let newProject = new Project(projectName);

    projects.push(newProject);

    projectsForm.reset();
    projectsModal.close();
    saveProjects();
    displayProjects();
});

// Add Task Modal
const taskModal = document.querySelector(".task-modal");
const taskForm = document.querySelector(".task-form");

const btnCloseTask = document.querySelector(".btn-close-task");
btnCloseTask.addEventListener("click", (e) => {
    e.preventDefault();
    taskForm.reset();
    taskModal.close();
});

const btnConfirmTask = document.querySelector(".btn-confirm-task");
btnConfirmTask.addEventListener("click", (e) => {
    e.preventDefault();
    const taskTitle = document.getElementById("task-title").value;
    const taskDescription = document.getElementById("task-description").value;
    const taskDeadline = document.getElementById("task-deadline").value;
    const taskPriority = document.getElementById("task-priority").value;

    if (!taskTitle || !taskDescription || !taskDeadline || taskPriority === "") {
        alert("Please fill out all fields!");
        return;
    }

    let newTask = new Task(taskTitle, taskDescription, taskDeadline, taskPriority);

    const projectIndex = btnConfirmTask.getAttribute("data-project-index");

    projects[projectIndex].tasks.push(newTask);
    taskForm.reset();
    taskModal.close();

    saveProjects();
    displayContent(projects[projectIndex].id);
});

// localStorage
function saveProjects() {
    localStorage.setItem("projects", JSON.stringify(projects));
}

function loadProjects() {
    const stored = localStorage.getItem("projects");

    if (!stored) {
        return [];
    }

    const parsed = JSON.parse(stored);
    return parsed.map(p => {
        const project = new Project(p.name);

        project.tasks = p.tasks.map(t => new Task(t.title, t.description, t.deadline, t.priority, t.isDone));

        return project;
    });
}

// ENTRY POINT
document.addEventListener('DOMContentLoaded', () => {
    projects = loadProjects();

    // Initialize Default Project
    if (projects.length === 0) {
        projects.push(new Project("Default", "1"));
        projects[0].tasks.push(new Task("Workout", "Focus on cardio", "2025-05-10", "Low", true));
        projects[0].tasks.push(new Task("Programming", "Add localStorage", "2025-05-12", "High"));
    }

    displayProjects();
    displayContent();
});