const express = require("express");
const cors = require("cors");

const projects = require("./data/projects.json");

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());


app.get("/api/projects", (req, res) => {
    res.status(200).json(projects);
});
//
app.get("/api/projects/:id", (req, res) => {
    const { id } = req.params;
    const project = projects.find((p) => p.id === id);

    if (project) {
        res.json(project);
    } else {
        res.status(404).json({ message: "Project not found" });
    }
});

app.post("/api/projects", (req, res) => {
    const newProject = { id: Date.now().toString(), ...req.body };
    projects.push(newProject);
    res.status(201).json(newProject);
});

app.put("/api/projects/:id", (req, res) => {
    const { id } = req.params;
    const index = projects.findIndex((p) => p.id === id);
    if (index === -1) return res.status(404).send("Project not found");

    projects[index] = { ...projects[index], ...req.body };
    res.status(200).json(projects[index]);
});

app.delete("/api/projects/:id", (req, res) => {
    const { id } = req.params;
    const index = projects.findIndex((p) => p.id === id);
    if (index === -1) return res.status(404).send("Project not found");

    projects.splice(index, 1);
    res.status(204).send();
});

// app.listen(PORT, () => {
//     console.log(`Mock API Server running at http://localhost:${PORT}`);
// });

module.exports = (req, res) => app(req, res);
