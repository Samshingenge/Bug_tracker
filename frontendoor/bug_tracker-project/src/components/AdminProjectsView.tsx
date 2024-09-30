import React, { useState, useEffect } from 'react';
import api from '../services/api';

const AdminProjectsView: React.FC = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div>
      <h1>All Projects (Admin View)</h1>
      {projects.map(project => (
        <div key={project._id}>
          <h2>{project.name}</h2>
          <p>Owner: {project.ownerId}</p>
          <p>{project.description}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminProjectsView;