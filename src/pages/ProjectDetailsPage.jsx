import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import axios from "axios";
import AddTask from "../components/AddTask";
import TaskCard from "../components/TaskCard";
import projectsService from "../services/projects.service";


const API_URL = "http://localhost:5005";


function ProjectDetailsPage (props) {
  const [project, setProject] = useState(null);
  const { projectId } = useParams();
  
  const getProject = () => {
    const token = localStorage.getItem('authToken')
      projectsService.getProject(projectId)
      .then((response) => {
      	const oneProject = response.data;
      	setProject(oneProject);
    	})
      .catch((error) => console.log(error));
  };
  
  
  useEffect(()=> {
    getProject();
  }, [] );

  
  return (
    <div className="ProjectDetails">
    
      {project && (
        <>
          <h1>{project.title}</h1>
          <p>{project.description}</p>
          <img src={`${project.image}`}alt="" />
        </>
      )}

      
      <AddTask refreshProject={getProject} projectId={projectId} />          

      { project && project.tasks.map((task) => <TaskCard key={task._id} {...task} /> )} 

      <Link to="/projects">
        <button>Back to projects</button>
      </Link>
          
      <Link to={`/projects/edit/${projectId}`}>
        <button>Edit Project</button>
      </Link>
      
    </div>
  );
}

export default ProjectDetailsPage;