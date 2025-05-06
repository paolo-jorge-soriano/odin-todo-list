import "./styles.css";

const projects = [];

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

const defaultProject = new Project("Default", "1");
projects.push(defaultProject);

// console.log(projects.find((element) => element.name === "Omega Star").tasks);
// let projIndex = projects.findIndex(element => element.name === "Super Star"); // find project index from array

const projectsList = document.querySelector(".projects-list");

// FUNCTIONS
function deleteProject(projectsArr, id) {
    const index = projectsArr.findIndex(project => project.id === id);

    if (index !== -1) {
        // console.log(`Deleted ${projectsArr[index].name}`)
        projectsArr.splice(index, 1);
    }
}

function displayProjects() {
    projectsList.innerHTML = projects.map(project => `
        <div class="projects-card">
            <h3>${project.name}</h3>
            <button type="button" class="btn-delete-project" data-project-id="${project.id}">- Delete Project</button>
        </div>
    `).join("");

    const btnDeleteProject = document.querySelectorAll(".btn-delete-project");
    btnDeleteProject.forEach(btn => {
        btn.addEventListener("click", () => {
            deleteProject(projects, btn.getAttribute("data-project-id"));
            displayProjects();
        });
    });
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
    console.log(projects);
});

// Initial
displayProjects();