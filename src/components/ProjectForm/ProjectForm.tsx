import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Typography, Box } from "@mui/material";
import { useProjects } from "../../context/ProjectContext";
import { useNavigate, useParams } from "react-router-dom";
import { generateProjectId } from "../../utils/helpers";

const ProjectForm: React.FC = () => {
  const { addProject, projects, updateProject } = useProjects();
  const navigate = useNavigate();
  const { projectId } = useParams();

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    manager: "",
    favorited: false,
  });

  useEffect(() => {
    if (projectId) {
      console.log(`Edit project with ID: ${projectId}`);

      const projectToEdit = projects.find(
        (project) => project.id === projectId
      );

      if (projectToEdit) {
        setFormData(projectToEdit);
      }
    }
  }, [projectId, projects]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const newData = { ...prevData, [name]: value };

      if (name === "name") {
        newData.id = generateProjectId(value);
      }

      return newData;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (projectId) {
      const updatedProject = { ...formData };
      updateProject(projectId, updatedProject);
    } else {
      const newProject = { ...formData };
      addProject(newProject);
    }
    setFormData({
      id: "",
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      manager: "",
      favorited: false,
    });

    navigate("/projects");
  };

  return (
    <Box>
      <h4 className="py-6 text-2xl">
        {projectId ? "Update" : "Add New"} Project
      </h4>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Project ID"
              variant="outlined"
              fullWidth
              disabled
              value={generateProjectId(formData.name)}
              onChange={handleInputChange}
              name="id"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Project Name"
              variant="outlined"
              fullWidth
              required
              value={formData.name}
              onChange={handleInputChange}
              name="name"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              value={formData.description}
              onChange={handleInputChange}
              name="description"
              multiline
              rows={4}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Start Date"
              variant="outlined"
              fullWidth
              type="date"
              required
              InputLabelProps={{
                shrink: true,
              }}
              value={formData.startDate}
              onChange={handleInputChange}
              name="startDate"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="End Date"
              variant="outlined"
              fullWidth
              type="date"
              required
              InputLabelProps={{
                shrink: true,
              }}
              value={formData.endDate}
              onChange={handleInputChange}
              name="endDate"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Project Manager"
              variant="outlined"
              fullWidth
              required
              value={formData.manager}
              onChange={handleInputChange}
              name="manager"
            />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              {projectId ? "Update" : "Add"} Project
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default ProjectForm;
