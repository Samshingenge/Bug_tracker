import React, { useState, useEffect } from 'react';
import api from '../services/api';

interface Project {
  _id: string;
  name: string;
  description: string;
}

interface User {
  _id: string;
  // Add other user properties as needed
}

const UserProjectsView: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const user: User = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get<Project[]>(`/projects/user/${user._id}`);
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, [user._id]);

  return (
    <div>
      <h1>My Projects</h1>
      {projects.map((project: Project) => (
        <div key={project._id}>
          <h2>{project.name}</h2>
          <p>{project.description}</p>
        </div>
      ))}
    </div>
  );
};

export default UserProjectsView;