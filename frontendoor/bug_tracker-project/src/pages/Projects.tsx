// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { PlusCircle } from 'lucide-react';
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// interface Project {
//   _id: string;
//   name: string;
//   description: string;
//   createdAt: string;
//   updatedAt: string;
//   ownerId: string;
// }

// const Projects: React.FC = () => {
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [newProject, setNewProject] = useState({ name: '', description: '' });
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   const fetchProjects = async () => {
//     try {
//       setIsLoading(true);
//       const response = await axios.get<Project[]>('/api/projects');
//       setProjects(response.data);
//       setIsLoading(false);
//     } catch (err) {
//       setError('Failed to fetch projects');
//       setIsLoading(false);
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setNewProject(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post<Project>('/api/projects', newProject);
//       setProjects(prev => [...prev, response.data]);
//       setNewProject({ name: '', description: '' });
//     } catch (err) {
//       setError('Failed to create project');
//     }
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Projects</h1>
      
//       <form onSubmit={handleSubmit} className="mb-8">
//         <Card>
//           <CardHeader>
//             <CardTitle>Create New Project</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <Input
//               type="text"
//               name="name"
//               value={newProject.name}
//               onChange={handleInputChange}
//               placeholder="Project Name"
//               className="mb-2"
//             />
//             <Textarea
//               name="description"
//               value={newProject.description}
//               onChange={handleInputChange}
//               placeholder="Project Description"
//               className="mb-2"
//             />
//             <Button type="submit">
//               <PlusCircle className="mr-2 h-4 w-4" />
//               Create Project
//             </Button>
//           </CardContent>
//         </Card>
//       </form>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {projects.map(project => (
//           <Card key={project._id}>
//             <CardHeader>
//               <CardTitle>{project.name}</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p>{project.description}</p>
//               <p className="text-sm text-gray-500 mt-2">
//                 Created: {new Date(project.createdAt).toLocaleDateString()}
//               </p>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Projects;


import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';  // Adjust this path as needed
import { PlusCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthContext } from '../contexts/AuthContext';  // Adjust this path as needed

interface Project {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProject, setNewProject] = useState({ name: '', description: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (authContext?.user) {
      fetchProjects();
    }
  }, [authContext?.user]);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const response = await api.get<Project[]>('http://localhost:5000/api/projects');
      setProjects(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch projects');
      console.error('Error fetching projects:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProject(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post<Project>('/projects', newProject);
      setProjects(prev => [...prev, response.data]);
      setNewProject({ name: '', description: '' });
      setError('');
    } catch (err) {
      setError('Failed to create project');
      console.error('Error creating project:', err);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Create New Project</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              type="text"
              name="name"
              value={newProject.name}
              onChange={handleInputChange}
              placeholder="Project Name"
              className="mb-2"
            />
            <Textarea
              name="description"
              value={newProject.description}
              onChange={handleInputChange}
              placeholder="Project Description"
              className="mb-2"
            />
            <Button type="submit">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Project
            </Button>
          </CardContent>
        </Card>
      </form>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map(project => (
          <Card key={project._id}>
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{project.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                Created: {new Date(project.createdAt).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Projects;