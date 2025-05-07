import "./styles.css";

const projects = []; // stores Project objects

class Project {
    constructor(name, id = crypto.randomUUID()) {
        this.id = id;
        this.name = name;
        this.tasks = [];
    }
}

class Task {
    constructor(title, description, deadline, priority) {
        this.title = title;
        this.description = description;
        this.deadline = deadline;
        this.priority = priority;
        this.isDone = false;
    }
}

const projectsList = document.querySelector(".projects-list");

projects.push(new Project("Default", "1"));
projects[0].tasks.push(new Task("create", "create deez nuts", "last year", "low"));
projects[0].tasks.push(new Task("update", "update deez nuts", "last year", "high"));

// FUNCTIONS
function findProjectIndex(id) {
    const projectIndex = projects.findIndex(project => project.id === id);

    if (projectIndex !== -1) {
        return projectIndex;
    }
}

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
            displayProjects();
        });
    });

    const projectsCard = document.querySelectorAll(".projects-card");
    console.log(projectsCard);
    projectsCard.forEach(card => {
        card.addEventListener("click", () => {
            displayContent(card.getAttribute("data-project-id"));
        });
    });
}

function displayContent(id) {
    const projectIndex = projects.findIndex(project => project.id === id);

    const contentHeader = document.querySelector(".content-header");
    const tasksList = document.querySelector(".tasks-list");

    contentHeader.innerHTML = `
        <h1>${projects[projectIndex].name}</h1>
        <button type="button" class="btn-add-task">Add Task</button>
    `;

    tasksList.innerHTML = projects[projectIndex].tasks.map(task => `
        <div class="task-card">
            <h3>${task.title}</h3>
            <h3>${task.description}</h3>
            <h3>${task.deadline}</h3>
            <h3>${task.priority}</h3>
            <h3>${task.isDone}</h3>
        </div>
    `).join("");
}

// DOM

// Projects Modal
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
    const projectTitle = document.getElementById("project-title").value;

    if (!projectTitle) {
        alert("Please input something!");
        return;
    }
    
    let newProject = new Project(projectTitle);

    projects.push(newProject);

    projectsForm.reset();
    projectsModal.close();
    displayProjects();
});

// Initial
document.addEventListener('DOMContentLoaded', () => {
    displayProjects();
    // displayContent();
});