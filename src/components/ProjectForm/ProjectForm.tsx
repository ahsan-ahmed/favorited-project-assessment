import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Typography, Box } from "@mui/material";
import { useProjects } from "../../context/ProjectContext";
import { useNavigate, useParams } from "react-router-dom";
import { generateProjectId } from "../../utils/helpers";

const ProjectForm: React.FC = () => {
  const { addProject, projects, updateProject } = useProjects();
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    id: generateProjectId(projects),
    name: "",
    startDate: "",
    endDate: "",
    manager: "",
  });

  useEffect(() => {
    if (id) {
      console.log(`Edit project with ID: ${id}`);

      const projectToEdit = projects.find((project) => project.id === id);

      if (projectToEdit) {
        setFormData(projectToEdit);
      }
    }
  }, [id, projects]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (id) {
      const updatedProject = { ...formData };
      updateProject(id, updatedProject);
    } else {
      const newProject = { ...formData };
      addProject(newProject);
    }
    setFormData({
      id: generateProjectId(projects),
      name: "",
      startDate: "",
      endDate: "",
      manager: "",
    });

    navigate("/projects");
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Add New Project
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Project ID"
              variant="outlined"
              fullWidth
              disabled
              value={formData.id}
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
              Add Project
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default ProjectForm;
