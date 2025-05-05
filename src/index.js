import "./styles.css";

class Project {
    constructor(name) {
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

const projOne = new Project("Default");
const projTwo = new Project("Death Star");
const projects = [];

projects.push(projOne);
projects.push(projTwo);

// console.log(projects[0].name);

const projOneTask = new Task("update", "update deez nuts", "yesterday", "High");
projects[0].tasks.push(projOneTask);
projects[0].tasks.push(projOneTask);

// console.log(projects.find((element) => element.name === "Omega Star").tasks);
// let projIndex = projects.findIndex(element => element.name === "Super Star"); // find project index from array

// console.log(projects);

const projectsList = document.querySelector(".projects-list");

function displayProjects() {
    projectsList.innerHTML = projects.map(project => `
        <div class="projects-card">
            <h3>${project.name}</h3>
            <button type="button">- Delete Project</button>
        </div>
    `).join("");
}

displayProjects();

const btnAddProject = document.querySelector(".btn-add-project");
btnAddProject.addEventListener("click", () => {
    projects.push(projTwo);
    displayProjects();
})

// p.forEach(element => console.log(element.project_title));

// const p = [
//     {
//         "project_title": "Death Star", 
//         "tasks_list": [
//             {
//                 "task_title": "create", 
//                 "priority": "medium"
//             }, 
//             {
//                 "task_title": "read", 
//                 "priority": "low"
//             }
//         ]
//     },

//     {
//         "project_title": "Mega Star", 
//         "tasks_list": [
//             {
//                 "task_title": "create", 
//                 "priority": "medium"
//             }, 
//             {
//                 "task_title": "read", 
//                 "priority": "low"
//             }
//         ]
//     }
// ]