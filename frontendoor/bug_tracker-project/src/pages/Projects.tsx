import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';  // Adjust this path as needed
import { PlusCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthContext } from '../contexts/AuthContext';  // Adjust this path as needed
import axios from 'axios'; 
import Avatar from 'react-avatar' // Make sure to import axios at the top of your file
import { Badge } from "@/components/ui/badge"; // Make sure to import axios at the top of your file

interface Project {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
  
}

const Projects: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
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
      if (!authContext?.user) {
        throw new Error('User not authenticated');
      }
      
      const projectData = {
        name: newProject.name,
        description: newProject.description
      };
      
      console.log('Sending project data:', projectData);
      console.log('Authorization header:', `Bearer ${localStorage.getItem('token')?.substring(0, 20)}...`);
      
      const response = await api.post<Project>('/projects', projectData);
      
      console.log('Received response:', response.data);
      setProjects(prev => [...prev, response.data]);
      setNewProject({ name: '', description: '' });
      setError('');
    } catch (err) {
      console.error('Full error object:', err);
      if (axios.isAxiosError(err)) {
        console.error('Request config:', {
          url: err.config?.url,
          method: err.config?.method,
          headers: err.config?.headers,
          data: err.config?.data
        });
        console.error('Response data:', err.response?.data);
        console.error('Response status:', err.response?.status);
        console.error('Response headers:', err.response?.headers);
        setError(`Failed to create project: ${err.response?.data?.message || err.message}`);
      } else if (err instanceof Error) {
        setError(`Failed to create project: ${err.message}`);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4 bg-gradient-to-br from-zinc-900 to-zinc-700 border border-zinc-700 hover:border-zinc-600 transition-colors">
      <h1 className="text-2xl font-bold mb-4 text-white">Projects</h1>
      
      <form onSubmit={handleSubmit} className="mb-8 ">
        <Card className="bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700 hover:border-zinc-600 transition-colors">
          <CardHeader>
            <CardTitle className='text-white'>Create New Project</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              type="text"
              name="name"
              value={newProject.name}
              onChange={handleInputChange}
              placeholder="Project Name"
              className="mb-2 text-white"
            />
            <Textarea
              name="description"
              value={newProject.description}
              onChange={handleInputChange}
              placeholder="Project Description"
              className="mb-2 bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 hover:border-zinc-600 transition-colors text-white"
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
          <Card key={project._id} className="bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 hover:border-zinc-600 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <CardTitle className="text-sm font-medium text-zinc-200">
                  {project.name}
                </CardTitle>
              </div>
              <Avatar name={user.fullName} size="24" round={true} />
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 text-xs text-zinc-400">
                <Badge variant="outline" className="bg-transparent bg-orange-800 border-zinc-700 text-zinc-400 hover:bg-zinc-800">
                  Medium
                </Badge>
                <Badge variant="outline" className="bg-transparent border-zinc-700 text-zinc-400 hover:bg-zinc-800">
                  All
                </Badge>
                <span>13</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Projects;