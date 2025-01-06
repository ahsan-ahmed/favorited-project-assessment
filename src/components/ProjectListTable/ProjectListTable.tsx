import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Project, useProjects } from "../../context/ProjectContext";

interface ProjectListTableProps {
  onEditClick?: (row: Project) => void;
}

export default function ProjectListTable({
  onEditClick,
}: ProjectListTableProps) {
  const { projects } = useProjects();
  const navigate = useNavigate();

  const handleButtonClick = (row: Project) => {
    onEditClick?.(row);
    console.log("Button clicked for:", row.name);
    navigate("/add-project/" + row.id);
  };

  const renderActionButton = (row: Project) => (
    <Button
      variant="contained"
      color="primary"
      size="small"
      onClick={() => handleButtonClick(row)}
      aria-label={`Edit project ${row.name}`}
    >
      Edit
    </Button>
  );

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="project table">
        <TableHead>
          <TableRow>
            <TableCell>Project ID</TableCell>
            <TableCell align="right">Project Name</TableCell>
            <TableCell align="right">Start Date</TableCell>
            <TableCell align="right">End Date</TableCell>
            <TableCell align="right">Project Manager</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.startDate}</TableCell>
              <TableCell align="right">{row.endDate}</TableCell>
              <TableCell align="right">{row.manager}</TableCell>
              <TableCell align="center">{renderActionButton(row)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
