const express = require('express');
const cors = require('cors');
const projects = require('../data/projects.json'); // assuming the projects data is in the 'data' folder

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json(projects);
});

app.get("/:id", (req, res) => {
    const { id } = req.params;
    const project = projects.find((p) => p.id === id);

    if (project) {
        res.json(project);
    } else {
        res.status(404).json({ message: "Project not found" });
    }
});

app.post("/", (req, res) => {
    const newProject = { id: Date.now().toString(), ...req.body };
    projects.push(newProject);
    res.status(201).json(newProject);
});

module.exports = (req, res) => {
    app(req, res);  // Express app will handle the requests
};
