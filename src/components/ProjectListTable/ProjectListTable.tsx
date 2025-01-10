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
import { useProjects } from "../../context/ProjectContext";
import { Project } from "../../interfaces/project";
import { IconButton } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorderOutlined";
import StarIcon from "@mui/icons-material/StarOutlined";

interface ProjectListTableProps {
  onEditClick?: (row: Project) => void;
}

export default function ProjectListTable({
  onEditClick,
}: ProjectListTableProps) {
  const { projects, updateProject } = useProjects();
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent, row: Project) => {
    e.stopPropagation();
    onEditClick?.(row);
    const updatedRow = { ...row, favorited: !row.favorited };
    updateProject(row.id, updatedRow);
  };

  const handleButtonClick = (e: React.MouseEvent, row: Project) => {
    e.stopPropagation();
    onEditClick?.(row);
    console.log("Button clicked for:", row.name);
    navigate(`/projects/${row.id}/edit`);
  };

  const renderActionButton = (row: Project) => (
    <>
      <IconButton
        onClick={(e) => {
          handleClick(e, row);
        }}
        color={row.favorited ? "primary" : "default"}
        className="!mr-2"
      >
        {!row.favorited ? (
          <StarBorderIcon />
        ) : (
          <StarIcon sx={{ color: "red" }} />
        )}
      </IconButton>
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={(e) => handleButtonClick(e, row)}
        aria-label={`Edit project ${row.name}`}
        className="!capitalize !shadow-none !bg-[#0075ff] !rounded-none"
      >
        Edit
      </Button>
    </>
  );

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="project table">
        <TableHead>
          <TableRow>
            <TableCell>Project ID</TableCell>
            <TableCell align="center">Project Name</TableCell>
            <TableCell align="right">Start Date</TableCell>
            <TableCell align="right">End Date</TableCell>
            <TableCell align="center">Project Manager</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              onClick={() => {
                navigate(`/projects/${row.id}`);
              }}
              className="cursor-pointer hover:bg-slate-100"
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="right">{row.startDate}</TableCell>
              <TableCell align="right">{row.endDate}</TableCell>
              <TableCell align="center">{row.manager}</TableCell>
              <TableCell align="center">{renderActionButton(row)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
